from django.shortcuts import render
import os
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.http import HttpResponse

from .models import *
from .serializers import *
from .forms import *

from rest_framework import viewsets

from .search_quranic_verse.searchGoogleVisionAPI import detectText
import io
import json

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

@api_view(['GET', 'POST'])
def Posts_Lists(request):
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