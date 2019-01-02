from .models import Post,PostReaction,SavedPost, Comment, Profile, ForgetPassword, CommentReply, CommentVote, ReplyVote
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

class CommentVoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = CommentVote
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
  # post = PostSerializer(read_only=False)
  
  class Meta:
    model = SavedPost
    fields = "__all__"

class CommentReplySerializer(serializers.ModelSerializer):
  # user = UserSerializer(many=False, read_only=False)
  class Meta:
    model = CommentReply
    fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
  # user = UserSerializer(many=False, read_only=False)
  class Meta:
    model = Comment
    fields = "__all__"

class ReplyVoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = ReplyVote
    fields = "__all__"