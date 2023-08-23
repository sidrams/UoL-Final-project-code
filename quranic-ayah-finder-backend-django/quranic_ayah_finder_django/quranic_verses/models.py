from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# class User(AbstractUser):
#     name = models.CharField(max_length=200, null=True)
#     email = models.EmailField(unique=True, null=True)
#     bio = models.TextField(null=True)

#     avatar = models.ImageField(null=True, default="avatar.svg")

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

# # Create your models here.\
# def upload_path(instance, filname):
#     return '/'.join(['covers', str(instance.title), filname])

class Guides(models.Model):
    name = models.CharField("Name", max_length=240)
    description = models.CharField("Description", max_length=500)#"Description", blank=True, null=True
    image = models.ImageField(blank=True, null=True, upload_to='images/')
    
    def __str__(self):
        return self.name
    
class Post(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    verse_id = models.IntegerField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]

class GuideTopic(models.Model):
    topic_name = models.CharField("Topic_name", max_length=500)

    def __str__(self):
        return self.topic_name[0:50]
    
# class QuizQuestion(models.Model):

