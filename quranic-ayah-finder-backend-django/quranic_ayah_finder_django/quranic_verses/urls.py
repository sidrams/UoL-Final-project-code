from django.urls import path, re_path
from . import views
# from rest_framework import routers
# from .views import PostViewSet

# router=routers.DefaultRouter()
# router.register(r'createPost',PostViewSet)

urlpatterns = [
    re_path(r'^search/$', views.Search_list, name='search'),
    # path('login/', views.loginPage, name='login'),
    # path('getUser/', views.getCurrentUser, name='user'),

    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),

    path('api/guideTopics', views.GuideTopicViewSet.as_view(), name='guide_topics'),
    path('api/quizQuestions', views.QuizQuestionsViewSet.as_view(), name='quiz_questions'),
    path('api/quizQuestions/<int:pk>', views.QuizQuestionsForTopicViewSet.as_view(), name='quiz_questions'),
    path('api/UserQuizProgress', views.UserQuizProgressViewSet.as_view(), name='quiz_progress_for_user'),
    path('api/UserQuizProgress/topic/<int:pk>', views.UserQuizProgressTopicViewSet.as_view(), name='quiz_progress_for_user'),

    re_path(r'^api/guides/$', views.Guides_list, name='guides'),
    re_path(r'^api/guides/([0-9]*)$', views.Guides_detail, name='guide_details'),
    re_path(r'^api/posts/$', views.Posts_Lists, name='posts'),
    re_path(r'^api/posts/([0-9]*)$', views.Posts_detail, name='posts_details'),
    re_path(r'^createPost$', views.createPost, name='create-post'),
    re_path(r'^updatePost/([0-9]*)$', views.updatePost, name='update-post'),
    re_path(r'^deletePost/([0-9]*)$', views.deletePost, name='delete-post'),
    # url(r'^createPost$', include(router.urls), name='create-post'),
]