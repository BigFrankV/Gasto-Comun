from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)  # ✅ Asegurar que cada usuario tenga un email único
    username = None  # ❌ Eliminamos el campo username

    # Definir email como el campo principal de autenticación
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # No pedimos username ni otros campos obligatorios

    # Evitar conflictos con permisos y grupos de Django
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_set',
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_permissions',
        blank=True,
    )
