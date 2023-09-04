from django.test import TestCase, Client
from django.urls import reverse
from quranic_verses.models import *
import json
from django.contrib.auth.models import User

class TestSearchViews(TestCase):

    def setUp(self):
        self.client = Client()
        # search urls
        self.search_url = reverse('search')
        self.save_search_url = reverse('save-search')
        self.save_search_for_detail_url = reverse('save-search-for-detail', args=[1])
        
        self.user = User.objects.create_user('testUser1', 'test@test.com', 'testpassword', id=1)
        self.userSavedVerse = UserSavedVerse.objects.create(
            id=1,
            user = self.user,
            verse_key = '1:1',
            translation = 'test translation',
            user_notes = 'test user notes'
        )
        self.loggedUser = User.objects.get(username="testUser1")
        login = self.client.login(username='testUser1', password='testpassword')
        self.assertTrue(login)
        self.assertEqual(self.loggedUser.username, 'testUser1')

    def test_search_list_GET(self):
        response = self.client.get(self.search_url)

        self.assertEquals(response.status_code, 200)

    def test_save_search_url_GET(self):
        response = self.client.get(self.save_search_url)

        self.assertEquals(response.status_code, 200)

    def test_save_search_for_detail_url_GET(self):
        response = self.client.get(self.save_search_for_detail_url)
        self.assertEquals(response.status_code, 200)

    def test_save_search_url_POST_save_new_verse(self):
        response = self.client.post(self.save_search_url, {
            'id': 2,
            'user' : self.user,
            'verse_key' : '1:2',
            'translation' : 'test translation',
            'user_notes' : 'test user notes'
        })
        
        self.assertEquals(response.status_code, 201)
        self.assertEquals(UserSavedVerse.objects.get(id=2).verse_key, '1:2')

    # test user can update saved verses
    def test_save_search_url_POST_update_saved_verse(self):
        response = self.client.post(self.save_search_for_detail_url, {
            'id': 1,
            'translation' : 'test translation',
            'user_notes' : 'test user notes updated'
        })
        
        self.assertEquals(response.status_code, 201)
        self.assertEquals(UserSavedVerse.objects.get(id=1).verse_key, '1:1')
        self.assertEquals(UserSavedVerse.objects.get(id=1).user_notes, 'test user notes updated')


    # def test_save_search_url_POST_no_data(self):
    #     response = self.client.post(self.save_search_for_detail_url, {})
        
    #     self.assertEquals(response.status_code, 400)

    # def test_guides_list_DELETE_deletes_guide(self):
    #     Guides.objects.create(
    #         name='test delete',
    #         description='description of deleting path'
    #     )
    #     response = self.client.delete(self.guides_list_url, json.dumps({
    #         'id':1
    #     }))
        
    #     self.assertEquals(response.status_code, 204)


class TestUserViews(TestCase):

    def setUp(self):
        self.client = Client()
        # user urls
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.user_url = reverse('user')
        self.user_profile_url = reverse('user_profile')
        self.public_user_profile = reverse('public_user_profile', args=['testUser2'])

        # create and login user
        self.user = User.objects.create_user('testUser1', 'test@test.com', 'testpassword', id=1)
        self.loggedUser = User.objects.get(username="testUser1")
        login = self.client.login(username='testUser1', password='testpassword')
        self.assertTrue(login)
        self.assertEqual(self.loggedUser.username, 'testUser1')

        self.user2 = User.objects.create_user('testUser2', 'test@test.com', 'testpassword', id=2)


    def test_register_url_POST(self):
        response = self.client.post(self.register_url, {
            'id':3,
            'username': 'testUser3',
            'password':'testpassword'
        })
        
        self.assertEquals(response.status_code, 201)
        self.assertEquals(User.objects.get(id=3).username, 'testUser3')


    def test_login_url_is_POST(self):
        response = self.client.post(self.login_url, {
            'username': 'testUser2',
            'password':'testpassword'
        })
        
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.wsgi_request.user.username, 'testUser2')

    def test_logout_url_is_POST(self):
        response = self.client.post(self.logout_url)
        
        self.assertEquals(response.status_code, 200)
        self.assertNotEquals(response.wsgi_request.user.username, 'testUser2')
        self.assertEquals(response.wsgi_request.user.username, '')

    def test_user_url_is_GET(self):
        response = self.client.get(self.user_url)
        self.assertEquals(response.status_code, 200)

    def test_profile_url_is_GET(self):
        response = self.client.get(self.user_profile_url)
        self.assertEquals(response.status_code, 200)

    def test_public_profile_with_username_url_is_GET(self):
        # logout if any user is logged in
        self.client.post(self.logout_url)

        response = self.client.get(self.public_user_profile)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.wsgi_request.user.username, '')


