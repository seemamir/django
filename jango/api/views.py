from django.shortcuts import render
from .models import Post, PostReaction, SavedPost, Comment, Profile, CommentReply, CommentVote, ForgetPassword as ForgetPasswordModel, ReplyVote
from .serializers import PostSerializer, PostReactionSerializer, SavedPostSerializer, UserSerializer,CommentSerializer, ProfileSerializer,CommentReplySerializer,CommentVoteSerializer, ReplyVoteSerializer
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

import random
import string

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from django.http import JsonResponse
# import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
import uuid

import smtplib
import json
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all().order_by('-id')
  serializer_class = PostSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','title','category')

class CommentVoteViewSet(viewsets.ModelViewSet):
  queryset = CommentVote.objects.all()
  serializer_class = CommentVoteSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('comment','user','vote_type')

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

class CommentReplyViewSet(viewsets.ModelViewSet):
  queryset = CommentReply.objects.all()
  serializer_class = CommentReplySerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','user','comment')

class PostReactionViewSet(viewsets.ModelViewSet):
  queryset = PostReaction.objects.all()
  serializer_class = PostReactionSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('post','user','reaction_type')

class SavedPostViewSet(viewsets.ModelViewSet):
  queryset = SavedPost.objects.all().order_by('-id')
  serializer_class = SavedPostSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id', 'user')

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  filter_backends = (DjangoFilterBackend,)
  filter_fields = ('id','username','first_name','last_name','email')


class ReplyVoteViewSet(viewsets.ModelViewSet):
  queryset = ReplyVote.objects.all()
  serializer_class = ReplyVoteSerializer
  filter_backends  = (DjangoFilterBackend,)
  filter_fields = ('user','reply','vote_type')


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

def sendVerificationEmail(request):
  method = request.method;
  if method == "POST":
    data = json.loads(request.body)
    email = data.get('email',1)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.connect("smtp.gmail.com",587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login('jangonewsmailer@gmail.com', 'jango/12345')
    server.sendmail('jangonewsmailer@gmail.com', email, "Hi {email}, you are registered to news website.".format(email=email) )
    server.quit() 
    return JsonResponse({'success': True, 'message': "Email sent"});
  else:
    return JsonResponse({'error': 'Must be post method'})

def ForgetPassword(request):
  method = request.method
  if method == 'GET':
    return JsonResponse({'error': 'Must be get method'})
  email = request.GET.get('email',1)
  if email == 1 or email == '':
    return JsonResponse({'message':'Email is required'})
  print(email)
  token = ''.join(random.sample(string.ascii_uppercase + string.digits*4, 4))
  forgetPasswordInstance = ForgetPasswordModel.objects.create()
  forgetPasswordInstance.email = email
  forgetPasswordInstance.token =  token
  forgetPasswordInstance.save()
  server = smtplib.SMTP('smtp.gmail.com', 587)
  server.connect("smtp.gmail.com",587)
  server.ehlo()
  server.starttls()
  server.ehlo()
  server.login('jangonewsmailer@gmail.com', 'jango/12345')
  server.sendmail('jangonewsmailer@gmail.com', email, "Hey, use {token} to reset your password.".format(token=token) )
  server.quit() 
  return JsonResponse({'success': 'true','message': 'Email has been sent to the requested email'})
  

def ResetPassword(request):
  method = request.method
  if method == 'GET':
    return JsonResponse({'message': 'Must be get method'})
  data = json.loads(request.body)
  token = data.get('token',1)
  password = data.get('password',1)
  confirm_password = data.get('confirm_password',1)
  
  if token == 1 or password == 1 or confirm_password == 1:
    return JsonResponse({'message': 'Token, password, confirm_password are required'})
  if password != confirm_password:
    return JsonResponse({'message': 'Password does not matches'})
  # try:
  model = get_object_or_404(ForgetPasswordModel,token=token)
  if model.token == token:
    # change the password
    user = get_object_or_404(User,email=model.email)
    user.set_password(password)
    user.save()
    return JsonResponse({'message': 'Password changed'})
  else:
    return JsonResponse({'message': 'Token Expired'})
  # except:

  # if forget_password:
  # email = request.POST['token']
  # password = request.POST['password']
  # confirm_password = request.POST['confirm_password']
  # if password != confirm_password:
  #   return JsonResponse({'error': 'Password doesnot matches confirm password'})
