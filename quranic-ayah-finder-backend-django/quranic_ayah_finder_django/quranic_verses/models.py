from django.db import models

# Create your models here.\
def upload_path(instance, filname):
    return '/'.join(['covers', str(instance.title), filname])

class Guides(models.Model):
    name = models.CharField("Name", max_length=240)
    description = models.CharField("Description", max_length=20)
    image = models.ImageField(blank=True, null=True, upload_to='images/')
    
    def __str__(self):
        return self.name