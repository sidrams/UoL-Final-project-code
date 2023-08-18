"""
URL configuration for quranic_ayah_finder_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from quranic_verses import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers

from quranic_verses.views import GuideViewSet

router = routers.DefaultRouter()
router.register('images', GuideViewSet, basename='images')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/images/', include(router.urls)),
    path('', include('quranic_verses.urls')),
    # re_path(r'^search/$', views.Search_list, name='search'),
    # re_path(r'^api/guides/$', views.Guides_list, name='guides'),
    # re_path(r'^api/guides/([0-9])$', views.Guides_detail, name='guide_details'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)