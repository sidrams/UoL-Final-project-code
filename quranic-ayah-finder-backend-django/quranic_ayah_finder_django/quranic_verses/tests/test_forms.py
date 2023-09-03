from django.test import TestCase
from quranic_verses.forms import *
from django.contrib.auth.models import User


class TestForms(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('testUSer', 'test@test.com', 'testpassword')

    def test_post_form_valid_data(self):
        form = PostForm(data={
            'title': 'test',
            'user':self.user,
            'description':'test description',
            'image':None
        })
        self.assertTrue(form.is_valid())