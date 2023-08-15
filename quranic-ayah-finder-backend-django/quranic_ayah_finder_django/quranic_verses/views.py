from django.shortcuts import render
import os
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Guides
from .serializers import *

from rest_framework import viewsets

from .search_quranic_verse.searchGoogleVisionAPI import detectText
import io

@api_view(['GET', 'POST'])
def Search_list(request):
    if request.method == 'GET':
        return Response(data="passed")
    
    elif request.method == 'POST':
        image = request.FILES.get('image')
        reimage = image.read()
            
        searched_text = detectText(reimage)
        print(searched_text)
        return Response(data=searched_text)

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