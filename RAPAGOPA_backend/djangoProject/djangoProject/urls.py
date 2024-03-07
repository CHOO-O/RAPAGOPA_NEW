from django.contrib import admin
from django.urls import path
from user.view import UserListView, UserDetailView, UserLoginView, UserUpdateInfoView, UserNickNameCheck, UserIDtoInfoAPIView
from restaurant.view import RestaurantListView, RestaurantDetailView, RestaurantNameAPIView
from review.view import ReviewListView
from apis.view import ReviewWithUserInfoView
from codes.view import CodesListView, filter_codes_by_prefix 

urlpatterns = [
    path('admin/', admin.site.urls),
    # TB_USER
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<str:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('update-user-info/', UserUpdateInfoView.as_view(), name='update-user-info'),
    path('nm_check/', UserNickNameCheck.as_view(), name='nm_check'),
    path('user-info/<str:user_id>/', UserIDtoInfoAPIView.as_view(), name='user-info'),
    # TB_RESTAURANT
    path('restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('restaurants/<str:pk>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('restaurant/<str:restaurant_no>/name/', RestaurantNameAPIView.as_view(), name='restaurant_name_api'),
    # TB_FOOD_REVIEW
    path('reviews/', ReviewListView.as_view(), name='review-list'),
    path('reviews/<str:restaurant_no>/', ReviewListView.as_view(), name='review-list'),
    # APIs
    path('reviews-with-user-info/<str:restaurant_no>/', ReviewWithUserInfoView.as_view(), name='review-with-user-info'),
    # Codes
    path('codes/', CodesListView.as_view(), name='codes-list'),
    path('food-like-codes/', filter_codes_by_prefix, {'prefix': 'FLCD_'}),
    path('food-kind-codes/', filter_codes_by_prefix, {'prefix': 'FKCD_'}),
    path('restaurant-category-codes/', filter_codes_by_prefix, {'prefix': 'RES_'}),
]

