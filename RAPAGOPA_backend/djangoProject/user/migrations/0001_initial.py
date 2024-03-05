# Generated by Django 5.0.2 on 2024-03-05 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('USER_ID', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('USER_PWD', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_NM', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_NICKNM', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_GENDER', models.CharField(blank=True, max_length=1, null=True)),
                ('USER_YEAR', models.CharField(blank=True, max_length=4, null=True)),
                ('USER_YEAR_OPEN_YN', models.CharField(default='Y', max_length=1)),
                ('USER_MBTI', models.CharField(blank=True, max_length=4, null=True)),
                ('USER_MBTI_OPEN_YN', models.CharField(default='Y', max_length=1)),
                ('USER_FOOD_LIKE_1', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_FOOD_LIKE_2', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_FOOD_CATE_1', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_FOOD_CATE_2', models.CharField(blank=True, max_length=20, null=True)),
                ('USER_INTRO', models.CharField(blank=True, max_length=2000, null=True)),
                ('USER_IMAGE_URL', models.CharField(blank=True, max_length=1000, null=True)),
                ('USER_ADM_YN', models.CharField(default='N', max_length=1)),
            ],
            options={
                'db_table': 'TB_USER',
            },
        ),
    ]
