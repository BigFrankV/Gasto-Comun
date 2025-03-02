from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

# Registrar el modelo de usuario personalizado
admin.site.register(Usuario, UserAdmin)
