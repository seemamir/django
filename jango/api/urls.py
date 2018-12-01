from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from .views import PostViewSet, PostReactionViewSet, SavedPostViewSet, Login, Signup, RequestPasswordResetToken, ResetPassword, UserViewSet, CommentViewSet, ProfileViewSet
from django.conf.urls import url
 
router = routers.DefaultRouter()
router.register(r'post', PostViewSet)
router.register(r'post-reaction', PostReactionViewSet)
router.register(r'saved-post', SavedPostViewSet)
router.register(r'user', UserViewSet)
router.register(r'comment', CommentViewSet)
router.register(r'user-profile', ProfileViewSet)

urlpatterns = [
  url(r'', include(router.urls)),
  path('signup',Signup),
  path('resetPassword',ResetPassword),
  path('requestPasswordResetToken',RequestPasswordResetToken),
]
