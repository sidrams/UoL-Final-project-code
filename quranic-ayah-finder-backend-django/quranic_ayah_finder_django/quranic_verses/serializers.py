from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def create(self, clean_data):
        user_obj = User.objects.create_user(username=clean_data['username'], password=clean_data['password'])
        user_obj.username = clean_data['username']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    username = serializers.CharField()
    password = serializers.CharField()
	##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'username')

# class UserLoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'

class GuidesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Guides 
        fields = ('pk', 'name', 'description', 'image')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ('id', 'username', 'first_name')

class PostsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post 
        fields =  ('pk','title','user', 'verse_id', 'description') # user, verse_id, 'updated', 'created'
        

class CommentSerializer(serializers.ModelSerializer):
    post = PostsSerializer()
    
    class Meta:
        model = Comment
        fields = ('pk', 'user', 'post', 'body', 'updated', 'created')