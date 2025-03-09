from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'contact', 'rol', 'is_superuser']  # ✅ Campos actualizados según el modelo
        read_only_fields = ['id', 'is_superuser']  # ✅ Campos que no se deben modificar

class LoginSerializer(serializers.Serializer):  # ✅ Nuevo serializer para login
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UsuarioCreateSerializer(serializers.ModelSerializer):  # ✅ Serializer para crear usuarios
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'password', 'contact', 'rol']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user
