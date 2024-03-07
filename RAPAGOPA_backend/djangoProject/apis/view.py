from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from user.models import  User
from review.models import Review
from user.serializers import  UserSerializer
from review.serializers import ReviewSerializer

class ReviewWithUserInfoView(APIView):
    def get(self, request, restaurant_no):
        try:
            # 식당 번호에 해당하는 리뷰를 가져옵니다.
            reviews = Review.objects.filter(RESTAURANT_NO=restaurant_no)
            review_data = ReviewSerializer(reviews, many=True).data

            # 리뷰에 해당하는 사용자 정보를 가져와서 데이터에 추가합니다.
          
            for review in review_data:
              user = User.objects.get(USER_ID=review['USER_ID'])
              user_data = UserSerializer(user).data
              review.update(user_data)

            return Response(review_data, status=status.HTTP_200_OK)

        except Review.DoesNotExist:
            return Response({'error': 'Reviews not found'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)