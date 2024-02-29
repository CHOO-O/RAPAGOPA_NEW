from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import render
# from .models import User
# from .serializers import UserSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def hello_rest_api(request):
    data = {'message': 'Hello, REST API!'}
    return Response(data)


# class UserAPIView(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
