from django.test import SimpleTestCase
from django.urls import reverse, resolve
from quranic_verses.views import *

class TestAllEnpountsUrl(SimpleTestCase):
    def test_all_endpoint_url_resolves(self):
        url = reverse('all_endpoints')
        self.assertEquals(resolve(url).func.view_class, AllEndpoints)
     
class TestSearchUrls(SimpleTestCase):

    def test_search_url_is_resolves(self):
        url = reverse('search')
        self.assertEquals(resolve(url).func, Search_list)

    def test_save_search_url_is_resolves(self):
        url = reverse('save-search')
        self.assertEquals(resolve(url).func.view_class, SaveSearchViewset)

    def test_save_search_ID_url_is_resolves(self):
        url = reverse('save-search-for-detail', args=[1])
        self.assertEquals(resolve(url).func.view_class, SaveSearchDetailViewset)


# user related urls
class TestUserUrls(SimpleTestCase):
    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func.view_class, UserRegister)

    def test_login_url_is_resolves(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func.view_class, UserLogin)

    def test_logout_url_is_resolves(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func.view_class, UserLogout)

    def test_user_url_is_resolves(self):
        url = reverse('user')
        self.assertEquals(resolve(url).func.view_class, UserView)

    def test_profile_url_is_resolves(self):
        url = reverse('user_profile')
        self.assertEquals(resolve(url).func.view_class, UserProfileView)

    def test_public_profile_with_username_url_is_resolves(self):
        url = reverse('public_user_profile', args=['test'])
        self.assertEquals(resolve(url).func.view_class, PublicUserProfileView)

 # guides and quizzes related urls
class TestGuidesAndQuizUrls(SimpleTestCase):
    def test_guide_topics_url_is_resolves(self):
        url = reverse('guide_topics')
        self.assertEquals(resolve(url).func.view_class, GuideTopicViewSet)

def test_quiz_questions_is_resolves(self):
        url = reverse('quiz_questions')
        self.assertEquals(resolve(url).func.view_class, QuizQuestionsViewSet)

def test_quiz_questions_ID_url_is_resolves(self):
        url = reverse('quiz_questions_ID', args=[1])
        self.assertEquals(resolve(url).func.view_class, QuizQuestionsForTopicViewSet)

def test_quiz_progress_for_user_url_is_resolves(self):
        url = reverse('quiz_progress_for_user')
        self.assertEquals(resolve(url).func.view_class, UserQuizProgressViewSet)

def test_quiz_progress_for_user_ID_url_is_resolves(self):
        url = reverse('quiz_progress_for_user_ID', args=[1])
        self.assertEquals(resolve(url).func.view_class, UserQuizProgressTopicViewSet)

def test_guide_contents_url_is_resolves(self):
        url = reverse('guide_contents')
        self.assertEquals(resolve(url).func.view_class, GuideContentViewSet)

def test_guide_contents_ID_url_is_resolves(self):
        url = reverse('guide_contents_ID', args=[1])
        self.assertEquals(resolve(url).func.view_class, GuideContentTopicViewSet)

# posts and comments related endpoints
class TestGuidesAndQuizUrls(SimpleTestCase):
    def test_posts_url_is_resolves(self):
        url = reverse('posts')
        self.assertEquals(resolve(url).func, Posts_Lists)
    
    def test_posts_details_url_is_resolves(self):
        url = reverse('posts_details', args=[1])
        self.assertEquals(resolve(url).func, Posts_detail)
    
    def test_create_post_url_is_resolves(self):
        url = reverse('create_post')
        self.assertEquals(resolve(url).func.view_class, CreatePostViewSet)
    
    def test_update_post_url_is_resolves(self):
        url = reverse('update_post', args=[1])
        self.assertEquals(resolve(url).func.view_class, PostViewSet)
    
    def test_delete_post_url_is_resolves(self):
        url = reverse('delete_post', args=[1])
        self.assertEquals(resolve(url).func, deletePost)
    
    def test_comments_for_posts_url_is_resolves(self):
        url = reverse('comments_for_posts', args=[1])
        self.assertEquals(resolve(url).func.view_class, CommentsViewSet)
    
    def test_comments_for_posts_ID_url_is_resolves(self):
        url = reverse('comments_for_posts_ID', args=[1])
        self.assertEquals(resolve(url).func.view_class, AddCommentsViewSet)
    