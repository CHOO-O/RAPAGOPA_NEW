# models.py
from django.db import models

class Login(models.Model):
    USER_ID = models.CharField(max_length=10, primary_key=True)
    USER_PWD = models.CharField(max_length=20)
    USER_NM = models.CharField(max_length=20)

    class Meta:
      db_table = 'TB_USER'
      
    def __str__(self):
        return self.USER_NM
