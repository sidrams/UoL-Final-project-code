# from django.test import TestCase, Client
# from django.urls import reverse
# from quranic_verses.models import Guides
# import json

# class TestViews(TestCase):

#     def setUp(self):
#         self.client = Client()
#         self.search_url = reverse('search')
#         self.guides_url = reverse('guides')
#         self.guides_list_url = reverse('guide_details', args=[1])
#         self.guide1 = Guides.objects.create(
#             # id=1,
#             name='test_book',
#             description='description of test book'
#         )

#     def test_search_list_GET(self):
#         response = self.client.get(self.search_url)

#         self.assertEquals(response.status_code, 200)
#         # self.assertTemplateUsed

#     def test_guides_list_GET(self):
#         response = self.client.get(self.guides_url)

#         self.assertEquals(response.status_code, 200)

#     def test_guides_detail_GET(self):
#         response = self.client.get(self.guides_list_url)
#         self.assertEquals(response.status_code, 200)

#     def test_guides_list_POST_add_new_guide(self):
#         response = self.client.post(self.guides_url, {
#             'name':'test post',
#             'description':'this book is testing the post method'
#         })
        
#         self.assertEquals(response.status_code, 201)
#         self.assertEquals(Guides.objects.get(name='test post').name, 'test post')

#     def test_guides_list_POST_no_data(self):
#         response = self.client.post(self.guides_url)
        
#         self.assertEquals(response.status_code, 400)

#     def test_guides_list_DELETE_deletes_guide(self):
#         Guides.objects.create(
#             name='test delete',
#             description='description of deleting path'
#         )
#         response = self.client.delete(self.guides_list_url, json.dumps({
#             'id':1
#         }))
        
#         self.assertEquals(response.status_code, 204)

#     # def test_guides_list_DELETE_no_id(self):
#     #     Guides.objects.create(
#     #         name='test delete',
#     #         description='description of deleting path'
#     #     )
#     #     response = self.client.delete(self.guides_list_url)
        
#     #     self.assertEquals(response.status_code, 404)
