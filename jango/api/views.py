from django.shortcuts import render
from .models import Post,PostReaction,SavedPost, Comment,Profile
from .serializers import PostSerializer,PostReactionSerializer, SavedPostSerializer, UserSerializer,CommentSerializer, ProfileSerializer

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from django.http import JsonResponse
# import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','title','category')


class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','user')

class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','user','post')

class PostReactionViewSet(viewsets.ModelViewSet):
  queryset = PostReaction.objects.all()
  serializer_class = PostReactionSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('post','user','reaction_type')

class SavedPostViewSet(viewsets.ModelViewSet):
  queryset = SavedPost.objects.all()
  serializer_class = SavedPostSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id', 'user')

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','username','first_name','last_name','email')
  
def Login(request):
  method = request.method
  if (method == 'POST'):
    return JsonResponse({'success': ""})
  else:
    return JsonResponse({'error': "This request only handles post request"})


def Signup(request):
  method = request.method
  if (method == 'POST'):
    # try:
      user = User.objects.create(
        username=request.POST['username'],
        first_name=request.POST['first_name'],
        last_name=request.POST['last_name'],
        email=request.POST['email'],
      )

      user.set_password(user['password'])
      user.save()
      return JsonResponse({'password': user['email']})
    # except:
        # return JsonResponse({'error': 'Something went wrong'})
  else:
    return JsonResponse({'error': "This request only handles post request"})


def RequestPasswordResetToken(request):
  return 3


def ResetPassword(request):
  return 4
