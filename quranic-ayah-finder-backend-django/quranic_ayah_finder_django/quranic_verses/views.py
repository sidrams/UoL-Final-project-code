from django.shortcuts import render
import os
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from django.contrib.auth.models import User
from .serializers import *
from .forms import *

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

from .search_quranic_verse.searchGoogleVisionAPI import detectText
import json

from django.contrib.auth import  login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status
from .validations import *

# show all possible all endpoints
class AllEndpoints(APIView):
    endpoints = {
        'Search related url' : [
            {
                'path': 'search/',
                'response': 'pass an image on the POST request to access the Google Vision API for text recognition',
                'method': 'GET*, POST'
            }
        ],
        'User related urls' : [
            {
                'path': 'register',
                'response': 'to register a user',
                'method': 'POST'
            },
            {
                'path': 'login',
                'response': 'to login a user',
                'method': 'POST'
            },
            {
                'path': 'logout',
                'response': 'to logout a user',
                'method': 'POST'
            },
            {
                'path': 'user',
                'response': 'to get user infor of logged in user',
                'method': 'POST'
            },
            {
                'path': 'profile',
                'response': 'to view profile of the logged in user',
                'method': 'POST'
            },
            {
                'path': 'profile/<str:username>',
                'response': 'to view profile of any public user with a username',
                'method': 'GET'
            },
        ],
        'Quides and Quizzes related urls' : [
            {
                'path': 'api/guideTopics',
                'response': 'get a list of all the topics',
                'method': 'GET'
            },
            {
                'path': 'api/quizQuestions',
                'response': 'get a list of all the quiz questions for all the topics',
                'method': 'GET'
            },
            {
                'path': 'api/quizQuestions/<int:pk>',
                'response': 'get a list of all the quiz questions for topic with id "pk"',
                'method': 'GET'
            },
            {
                'path': 'api/UserQuizProgress',
                'response': 'get a list of all the quiz progresses saved for the logged in user',
                'method': 'GET'
            },
            {
                'path': 'api/UserQuizProgress/topic/<int:pk>',
                'response': 'get a list of all the quiz progresses for the topic with id "pk" saved for the logged in user',
                'method': 'GET, POST'
            },
            {
                'path': 'api/guideContent',
                'response': 'get a list of all the guide contents for all the topics',
                'method': 'GET'
            },
            {
                'path': 'api/guideContent/topic/<int:pk>',
                'response': 'get a list of all the guide contents for the topic with id "pk"',
                'method': 'GET'
            }
        ],
        'Posts and Comments related endpoints' : [
            {
                'path': 'api/posts/',
                'response': 'get a list of all posts',
                'method': 'GET, POST'
            },
            {
                'path': 'api/posts/([0-9]*)',
                'response': 'get a details of the post with the given id',
                'method': 'GET, POST'
            },
            {
                'path': 'createPost',
                'response': 'pass data to create a post',
                'method': 'POST'
            },
            {
                'path': 'updatePost/([0-9]*)',
                'response': 'pass data to update the post with the given id',
                'method': 'POST'
            },
            {
                'path': 'deletePost/([0-9]*)',
                'response': 'delete the post with the given id',
                'method': 'POST'
            },
            {
                'path': 'api/comments/posts/<int:pk>',
                'response': 'get all comments fot the post with the given id',
                'method': 'GET'
            },
            {
                'path': 'api/add/comments/posts/<int:pk>',
                'response': 'add a comment fot the post with the given id',
                'method': 'POST'
            }
        ],
    }
    def get(self, request):
        return Response(self.endpoints)


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
    
class SaveSearchViewset(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
        
    def get(self, request):
        search = UserSavedVerse.objects.filter(user=request.user)
        serializer = UserSavedVerseSerializer(search, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        search = UserSavedVerse.objects.create(user=request.user)
        data = request.data
        serializer = UserSavedVerseSerializer(data=data, instance=search, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SaveSearchDetailViewset(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
        
    def get(self, request, pk):
        search = UserSavedVerse.objects.get(id=pk)
        serializer = UserSavedVerseSerializer(search)
        return Response(serializer.data)
    
    def post(self, request, pk):
        search = UserSavedVerse.objects.create(id=pk)
        data = request.data
        serializer = UserSavedVerseSerializer(data=data, instance=search, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        search = UserSavedVerse.objects.get(id=pk)
        search.delete()
        return Response('post deleted',status=status.HTTP_200_OK)


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
        savedSearches = UserSavedVerseSerializer(UserSavedVerse.objects.filter(user=request.user), many=True)
        return Response({'user': serializer.data, 'posts': post.data, 'progress':userProgress.data, 'savedSearches':savedSearches.data}, status=status.HTTP_200_OK)
    
# public user profile 
class PublicUserProfileView(APIView):
	##
    def get(self, request, username):
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        post = PostsSerializer(Post.objects.filter(user=user), many=True)
        userProgress = UserQuizProgressSerializer(UserQuizProgress.objects.filter(user=user), many=True)
        savedSearches = UserSavedVerseSerializer(UserSavedVerse.objects.filter(user=user), many=True)
        return Response({'user': serializer.data, 'posts': post.data, 'progress':userProgress.data, 'savedSearches':savedSearches.data}, status=status.HTTP_200_OK)

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

# function to create a post
class CreatePostViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    # create post
    def post(self, request, *args, **kwargs):
        post = Post.objects.create(user=request.user)
        data = request.data
        posts_serializer = PostsSerializer(data=data,instance=post, partial=True)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# function to update a post
class PostViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    parser_classes = (MultiPartParser, FormParser)
        
    # update post
    def post(self, request, pk, *args, **kwargs):
        post = Post.objects.get(pk=pk)

        posts_serializer = PostsSerializer(data=request.data,instance=post, partial=True)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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