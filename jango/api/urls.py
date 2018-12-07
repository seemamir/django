from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from .views import PostViewSet, PostReactionViewSet, SavedPostViewSet, Login, Signup, ForgetPassword, UserViewSet, CommentViewSet, ProfileViewSet, ResetPassword, CommentReplyViewSet, CommentVoteViewSet, ReplyVoteViewSet

from django.conf.urls import url
 
router = routers.DefaultRouter()
router.register(r'post', PostViewSet)
router.register(r'post-reaction', PostReactionViewSet)
router.register(r'saved-post', SavedPostViewSet)
router.register(r'user', UserViewSet)
router.register(r'comment', CommentViewSet)
router.register(r'user-profile', ProfileViewSet)
router.register(r'comment-vote', CommentVoteViewSet)
router.register(r'comment-reply', CommentReplyViewSet)
router.register(r'reply-vote', ReplyVoteViewSet)

urlpatterns = [
  url(r'', include(router.urls)),
  url('forget-password/',ForgetPassword),
  url('reset-password/',ResetPassword)
]
