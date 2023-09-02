from django.forms import ModelForm
from .models import Post 

class PostForm(ModelForm):
    class Meta:
        model = Post 
        fields = ('title','user', 'description', 'image') 
        # exclude = ('verse_id',)