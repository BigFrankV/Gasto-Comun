from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import (
    LoginView,
    CustomTokenObtainPairView,
    UsuarioViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView

# ✅ Configuración del router para ViewSets
router = DefaultRouter()
router.register('usuarios', UsuarioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # ✅ Endpoints de autenticación
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # ✅ Incluir rutas del router
    path('api/', include(router.urls)),
]
