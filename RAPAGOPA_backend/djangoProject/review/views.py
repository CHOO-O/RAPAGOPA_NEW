# from django.db import models

# class User(models.Model):
#     USER_ID = models.CharField(max_length=10, primary_key=True)
#     USER_PWD = models.CharField(max_length=20, blank=True, null=True)
#     USER_NM = models.CharField(max_length=20, blank=True, null=True)
#     USER_NICKNM = models.CharField(max_length=20, blank=True, null=True)
#     USER_GENDER = models.CharField(max_length=1, blank=True, null=True)
#     USER_YEAR = models.CharField(max_length=4, blank=True, null=True)
#     USER_YEAR_OPEN_YN = models.CharField(max_length=1, default='Y')
#     USER_MBTI = models.CharField(max_length=4, blank=True, null=True)
#     USER_MBTI_OPEN_YN = models.CharField(max_length=1, default='Y')
#     USER_FOOD_LIKE_1 = models.CharField(max_length=20, blank=True, null=True)
#     USER_FOOD_LIKE_2 = models.CharField(max_length=20, blank=True, null=True)
#     USER_FOOD_CATE_1 = models.CharField(max_length=20, blank=True, null=True)
#     USER_FOOD_CATE_2 = models.CharField(max_length=20, blank=True, null=True)
#     USER_INTRO = models.CharField(max_length=2000, blank=True, null=True)
#     USER_IMAGE_URL = models.CharField(max_length=1000, blank=True, null=True)
#     USER_ADM_YN = models.CharField(max_length=1, default='N')

#     class Meta:
#         db_table = 'TB_FOOD_REVIEW'