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

class UserUpdateInfoView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('USER_ID')
        if user_id:
            try:
                user = User.objects.get(USER_ID=user_id)
                serializer = UserSerializer(user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'User information updated successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

class UserNickNameCheck(APIView):
    def post(self, request, *args, **kwargs):
        user_nicknm = request.data.get('USER_NICKNM')
        user_id = request.data.get('USER_ID')
        # 기존 닉네임 중복 확인 메서드 호출
        result = User.nm_check(user_id, user_nicknm)

        # 결과에 따라 응답 반환
        if result == 1:
            return Response(1, status=status.HTTP_200_OK)
        elif result == 0:
            return Response(0, status = status.HTTP_200_OK)
        else:
            return Response({'message': '오류'}, status=status.HTTP_400_BAD_REQUEST)