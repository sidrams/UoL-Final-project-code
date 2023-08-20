from django.urls import path, re_path
from . import views
# from rest_framework import routers
# from .views import PostViewSet

# router=routers.DefaultRouter()
# router.register(r'createPost',PostViewSet)

urlpatterns = [
    re_path(r'^search/$', views.Search_list, name='search'),
    re_path(r'^api/guides/$', views.Guides_list, name='guides'),
    re_path(r'^api/guides/([0-9]*)$', views.Guides_detail, name='guide_details'),
    re_path(r'^api/posts/$', views.Posts_Lists, name='posts'),
    re_path(r'^api/posts/([0-9]*)$', views.Posts_detail, name='posts_details'),
    re_path(r'^createPost$', views.createPost, name='create-post'),
    re_path(r'^updatePost/([0-9]*)$', views.updatePost, name='update-post'),
    re_path(r'^deletePost/([0-9]*)$', views.deletePost, name='delete-post'),
    # url(r'^createPost$', include(router.urls), name='create-post'),
]