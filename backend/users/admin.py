from django.contrib import admin
from .models import AppUser, Watchlist

# Register your models here.
admin.site.register(AppUser)
admin.site.register(Watchlist)