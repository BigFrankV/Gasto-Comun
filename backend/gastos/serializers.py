from rest_framework import serializers
from .models import GastoComun
from usuarios.models import Usuario

class GastoComunSerializer(serializers.ModelSerializer):
    tipo_usuario = serializers.SerializerMethodField()
    
    class Meta:
        model = GastoComun
        fields = '__all__'
    
    def get_tipo_usuario(self, obj):
        return obj.residente.tipo_usuario if obj.residente else None

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'tipo_usuario']
