from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import viewsets
from .models import Usuario  # Asegúrate de que el modelo está bien definido
from .serializers import UsuarioSerializer  # Confirma que el archivo `serializers.py` existe
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")  # Django espera "username"
        password = attrs.get("password")

        # Buscar usuario por email
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            attrs["username"] = user.username  # ✅ Pasamos el username real al proceso de login
            return super().validate(attrs)

        raise serializers.ValidationError("Credenciales incorrectas")

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({'detail': 'Credenciales incorrectas'}, status=400)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'groups': [group.name for group in user.groups.all()],
        })


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            attrs["username"] = user.username
            # Obtener el token validado
            validated_data = super().validate(attrs)
            
            # Agregar datos adicionales al token
            token = self.get_token(user)
            token['email'] = user.email
            token['username'] = user.username
            token['is_superuser'] = user.is_superuser
            token['tipo_usuario'] = user.tipo_usuario
            
            # Actualizar el token en la respuesta
            validated_data['token'] = str(token)
            return validated_data

        raise serializers.ValidationError("Credenciales incorrectas")
