# Generated by Django 4.2.3 on 2023-07-12 15:54

from django.db import migrations, models
import quranic_verses.models


class Migration(migrations.Migration):

    dependencies = [
        ('quranic_verses', '0002_quranic_verses'),
    ]

    operations = [
        migrations.AddField(
            model_name='guides',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
