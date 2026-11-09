from rest_framework import serializers
from . import models


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        fields = ['id', 'username', 'password', 'email', 'nombres', 'apellidos', 'dni', 'rol', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return models.Usuario.objects.create_user(**validated_data)

class ComunidadSerializer(serializers.ModelSerializer):
    establecimiento_nombre = serializers.CharField(source='establecimiento.nombre', read_only=True)

    class Meta:
        model = models.Comunidad
        fields = '__all__'

class NinoSerializer(serializers.ModelSerializer):
    comunidad_nombre = serializers.CharField(source='comunidad.nombre', read_only=True)
    establecimiento_nombre = serializers.CharField(source='establecimiento.nombre', read_only=True)
    edad_meses = serializers.IntegerField(source='calcular_edad_meses', read_only=True)

    class Meta:
        model = models.Nino
        fields = '__all__'

class IngredienteSerializer(serializers.ModelSerializer):
    tiene_hierro = serializers.BooleanField(read_only=True)

    class Meta:
        model = models.Ingrediente
        fields = '__all__'
class EstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Establecimiento
        fields = '__all__'

class ApoderadoSerializer(serializers.ModelSerializer):
    nombres = serializers.CharField(source='usuario.nombres', read_only=True)
    apellidos = serializers.CharField(source='usuario.apellidos', read_only=True)
    class Meta:
        model = models.Apoderado
        fields = '__all__'

class PersonalSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PersonalSalud
        fields = '__all__'

class InsigniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Insignia
        fields = '__all__'

class InsigniaObtenidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InsigniaObtenida
        fields = '__all__'

class PremioFisicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PremioFisico
        fields = '__all__'

class PremioEntregadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PremioEntregado
        fields = '__all__'

class PlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Plato
        fields = '__all__'

class RegistroAlimentacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegistroAlimentacion
        fields = '__all__'

class DetalleAlimentacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DetalleAlimentacion
        fields = '__all__'

class RegistroSuplementoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegistroSuplemento
        fields = '__all__'

class ControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Control
        fields = '__all__'

class RecordatorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recordatorio
        fields = '__all__'

class EvaluacionSemanalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EvaluacionSemanal
        fields = '__all__'

class AlertaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Alerta
        fields = '__all__'



