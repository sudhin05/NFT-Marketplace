from django.contrib import admin
from django.urls import path
from main import views

urlpatterns = [
    path('', views.index, name='home'),
    # path('/trends', views.trends, name='trends'),
    path('/about', views.about, name='about'),
    path('moralis_auth', views.moralis_auth, name='moralis_auth'),
    path('request_message', views.request_message, name='request_message'),
    path('my_profile', views.my_profile, name='my_profile'),
    path('verify_message', views.verify_message, name='verify_message')
]
