from django.db import models

class User(models.Model):
    USER_ID = models.CharField(max_length=10, primary_key=True)
    USER_PWD = models.CharField(max_length=20, blank=True, null=True)
    USER_NM = models.CharField(max_length=20, blank=True, null=True)
    USER_NICKNM = models.CharField(max_length=20, blank=True, null=True)
    USER_GENDER = models.CharField(max_length=1, blank=True, null=True)
    USER_YEAR = models.CharField(max_length=4, blank=True, null=True)
    USER_YEAR_OPEN_YN = models.CharField(max_length=1, default='Y')
    USER_MBTI = models.CharField(max_length=4, blank=True, null=True)
    USER_MBTI_OPEN_YN = models.CharField(max_length=1, default='Y')
    USER_FOOD_LIKE_1 = models.CharField(max_length=20, blank=True, null=True)
    USER_FOOD_LIKE_2 = models.CharField(max_length=20, blank=True, null=True)
    USER_FOOD_CATE_1 = models.CharField(max_length=20, blank=True, null=True)
    USER_FOOD_CATE_2 = models.CharField(max_length=20, blank=True, null=True)
    USER_INTRO = models.CharField(max_length=2000, blank=True, null=True)
    USER_IMAGE_URL = models.CharField(max_length=1000, blank=True, null=True)
    USER_ADM_YN = models.CharField(max_length=1, default='N')

    class Meta:
        db_table = 'TB_USER'
      
    def __str__(self):
        return self.USER_NM

    @classmethod
    def login(cls, user_id, user_pwd):
        try:
            user = cls.objects.get(USER_ID=user_id, USER_PWD=user_pwd)
            return user.USER_ID, user.USER_PWD
        except cls.DoesNotExist:
            return None, None
        
    @classmethod
    def update_user_info(cls, user_id, **kwargs):
        try:
            user = cls.objects.get(USER_ID=user_id)
            for key, value in kwargs.items():
                if hasattr(user, key):
                    setattr(user, key, value)
            user.save()
            return True
        except cls.DoesNotExist:
            return False
        
    @classmethod
    def nm_check(cls, user_id, user_nicknm):
        print(user_nicknm, user_id);
        try:
            user = cls.objects.get(USER_ID = user_id)
            current_nicknm = user.USER_NICKNM
        except cls.DoesNotExist:
            return {"message:error"}
        if current_nicknm == user_nicknm:
            return 1

        if cls.objects.filter(USER_NICKNM=user_nicknm).exists():
            return 0  # 닉네임이 이미 존재함
        else:
            return 1  # 닉네임이 존재하지 않음
      
      