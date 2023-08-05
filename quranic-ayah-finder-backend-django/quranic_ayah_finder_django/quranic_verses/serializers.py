from rest_framework import serializers
from .models import Guides

class GuidesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Guides 
        fields = ('pk', 'name', 'description', 'image')