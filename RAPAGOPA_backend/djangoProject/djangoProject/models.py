# from django.db import models

# class User(models.Model):
#     USER_ID = models.CharField(max_length=10, primary_key=True)
#     USER_PWD = models.CharField(max_length=20)
#     USER_NM = models.CharField(max_length=20)
#     USER_NICKNM = models.CharField(max_length=20)
#     USER_GENDER = models.CharField(max_length=1)
#     USER_YEAR = models.CharField(max_length=4, null=True)
#     USER_YEAR_OPEN_YN = models.CharField(max_length=1, default='Y')
#     USER_MBTI = models.CharField(max_length=4, null=True)
#     USER_MBTI_OPEN_YN = models.CharField(max_length=1, default='Y')
#     USER_FOOD_LIKE_1 = models.CharField(max_length=20, null=True)
#     USER_FOOD_LIKE_2 = models.CharField(max_length=20, null=True)
#     USER_FOOD_CATE_1 = models.CharField(max_length=20, null=True)
#     USER_FOOD_CATE_2 = models.CharField(max_length=20, null=True)
#     USER_INTRO = models.CharField(max_length=2000, null=True)
#     USER_ADM_YN = models.CharField(max_length=1, default='N')

#     class Meta:
#       db_table = 'TB_USER'
      
#     def __str__(self):
#       return self.USER_NM