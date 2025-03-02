from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    # Otros campos personalizados de Usuario

    # Aquí agregamos los related_name para evitar el conflicto con el modelo User de Django.
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_set',  # Cambiamos el related_name para evitar el conflicto
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_permissions',  # Cambiamos el related_name para evitar el conflicto
        blank=True,
    )
