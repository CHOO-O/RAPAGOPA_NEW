from django.contrib import admin
from django.urls import path
from djangoProject.view import hello_rest_api
# from djangoProject.view import UserAPIView
from login.view import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_rest_api, name='hello_rest_api'),
    # path('api/user/', UserAPIView.as_view(), name="UserAPIView"),
    path('login/', LoginView.as_view(), name='login'),
]

