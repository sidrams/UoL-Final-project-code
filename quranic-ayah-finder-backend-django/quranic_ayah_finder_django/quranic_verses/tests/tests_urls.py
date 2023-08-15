from django.test import SimpleTestCase
from django.urls import reverse, resolve
from quranic_verses.views import *


class TestUrls(SimpleTestCase):

    def test_search_url_is_resolves(self):
        url = reverse('search')
        # print(resolve(url))
        self.assertEquals(resolve(url).func, Search_list)

    def test_guides_url_is_resolves(self):
        url = reverse('guides')
        # print(resolve(url))
        self.assertEquals(resolve(url).func, Guides_list)

    def test_guide_details_url_is_resolves(self):
        url = reverse('guide_details', args=[1])
        # print(resolve(url))
        self.assertEquals(resolve(url).func, Guides_detail)