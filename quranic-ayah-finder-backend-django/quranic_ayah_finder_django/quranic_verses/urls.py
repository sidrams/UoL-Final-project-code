from django.urls import path, re_path
from . import views
# from rest_framework import routers
# from .views import PostViewSet

# router=routers.DefaultRouter()
# router.register(r'createPost',PostViewSet)

urlpatterns = [
    # all endpoints
    path('', views.AllEndpoints.as_view(), name='all_endpoints'),

    # search related url
    re_path(r'^search/$', views.Search_list, name='search'),
    re_path(r'^saveSearch/$', views.SaveSearchViewset.as_view(), name='save-search'),

    # user related urls
    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
	path('profile', views.UserProfileView.as_view(), name='user_profile'),
	path('profile/<str:username>', views.PublicUserProfileView.as_view(), name='public_user_profile'),


    # guides and quizzes related urls
    path('api/guideTopics', views.GuideTopicViewSet.as_view(), name='guide_topics'),
    path('api/quizQuestions', views.QuizQuestionsViewSet.as_view(), name='quiz_questions'),
    path('api/quizQuestions/<int:pk>', views.QuizQuestionsForTopicViewSet.as_view(), name='quiz_questions'),
    path('api/UserQuizProgress', views.UserQuizProgressViewSet.as_view(), name='quiz_progress_for_user'),
    path('api/UserQuizProgress/topic/<int:pk>', views.UserQuizProgressTopicViewSet.as_view(), name='quiz_progress_for_user'),
    path('api/guideContent', views.GuideContentViewSet.as_view(), name='guide contents'),
    path('api/guideContent/topic/<int:pk>', views.GuideContentTopicViewSet.as_view(), name='guide contents'),

    # posts and comments related endpoints
    re_path(r'^api/posts/$', views.Posts_Lists, name='posts'),
    re_path(r'^api/posts/([0-9]*)$', views.Posts_detail, name='posts_details'),
    re_path(r'^createPost$', views.CreatePostViewSet.as_view(), name='create-post'),
    re_path(r'^updatePost/([0-9]*)$', views.PostViewSet.as_view(), name='update-post'),
    re_path(r'^deletePost/([0-9]*)$', views.deletePost, name='delete-post'),
    path('api/comments/posts/<int:pk>', views.CommentsViewSet.as_view(), name="comments_for_posts"),
    path('api/add/comments/posts/<int:pk>', views.AddCommentsViewSet.as_view(), name="comments_for_posts"),
]