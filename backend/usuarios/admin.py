from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

class CustomUserAdmin(UserAdmin):
    ordering = ['email']  # ✅ Usar email en lugar de username
    list_display = ['email', 'is_staff', 'is_active']  # ✅ Mostrar email en la lista de usuarios
    search_fields = ['email']  # ✅ Buscar usuarios por email en el panel de admin
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    filter_horizontal = ('groups', 'user_permissions')

# Registrar el modelo de usuario con la configuración personalizada
admin.site.register(Usuario, CustomUserAdmin)
