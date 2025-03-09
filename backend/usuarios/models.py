from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)  # ✅ Asegurar que cada usuario tenga un email único
    username = None  # ❌ Eliminamos el campo username
    
    # Nuevos campos requeridos
    contact = models.CharField(max_length=100)  # ✅ Campo para información de contacto
    ROLES = (
        ('admin', 'Administrador'),
        ('usuario', 'Usuario Normal')
    )
    rol = models.CharField(  # ✅ Campo para control de roles
        max_length=20, 
        choices=ROLES,
        default='usuario'
    )

    # Definir email como el campo principal de autenticación
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['contact', 'rol']  # ✅ Campos obligatorios al crear usuario

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

    def __str__(self):
        return self.email  # ✅ Representación en string del usuario

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
