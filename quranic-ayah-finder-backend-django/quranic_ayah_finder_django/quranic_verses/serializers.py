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
        fields =  ('pk','title','user', 'description', 'updated', 'created', 'image') 
        

class CommentSerializer(serializers.ModelSerializer):
    post = PostsSerializer()
    user = UserSerializer()
    
    class Meta:
        model = Comment
        fields = ('pk', 'user', 'post', 'body', 'updated', 'created')

class GuideTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideTopic
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    topic_id = GuideTopicSerializer()

    class Meta:
        model = QuizQuestion
        fields = '__all__'

class UserQuizProgressSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    quiz_topic_id = GuideTopicSerializer()

    class Meta:
        model = UserQuizProgress
        fields = '__all__'

class UserQuizProgressTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuizProgress
        fields = '__all__'

class GuideContentSerializer(serializers.ModelSerializer):
    topic_id = GuideTopicSerializer()

    class Meta:
        model = GuideContent
        fields = '__all__'
