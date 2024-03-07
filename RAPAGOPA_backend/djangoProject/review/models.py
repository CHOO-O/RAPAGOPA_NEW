from django.db import models

class Review(models.Model):
    FOOD_REVIEW_NO = models.CharField(max_length=20, primary_key=True)
    FOOD_NO = models.CharField(max_length=20)
    RESTAURANT_NO = models.CharField(max_length=20)
    USER_ID = models.CharField(max_length=10)
    TOT_SCORE = models.IntegerField()
    DEL_SCORE = models.IntegerField()
    AMO_SCORE = models.IntegerField()
    PRI_SCORE = models.IntegerField()
    FOOD_REVIEW = models.CharField(max_length=2000, blank=True, null=True)
    MOD_YN = models.CharField(max_length=1, default='N')
    DEL_YN = models.CharField(max_length=1, default='N')
    REG_DT = models.DateField()
    MOD_DT = models.DateField()

    class Meta:
        db_table = 'TB_FOOD_REVIEW'
    
    @classmethod
    def show_review(cls, restaurant_no):
      try:
          reviews = cls.objects.filter(RESTAURANT_NO=restaurant_no)
          return reviews
      except cls.DoesNotExist:
          return None
