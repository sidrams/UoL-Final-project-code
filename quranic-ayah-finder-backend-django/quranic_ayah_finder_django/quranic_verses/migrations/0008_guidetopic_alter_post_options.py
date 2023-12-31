# Generated by Django 4.2.3 on 2023-08-23 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quranic_verses', '0007_post_user_post_verse_id_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuideTopic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic_name', models.CharField(max_length=500, verbose_name='Topic_name')),
            ],
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-updated', '-created']},
        ),
    ]
