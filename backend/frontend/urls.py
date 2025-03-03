from django.urls import path
from .views import index

urlpatterns = [
    path("", index),  # Cuando alguien visite "/", se cargará React
]
