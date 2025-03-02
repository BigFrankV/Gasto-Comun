from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import UsuarioViewSet
from gastos.views import GastoComunViewSet
from multas.views import MultaViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'gastos', GastoComunViewSet)
router.register(r'multas', MultaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('usuarios.urls')),  # Incluir las rutas del login

]
