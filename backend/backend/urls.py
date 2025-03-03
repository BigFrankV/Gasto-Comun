from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import UsuarioViewSet
from gastos.views import GastoComunViewSet
from multas.views import MultaViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from usuarios.views import CustomTokenObtainPairView


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'gastos', GastoComunViewSet)
router.register(r'multas', MultaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('usuarios.urls')),  # Incluir las rutas del login
    path('api/token/', CustomTokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path("", include("frontend.urls")),  # React en la raíz

]
