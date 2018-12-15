from django.db import models
from django.contrib.auth.models import User


VOTE_TYPE_CHOICES = (
  ('DOWN_VOTE', 'Down vote'),
  ('UP_VOTE', 'Up vote'),
)

# Create your models here.
class Post(models.Model):
  title = models.CharField(max_length=250)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  author = models.CharField(max_length=250)
  category = models.CharField(max_length=250)
  source = models.CharField(max_length=250)
  author_description = models.TextField(blank=True)
  main_sentence = models.TextField(blank=True)
  sentence2 = models.TextField(blank=True)
  sentence3 = models.TextField(blank=True)
  sentence4 = models.TextField(blank=True)
  sentence5 = models.TextField(blank=True)
  people1 = models.TextField(blank=True)
  people2 = models.TextField(blank=True)
  people3 = models.TextField(blank=True)
  people4 = models.TextField(blank=True)
  
  embedded_image = models.TextField(blank=True)
  thumbnail_image = models.TextField(blank=True)

  def __str__(self):
    return self.title

  
class Profile(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE,unique=True)
  bio = models.TextField(blank=True)
  image = models.TextField(blank=True)
  name = models.CharField(blank=True,max_length=150)
  
  def __str__(self):
    return "Profile for {name}".format(name=self.name)

class PostReaction(models.Model):
  post = models.ForeignKey('api.Post',on_delete=models.CASCADE)
  reaction_type = models.CharField(max_length=20)
  user = models.ForeignKey(User,on_delete=models.CASCADE)

  def __str__(self):
    return "Post reaction"
  class Meta:
    unique_together = ('post','user')

class SavedPost(models.Model):
  post = models.ForeignKey('api.Post',on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return "Saved post"

class Comment(models.Model):
  post = models.ForeignKey('api.Post',on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  comment = models.TextField()

  def __str__(self):
    return "Comment: {comment}".format(comment=self.comment)

class CommentReply(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
  reply = models.TextField()

  def __str__(self):
    return "Comment reply: {reply}".format(reply=self.reply)

class ForgetPassword(models.Model):
  email = models.CharField(max_length=150)
  token = models.CharField(max_length=150)
  def __str__(self):
    return self.email;




class ReplyVote(models.Model):
  reply = models.ForeignKey(CommentReply,on_delete=models.CASCADE)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  vote_type = models.CharField(max_length=100, choices=VOTE_TYPE_CHOICES)
  def __str__(self):
    return "A vote by {user} on reply {reply} type {type}".format(user=self.user,reply=self.reply,type=self.vote_type)
    
  class Meta:
    unique_together = ('reply','user')


class CommentVote(models.Model):
  comment = models.ForeignKey(Comment,on_delete=models.CASCADE)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  vote_type = models.CharField(max_length=100, choices=VOTE_TYPE_CHOICES)
  
  class Meta:
    unique_together = ('comment','user')

  def __str__(self):
    return "Comment {comment} {vote_type}vote ".format(vote_type=self.vote_type,comment=self.comment)