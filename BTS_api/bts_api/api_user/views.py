from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from .models import User
from .serializers import UserRegisterSerializer, UserUpdateSerializer, UserCheckSerializer, UserInfoSerializer, \
    UserListSerializer


class UserInfoAPI(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer

class UserAPI(ListAPIView):
    serializer_class = UserListSerializer

    def get_queryset(self):
        return User.objects.all().order_by('id').reverse()


class UserCheckAPI(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserCheckSerializer

    def post(self, request):
        username = request.data.get('username')
        try:
            User.objects.get(username=username)
            return Response({'message': 'Error'})
        except:
            return Response({'message': 'OK'})


class UserRegisterAPI(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        return super(UserRegisterAPI, self).create(request, *args, **kwargs)


class UserUpdateAPI(RetrieveAPIView, UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def partial_update(self, request, *args, **kwargs):
        return super(UserUpdateAPI, self).partial_update(request, *args, **kwargs)


class UserDestroyAPI(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ModelSerializer
