from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'usuario', views.UsuarioViewSet)
router.register(r'establecimiento', views.EstablecimientoViewSet)
router.register(r'comunidad', views.ComunidadViewSet)
router.register(r'apoderado', views.ApoderadoViewSet)
router.register(r'personal_salud', views.PersonalSaludViewSet)
router.register(r'nino', views.NinoViewSet)
router.register(r'insignia', views.InsigniaViewSet)
router.register(r'insignia_obtenida', views.InsigniaObtenidaViewSet)
router.register(r'premio_fisico', views.PremioFisicoViewSet)
router.register(r'premio_entregado', views.PremioEntregadoViewSet)
router.register(r'ingrediente', views.IngredienteViewSet)
router.register(r'plato', views.PlatoViewSet)
router.register(r'registro_alimentacion', views.RegistroAlimentacionViewSet)
router.register(r'detalle_alimentacion', views.DetalleAlimentacionViewSet)
router.register(r'registro_suplemento', views.RegistroSuplementoViewSet)
router.register(r'control', views.ControlViewSet)
router.register(r'recordatorio', views.RecordatorioViewSet)
router.register(r'evaluacion_semanal', views.EvaluacionSemanalViewSet)
router.register(r'alerta', views.AlertaViewSet)

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    path('logout/', views.LogoutViews.as_view()),
]