class TestGuidesAndQuizViews(TestCase):

    def setUp(self):
        self.client = Client()
        # guides and quizzes url 
        self.guide_topics = reverse('guide_topics')
        self.quiz_questions = reverse('quiz_questions')
        self.quiz_questions_ID = reverse('quiz_questions_ID', args=[1])
        self.quiz_progress_for_user = reverse('quiz_progress_for_user')
        self.quiz_progress_for_user_ID = reverse('quiz_progress_for_user_ID', args=[1])
        self.guide_contents = reverse('guide_contents')
        self.guide_contents_ID = reverse('guide_contents_ID', args=[1])

        # self.guide1 = Guides.objects.create(
        #     # id=1,
        #     name='test_book',
        #     description='description of test book'
        # )

# post related views
class TestPostViews(TestCase):

    def setUp(self):
        self.client = Client()
        # post urls
        self.posts = reverse('posts')
        self.posts_details = reverse('posts_details', args=[1])
        self.create_post = reverse('create_post')
        self.update_post = reverse('update_post', args=[1])
        self.delete_post = reverse('delete_post', args=[3])
        self.comments_for_posts = reverse("comments_for_posts", args=[1])
        self.comments_for_posts_ID = reverse("comments_for_posts_ID", args=[1])
        
        # create and login user
        self.user = User.objects.create_user('testUser1', 'test@test.com', 'testpassword', id=1)
        self.loggedUser = User.objects.get(username="testUser1")
        login = self.client.login(username='testUser1', password='testpassword')
        self.assertTrue(login)
        self.assertEqual(self.loggedUser.username, 'testUser1')

        self.user2 = User.objects.create_user('testUser2', 'test@test.com', 'testpassword', id=2)

        self.post = Post.objects.create(
            id=1,
            title = 'test title',
            description = 'test description',
            user = self.user,
            verse_id = 1,
        )
        
    def test_posts_url_is_GET(self):
        # logout any user if logged in
        self.client.logout()
        response = self.client.get(self.posts)
        self.assertEquals(response.status_code, 200)
    
    def test_posts_details_url_is_GET(self):
        self.client.logout()
        response = self.client.get(self.posts_details)
        self.assertEquals(response.status_code, 200)
    
    def test_create_post_url_is_POST(self):
        response = self.client.post(self.create_post, {
            'id' :2,
            'title' : 'test title 2',
            'description' : 'test description 2',
            'user' :self.user,
        })
        
        post = Post.objects.get(id=2)
        self.assertEquals(response.status_code, 201)
        self.assertEquals(post.user.username, 'testUser1')
        self.assertEquals(post.title, 'test title 2')
        self.assertEquals(post.description, 'test description 2')

    def test_update_post_url_is_POST(self):
        response = self.client.post(self.update_post, {
            'id' :1,
            'title' : 'test title updated',
        })

        post = Post.objects.get(id=1)
        self.assertEquals(response.status_code, 201)
        self.assertEquals(post.title, 'test title updated')
        self.assertEquals(post.description, 'test description')

    def test_delete_post_url_is_POST(self):
        Post.objects.create(
            id=3,
            title = 'test title',
            description = 'test description',
            user = self.user,
            verse_id = 1,
        )
        response = self.client.post(self.delete_post)

        self.assertEquals(response.status_code, 200)         

    
    def test_comments_for_posts_url_is_GET(self):
        response = self.client.get(self.comments_for_posts)
        self.assertEquals(response.status_code, 200)
    
    # def test_comments_for_posts_ID_url_is_POST(self):
    #     self.client.login(username='testUser1', password='testpassword')
    #     response = self.client.post(self.comments_for_posts_ID, {
    #         'body' : 'test comment'
    #     })
        

    #     comment = Comment.objects.get(id=1)
    #     self.assertEquals(response.status_code, 201)
        # self.assertEquals(comment.post.title, 'test title')
        # self.assertEquals(comment.user.username, 'testUser1')
        # self.assertEquals(comment.body, 'test comment')
    