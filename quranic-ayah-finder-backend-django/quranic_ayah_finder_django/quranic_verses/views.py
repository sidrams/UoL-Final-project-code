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
import io
import json

from django.contrib.auth import authenticate, login, logout, get_user_model

from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status
from .validations import *
from django.contrib.auth.decorators import login_required

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



# LOGIN CODE
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


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
# LOGIN CODE END



# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.views.decorators.csrf import csrf_exempt
# @ensure_csrf_cookie
# @api_view(['POST'])
# def loginPage(request):
#     if request.method == 'POST':
#         jsonResponse = json.loads(request.body.decode('utf-8'))
#         # form = PostForm(jsonResponse)
#         username = jsonResponse.get('username')
#         password = jsonResponse.get('password')
#         print(username,password)
#         try:
#             user = User.objects.get(username=username)
#         except:
#             return Response("User does not exist")
        
#         user = authenticate(request, username=username, password=password)
#         # print(user)
#         if user is not None:
#             serializer = UserSerializer(user)
#             # if serializer.is_valid(raise_exception=True):
#             # print(serializer.data.is_authenticated())
# 		    # return Response({'user': serializer.data}, status=status.HTTP_200_OK)
#             login(request, user)
#             return Response({'user':serializer.data,'message':'User Logged in'})
#             return user
#             # return Response({'user': serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response('Username or password does not exist')
#     context = {}
#     # return Response(context)

# @api_view(['GET', 'POST'])
# def getCurrentUser(request):

#     serializer = UserSerializer(request.user)#.is_authenticated
#     return Response({'user': serializer.data, 'authenticated': request.user.is_authenticated}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
# @login_required
def Posts_Lists(request):
    if request.method == 'GET':
        posts = Post.objects.all()
    # user = User.objects.filter(user=posts.user.pk)
    # UserSerializer(posts.user,context={'request': request}, many=True)
    # context = {'posts': posts}
    # return Response(data=context)

        serializer = PostsSerializer(posts, context={'request': request}, many=True)
    # response = {'post':serializer.data,'user':user.data}
        return Response(serializer.data)
    # return Response(response)

@api_view(['GET', 'POST'])
def Posts_detail(request,pk):
    post = Post.objects.get(pk=pk)
    user = UserSerializer(post.user)
    # context = {'posts': posts}
    # return Response(data=context)

    serializer = PostsSerializer(post, context={'request': request})
    response = {'post':serializer.data,'user':user.data}
    # return Response(serializer.data)
    return Response(response)

class PostViewSet(viewsets.ModelViewSet):
    queryset=Post.objects.all().order_by('-id')
    serializer_class=PostsSerializer

@api_view(['GET', 'POST'])
def createPost(request):

    if request.method == 'GET':
        form = PostForm()
        context = {'form': form}
        print(form)
        # return Response(form)
        return HttpResponse(form.as_p())
    
    if request.method == 'POST':
        jsonResponse = json.loads(request.body.decode('utf-8'))
        form = PostForm(jsonResponse)
        print(request.body)
        if form.is_valid():
            form.save()
            return Response('Post added')
        return Response('Post not added yet')

@api_view(['GET', 'POST'])
def updatePost(request,pk):
    post = Post.objects.get(pk=pk)
    serializer = PostsSerializer(post, context={'request': request})
    # response = {'post':serializer.data,'user':user.data}
    # return Response(serializer.data)

    if request.method == 'POST':
        jsonResponse = json.loads(request.body.decode('utf-8'))
        form = PostForm(jsonResponse, instance=post)
        print(form)
        if form.is_valid():
            form.save()
            return Response('Post updated')
        return Response('Post not updated yet')
    
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def deletePost(request,pk):
    post = Post.objects.get(pk=pk)
    # serializer = PostsSerializer(post, context={'request': request})

    if request.method == 'POST':
        post.delete()
        return Response('Post deleted')
    
    return Response('Post not updated yet')
    # return Response(serializer.data)
        


class GuideViewSet(viewsets.ModelViewSet):
    queryset = Guides.objects.all()
    serializer_class = GuidesSerializer

#     def post(self, request, *args, **kwargs):
#         name = 'test'
#         description = 'description'
#         # image = request.data['image']
#         Guides.objects.create(name=name, description=description, image=image)
#         return HttpResponse({'message': 'Guide created'}, status=200)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def Guides_list(request):
    if request.method == 'GET':
        data = Guides.objects.all()

        serializer = GuidesSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GuidesSerializer(data=request.data)
        # print(request.data['image'])
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def Guides_detail(request, pk):
    try:
        guides = Guides.objects.get(pk=pk)
    except guides.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GuidesSerializer(guides, context={'request': request})

        return Response(serializer.data)
        # return Response(Guides)
    
    if request.method == 'PUT':
        serializer = GuidesSerializer(guides, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            guides.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)