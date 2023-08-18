from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^search/$', views.Search_list, name='search'),
    re_path(r'^api/guides/$', views.Guides_list, name='guides'),
    re_path(r'^api/guides/([0-9])$', views.Guides_detail, name='guide_details'),
]