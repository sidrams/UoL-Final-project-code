from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Guides)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(GuideTopic)
admin.site.register(QuizQuestion)
admin.site.register(UserQuizProgress)
