# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Login
from .serializers import LoginSerializer

class LoginView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'message': 'This is the login endpoint. Please use POST method to login.'})

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('USER_ID')
        user_pwd = request.data.get('USER_PWD')

        try:
            user = Login.objects.get(USER_ID=user_id, USER_PWD=user_pwd)
            return Response({'message': 'Login successful', 'user_id': user.USER_ID, 'user_name': user.USER_NM})
        except Login.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
