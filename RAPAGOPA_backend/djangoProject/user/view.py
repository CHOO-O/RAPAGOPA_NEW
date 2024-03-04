from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLoginView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'message': 'This is the login endpoint. Please use POST method to login.'})

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('USER_ID')
        user_pwd = request.data.get('USER_PWD')

        try:
            user = User.objects.get(USER_ID=user_id, USER_PWD=user_pwd)
            return Response({'message': 'Login successful', 'user_id': user.USER_ID, 'user_name': user.USER_NM})
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
