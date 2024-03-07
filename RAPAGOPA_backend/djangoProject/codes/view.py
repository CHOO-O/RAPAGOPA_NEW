from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Codes
from .serializers import CodesSerializer
from django.http import JsonResponse

class CodesListView(generics.ListAPIView):
    queryset = Codes.objects.all()
    serializer_class = CodesSerializer

def filter_codes_by_prefix(request, prefix):
    codes = Codes.objects.filter(CODE_CD__startswith=prefix)
    data = [{'code_cd': code.CODE_CD, 'code_nm': code.CODE_NM} for code in codes]
    return JsonResponse(data, safe=False)