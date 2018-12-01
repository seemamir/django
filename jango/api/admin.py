from django.contrib import admin
from .models import Post,PostReaction,SavedPost,Profile,Comment,ForgetPassword
# Register your models here.
admin.site.register(Post)
admin.site.register(PostReaction)
admin.site.register(SavedPost)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(ForgetPassword)