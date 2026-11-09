from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from . import serializers, models
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = models.Usuario.objects.all()
    serializer_class = serializers.UsuarioSerializer

class EstablecimientoViewSet(viewsets.ModelViewSet):
    queryset = models.Establecimiento.objects.all()
    serializer_class = serializers.EstablecimientoSerializer

class ComunidadViewSet(viewsets.ModelViewSet):
    queryset = models.Comunidad.objects.all()
    serializer_class = serializers.ComunidadSerializer

class ApoderadoViewSet(viewsets.ModelViewSet):
    queryset = models.Apoderado.objects.all()
    serializer_class = serializers.ApoderadoSerializer

class PersonalSaludViewSet(viewsets.ModelViewSet):
    queryset = models.PersonalSalud.objects.all()
    serializer_class = serializers.PersonalSaludSerializer

class NinoViewSet(viewsets.ModelViewSet):
    queryset = models.Nino.objects.all()
    serializer_class = serializers.NinoSerializer

class InsigniaViewSet(viewsets.ModelViewSet):
    queryset = models.Insignia.objects.all()
    serializer_class = serializers.InsigniaSerializer

class InsigniaObtenidaViewSet(viewsets.ModelViewSet):
    queryset = models.InsigniaObtenida.objects.all()
    serializer_class = serializers.InsigniaObtenidaSerializer

class PremioFisicoViewSet(viewsets.ModelViewSet):
    queryset = models.PremioFisico.objects.all()
    serializer_class = serializers.PremioFisicoSerializer

class PremioEntregadoViewSet(viewsets.ModelViewSet):
    queryset = models.PremioEntregado.objects.all()
    serializer_class = serializers.PremioEntregadoSerializer

class IngredienteViewSet(viewsets.ModelViewSet):
    queryset = models.Ingrediente.objects.all()
    serializer_class = serializers.IngredienteSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

class PlatoViewSet(viewsets.ModelViewSet):
    queryset = models.Plato.objects.all()
    serializer_class = serializers.PlatoSerializer

class RegistroAlimentacionViewSet(viewsets.ModelViewSet):
    queryset = models.RegistroAlimentacion.objects.all()
    serializer_class = serializers.RegistroAlimentacionSerializer

class DetalleAlimentacionViewSet(viewsets.ModelViewSet):
    queryset = models.DetalleAlimentacion.objects.all()
    serializer_class = serializers.DetalleAlimentacionSerializer

class RegistroSuplementoViewSet(viewsets.ModelViewSet):
    queryset = models.RegistroSuplemento.objects.all()
    serializer_class = serializers.RegistroSuplementoSerializer

class ControlViewSet(viewsets.ModelViewSet):
    queryset = models.Control.objects.all()
    serializer_class = serializers.ControlSerializer

class RecordatorioViewSet(viewsets.ModelViewSet):
    queryset = models.Recordatorio.objects.all()
    serializer_class = serializers.RecordatorioSerializer

class EvaluacionSemanalViewSet(viewsets.ModelViewSet):
    queryset = models.EvaluacionSemanal.objects.all()
    serializer_class = serializers.EvaluacionSemanalSerializer

class AlertaViewSet(viewsets.ModelViewSet):
    queryset = models.Alerta.objects.all()
    serializer_class = serializers.AlertaSerializer

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'usuario': {
                'id': user.id, 'username': user.username,
                'nombres': user.nombres, 'apellidos': user.apellidos, 'rol': user.rol,
            },
        })

class LogoutViews(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({
            "mensaje": "Sesión cerrada correctamente"
        }, status=status.HTTP_200_OK)
