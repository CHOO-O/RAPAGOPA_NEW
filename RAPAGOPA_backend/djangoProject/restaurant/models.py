from django.db import models

class Restaurant(models.Model):
    RESTAURANT_NO = models.CharField(max_length=20, primary_key=True)
    RESTAURANT_NM = models.CharField(max_length=50)
    RESTAURANT_CATE = models.CharField(max_length=20)
    RESTAURANT_TIME = models.CharField(max_length=20, null=True, blank=True)
    RESTAURANT_BREAK_TIME = models.CharField(max_length=20, null=True, blank=True)
    RESTAURANT_REST_DAY = models.CharField(max_length=50, null=True, blank=True)
    RESTAURANT_TEL = models.CharField(max_length=15, null=True, blank=True)
    RESTAURANT_JIBUN_ADDR = models.CharField(max_length=200, null=True, blank=True)
    RESTAURANT_DORO_ADDR = models.CharField(max_length=200, null=True, blank=True)
    RESTAURANT_NAVER_URL = models.CharField(max_length=1000, null=True, blank=True)
    RESTAURANT_MAP_LENGTH = models.CharField(max_length=3, null=True, blank=True)
    RESTAURANT_PHOTO = models.BinaryField(null=True, blank=True)  # Assuming BLOB is for storing binary data
    MOD_YN = models.CharField(max_length=1, default='N')
    DEL_YN = models.CharField(max_length=1, default='N')

    class Meta:
        db_table = 'TB_RESTAURANT'

    @classmethod
    def get_restaurant_name_by_id(cls, restaurant_id):
      try:
          restaurant = cls.objects.get(RESTAURANT_NO=restaurant_id)
          return restaurant.RESTAURANT_NM
      except cls.DoesNotExist:
          return None