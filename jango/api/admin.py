from django.contrib import admin
from .models import Post,PostReaction,SavedPost,Profile,Comment,ForgetPassword,CommentReply, CommentVote, ReplyVote
# Register your models here.
admin.site.register(Post)
admin.site.register(PostReaction)
admin.site.register(SavedPost)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(CommentVote)
admin.site.register(CommentReply)
admin.site.register(ReplyVote)
admin.site.register(ForgetPassword)