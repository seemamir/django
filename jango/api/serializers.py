from .models import Post,PostReaction,SavedPost, Comment, Profile, ForgetPassword
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = "__all__"

class PostReactionSerializer(serializers.ModelSerializer):
  # user = UserSerializer(many=False, read_only=False)
  class Meta:
    model = PostReaction
    fields = "__all__"

class ForgetPasswordSerializer(serializers.ModelSerializer):
  # user = UserSerializer(many=False, read_only=False)
  class Meta:
    model = ForgetPassword
    fields = "__all__"


class SavedPostSerializer(serializers.ModelSerializer):
  # post = PostSerializer(many=False, read_only=False)
  
  class Meta:
    model = SavedPost
    fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
  # user = UserSerializer(many=False, read_only=False)
  class Meta:
    model = Comment
    fields = "__all__"


  # def create(self, validated_data):
  #   user = User.objects.create(
  #     username=validated_data['username'],
  #     first_name=validated_data['first_name'],
  #     last_name=validated_data['last_name'],
  #     email=validated_data['email'],
  #   )


  #   user.set_password(validated_data['password'])
  #   user.save()
  #   profile = Profile.objects.create(
  #     user=user,
  #     bio='bio',
  #     image='not_set'
  #   )
  #   profile.save()

  #   return user
