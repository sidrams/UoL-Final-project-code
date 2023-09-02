# Generated by Django 4.2.3 on 2023-09-02 15:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quranic_verses', '0015_alter_post_user_usersavedverse'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersavedverse',
            name='saved',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 9, 2, 15, 1, 17, 393549, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usersavedverse',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]