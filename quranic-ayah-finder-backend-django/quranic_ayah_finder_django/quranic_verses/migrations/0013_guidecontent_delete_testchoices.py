# Generated by Django 4.2.3 on 2023-08-24 19:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quranic_verses', '0012_testchoices'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuideContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=1000, verbose_name='content')),
                ('topic_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quranic_verses.guidetopic')),
            ],
        ),
        migrations.DeleteModel(
            name='TestChoices',
        ),
    ]