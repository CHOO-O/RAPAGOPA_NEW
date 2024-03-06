from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer

class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewListView(APIView):
    def get(self, request, restaurant_no, format=None):
        print(restaurant_no);
        try:
            reviews = Review.show_review(restaurant_no)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        except Review.DoesNotExist:
            return Response({'message': 'No reviews found for the restaurant'}, status=status.HTTP_404_NOT_FOUND)