from rest_framework import serializers
from .models import *

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