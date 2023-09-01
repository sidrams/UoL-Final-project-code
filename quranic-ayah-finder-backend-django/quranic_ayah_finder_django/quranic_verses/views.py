from django.shortcuts import render
import os
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.http import HttpResponse

from .models import *
from django.contrib.auth.models import User
from .serializers import *
from .forms import *

from rest_framework import viewsets

from .search_quranic_verse.searchGoogleVisionAPI import detectText
import json

from django.contrib.auth import  login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status
from .validations import *

# main search bar endpoint
@api_view(['GET', 'POST'])
def Search_list(request):
    if request.method == 'GET':
        return Response(data="pass an image on the POST request to access the Google Vision API for text recognition")
    
    elif request.method == 'POST':
        image = request.FILES.get('image')
        reimage = image.read()
            
        searched_text = detectText(reimage)
        print(searched_text)
        return Response(data=searched_text)

# LOGIN CODE -------------------------------------------------------
# user registeration
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):	
        clean_data = custom_validation(request.data)		
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

# user login
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_username(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


# user logout
class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

# user data if logged in
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
# LOGIN CODE END -------------------------------------------------------------

# user profile 
class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
	##
    def get(self, request):
        serializer = UserSerializer(request.user)
        post = PostsSerializer(Post.objects.filter(user=request.user), many=True)
        userProgress = UserQuizProgressSerializer(UserQuizProgress.objects.filter(user=request.user), many=True)
        return Response({'user': serializer.data, 'posts': post.data, 'progress':userProgress.data}, status=status.HTTP_200_OK)

# get all posts
@api_view(['GET', 'POST'])
def Posts_Lists(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostsSerializer(posts, context={'request': request}, many=True)

        for i,post in enumerate(posts):
            commentCount = Comment.objects.filter(post=post.id).count()
            serializer.data[i]['comment_count'] = commentCount
        return Response(serializer.data)

# get post details for the chosen post with id 'pk'
@api_view(['GET', 'POST'])
def Posts_detail(request,pk):
    post = Post.objects.get(pk=pk)
    user = UserSerializer(post.user)
    comments = Comment.objects.filter(post=post.pk)
    
    serializer = PostsSerializer(post, context={'request': request})
    commentSerializer = CommentSerializer(comments, context={'request': request},many=True)
    response = {'post':serializer.data,'user':user.data, 'comments': commentSerializer.data}
    
    return Response(response)

# get all posts
class PostViewSet(viewsets.ModelViewSet):
    queryset=Post.objects.all().order_by('-id')
    serializer_class=PostsSerializer


# create a post
@api_view(['GET', 'POST'])
def createPost(request):
    if request.method == 'GET':
        form = PostForm()
        context = {'form': form}
        return HttpResponse(form.as_p())
    
    if request.method == 'POST':
        jsonResponse = json.loads(request.body.decode('utf-8'))
        form = PostForm(jsonResponse)
        if form.is_valid():
            post = form.save()
            print(post.id)
            return Response({'message':'Post added', 'post_id': post.id})
        return Response('Post not added yet')


# update a post
@api_view(['GET', 'POST'])
def updatePost(request,pk):
    post = Post.objects.get(pk=pk)
    serializer = PostsSerializer(post, context={'request': request})
    
    if request.method == 'POST':
        jsonResponse = json.loads(request.body.decode('utf-8'))
        form = PostForm(jsonResponse, instance=post)
        print(form)
        if form.is_valid():
            post = form.save()
            print(post.id)
            return Response({'message':'Post updated', 'post_id': post.id})
        return Response('Post not updated yet')
    return Response(serializer.data)

# delete a post
@api_view(['GET', 'POST'])
def deletePost(request,pk):
    post = Post.objects.get(pk=pk)
    
    if request.method == 'POST':
        post.delete()
        return Response('Post deleted')
    
    return Response('Post not updated yet')
    
# get all comments for a given post with id 'pk'
class CommentsViewSet(APIView):
    def get(self, request, pk):
        query = Comment.objects.filter(post=pk)
        serializer = CommentSerializer(query, context={'request': request}, many=True)
        return Response({'Comments': serializer.data}, status=status.HTTP_200_OK)
     
# add a comment for a given post with id 'pk' is user is logged in 
class AddCommentsViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request, pk):
        data = request.data
        print(request.user)
        user = User.objects.get(id=request.user.id)
        data['post'] = Post.objects.get(id=pk)
        print(data)
        comment = Comment.objects.create(user=user, **data)
        serializer = CommentSerializer(comment)
     
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# count all comments for a given post with id 'pk'
class CountCommentsViewSet(APIView):
    def get(self, request, pk):
        query = Comment.objects.filter(post=pk)
        serializer = CommentSerializer(query, context={'request': request}, many=True)
        return Response({'Comments': serializer.data}, status=status.HTTP_200_OK)

# guide view set
class GuideViewSet(viewsets.ModelViewSet):
    queryset = Guides.objects.all()
    serializer_class = GuidesSerializer

# get all topics 
class GuideTopicViewSet(APIView):
    def get(self, request):
        query = GuideTopic.objects.all()
        serializer = GuideTopicSerializer(query,context={'request': request}, many=True)
        return Response({'Topics': serializer.data}, status=status.HTTP_200_OK)

# get all quiz questions 
class QuizQuestionsViewSet(APIView):
    def get(self, request):
        query = QuizQuestion.objects.all()
        serializer = QuizSerializer(query,context={'request': request}, many=True)
        return Response({'Questions': serializer.data}, status=status.HTTP_200_OK)

# get all quiz questions for a chosen topic with id 'pk'
class QuizQuestionsForTopicViewSet(APIView):
    def get(self, request,pk):
        query = QuizQuestion.objects.filter(topic_id=pk)
        serializer = QuizSerializer(query,context={'request': request}, many=True)
        return Response({'Questions': serializer.data}, status=status.HTTP_200_OK)
    
# get all quiz progress of the user logged in 
class UserQuizProgressViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        query = UserQuizProgress.objects.filter(user=request.user)
        serializer = UserQuizProgressSerializer(query,context={'request': request}, many=True)
        return Response({'Progress': serializer.data}, status=status.HTTP_200_OK)
    
# get all quiz progress and save progress of the user logged in 
class UserQuizProgressTopicViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request,pk):
        query = UserQuizProgress.objects.filter(quiz_topic_id=pk,user=request.user)
        serializer = UserQuizProgressSerializer(query,context={'request': request}, many=True)
        return Response({'Progress': serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request,pk):
        data = request.data
        print(request.user)
        user = User.objects.get(id=request.user.id)
        data['quiz_topic_id'] = GuideTopic.objects.get(id=pk)
        print(data)
        progress = UserQuizProgress.objects.create(user=user, **data)
        serializer = UserQuizProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# get all content of guides
class GuideContentViewSet(APIView):
    def get(self, request):
        query = GuideContent.objects.all()
        serializer = GuideContentSerializer(query,context={'request': request}, many=True)
        return Response({'Guides': serializer.data}, status=status.HTTP_200_OK)
    
# get all content of guides for a chosen topic with id as 'pk'
class GuideContentTopicViewSet(APIView):
    def get(self, request, pk):
        query = GuideContent.objects.filter(topic_id=pk)
        serializer = GuideContentSerializer(query,context={'request': request}, many=True)
        return Response({'Guides': serializer.data}, status=status.HTTP_200_OK)