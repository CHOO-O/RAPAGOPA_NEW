from django.db import models

class Codes(models.Model):
    CODE_CD = models.CharField(max_length=20, primary_key=True)
    CODE_NM = models.CharField(max_length=30)
    PAR_CODE_CD = models.CharField(max_length=20, null=True, blank=True)
    DEPTH = models.CharField(max_length=1)
    DETAIL = models.CharField(max_length=1000, null=True, blank=True)
    USE_YN = models.CharField(max_length=1, default='Y')

    class Meta:
        db_table = 'TB_CODE'