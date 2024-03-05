from django.contrib import admin
from django.urls import path
from user.view import UserListView, UserDetailView, UserLoginView, UserUpdateInfoView, UserNickNameCheck


urlpatterns = [
    path('admin/', admin.site.urls),
    # TB_USER
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<str:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('update-user-info/', UserUpdateInfoView.as_view(), name='update-user-info'),
    path('nm_check/', UserNickNameCheck.as_view(), name='nm_check')
]

