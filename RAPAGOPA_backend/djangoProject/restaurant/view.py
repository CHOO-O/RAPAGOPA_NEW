from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Restaurant
from .serializers import RestaurantSerializer

class RestaurantListView(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantDetailView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantNameAPIView(APIView):
    def get(self, request, restaurant_no):
        restaurant_name = Restaurant.get_restaurant_name_by_id(restaurant_no)
        if restaurant_name is not None:
            return Response({'restaurant_name': restaurant_name}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)