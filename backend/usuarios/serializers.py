# usuarios/serializers.py
from rest_framework import serializers
from .models import Usuario  # Asegúrate de importar tu modelo correctamente

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'tipo_usuario', 'is_superuser']  # Asegúrate de incluir los campos necesarios
