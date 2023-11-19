from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin

# Create your models here.
# Schema users
# Schema watchlist

class UserManager(BaseUserManager):
    def create_user(self, email, password = None):
        if not email:
            raise ValueError('An email is required!!')
        if not password:
            raise ValueError('Password is required!!')
        
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email,password = None):
        if not email:
            raise ValueError('An email is required!!')
        if not password:
            raise ValueError('Password is required!!')
        
        user = self.create_user(email,password)
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50,unique=True)
    username = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'                                    # Email is required to login
    REQUIRED_FIELDS = []
    objects = UserManager()
    def __str__(self):
        return self.username
    

class Watchlist(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=25)
    
    def __str__(self):
        return self.user.username