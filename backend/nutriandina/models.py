from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    ROL_CHOICES = [
        ('ADMIN', 'Administrador'),
        ('APODERADO', 'Apoderado'),
        ('PERSONAL', 'Personal de salud'),
    ]
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    dni = models.CharField(max_length=8, unique=True, null=True, blank=True)
    rol = models.CharField(max_length=15, choices=ROL_CHOICES, default='APODERADO')

    def __str__(self):
        return self.nombres + "-" + self.apellidos


class Establecimiento(models.Model):
    codigo_renipress = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nombre


class Comunidad(models.Model):
    nombre = models.CharField(max_length=100)
    establecimiento = models.ForeignKey(Establecimiento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Apoderado(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=9, blank=True)
    consentimiento = models.BooleanField(default=False)
    fecha_consentimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.usuario)


class PersonalSalud(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    cargo = models.CharField(max_length=100)
    establecimiento = models.ForeignKey(Establecimiento, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.usuario) + "-" + self.cargo


class Nino(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    ]
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    dni = models.CharField(max_length=8, unique=True)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    apoderado = models.ForeignKey(Apoderado, on_delete=models.PROTECT)
    comunidad = models.ForeignKey(Comunidad, on_delete=models.PROTECT)
    establecimiento = models.ForeignKey(Establecimiento, on_delete=models.PROTECT)

    def calcular_edad_meses(self):
        from datetime import date
        hoy = date.today()
        return (hoy.year - self.fecha_nacimiento.year) * 12 + (hoy.month - self.fecha_nacimiento.month)

    def __str__(self):
        return self.nombres + "-" + self.apellidos


class Insignia(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    semanas_racha = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre


class InsigniaObtenida(models.Model):
    apoderado = models.ForeignKey(Apoderado, on_delete=models.CASCADE)
    insignia = models.ForeignKey(Insignia, on_delete=models.PROTECT)
    fecha_obtenida = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.apoderado) + "-" + str(self.insignia)


class PremioFisico(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    semanas_requeridas = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre


class PremioEntregado(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('ENTREGADO', 'Entregado'),
    ]
    apoderado = models.ForeignKey(Apoderado, on_delete=models.CASCADE)
    personal = models.ForeignKey(PersonalSalud, on_delete=models.SET_NULL, null=True, blank=True)
    premio = models.ForeignKey(PremioFisico, on_delete=models.PROTECT)
    fecha_otorgado = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='PENDIENTE')
    fecha_entrega = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.premio) + "-" + self.estado


class Ingrediente(models.Model):
    HIERRO_CHOICES = [
        ('HEMINICO', 'Hemínico'),
        ('NO_HEMINICO', 'No hemínico'),
        ('SIN_HIERRO', 'Sin hierro'),
    ]
    nombre = models.CharField(max_length=100)
    tipo_hierro = models.CharField(max_length=12, choices=HIERRO_CHOICES, default='SIN_HIERRO')
    no_combinar_con = models.ManyToManyField('self', blank=True)
    foto = models.ImageField(upload_to='ingredientes', null=True, blank=True) #IMAGEN ingredientes

    def tiene_hierro(self):
        return self.tipo_hierro != 'SIN_HIERRO'

    def __str__(self):
        return self.nombre


class Plato(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    ingredientes = models.ManyToManyField(Ingrediente, blank=True)

    def __str__(self):
        return self.nombre


class RegistroAlimentacion(models.Model):
    nino = models.ForeignKey(Nino, on_delete=models.CASCADE)
    fecha = models.DateField()
    foto_url = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return str(self.nino) + "-" + str(self.fecha)


class DetalleAlimentacion(models.Model):
    MOMENTO_CHOICES = [
        ('DESAYUNO', 'Desayuno'),
        ('MEDIA_MANANA', 'Media mañana'),
        ('ALMUERZO', 'Almuerzo'),
        ('MEDIA_TARDE', 'Media tarde'),
        ('CENA', 'Cena'),
    ]
    registro = models.ForeignKey(RegistroAlimentacion, on_delete=models.CASCADE)
    momento = models.CharField(max_length=15, choices=MOMENTO_CHOICES)
    plato = models.ForeignKey(Plato, on_delete=models.PROTECT)
    ingredientes = models.ManyToManyField(Ingrediente, blank=True)

    def __str__(self):
        return self.momento + "-" + str(self.plato)


class RegistroSuplemento(models.Model):
    nino = models.ForeignKey(Nino, on_delete=models.CASCADE)
    fecha = models.DateField()
    administrado = models.BooleanField(default=True)

    def __str__(self):
        return str(self.nino) + "-" + str(self.fecha)


class Control(models.Model):
    nino = models.ForeignKey(Nino, on_delete=models.CASCADE)
    personal = models.ForeignKey(PersonalSalud, on_delete=models.PROTECT)
    fecha_programada = models.DateField()
    fecha_realizada = models.DateField(null=True, blank=True)
    asistio = models.BooleanField(default=False)
    hemoglobina = models.FloatField(null=True, blank=True)
    observaciones = models.TextField(blank=True)

    def __str__(self):
        return str(self.nino) + "-" + str(self.fecha_programada)


class Recordatorio(models.Model):
    CANAL_CHOICES = [
        ('SMS', 'SMS'),
        ('WHATSAPP', 'WhatsApp'),
        ('WEB', 'Web'),
    ]
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('ENVIADO', 'Enviado'),
        ('FALLIDO', 'Fallido'),
    ]
    control = models.ForeignKey(Control, on_delete=models.CASCADE)
    canal = models.CharField(max_length=10, choices=CANAL_CHOICES, default='SMS')
    fecha_envio = models.DateTimeField(null=True, blank=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='PENDIENTE')

    def __str__(self):
        return str(self.control) + "-" + self.canal


class EvaluacionSemanal(models.Model):
    NIVEL_CHOICES = [
        ('VERDE', 'Verde'),
        ('AMARILLO', 'Amarillo'),
        ('ROJO', 'Rojo'),
    ]
    nino = models.ForeignKey(Nino, on_delete=models.CASCADE)
    fecha_inicio_semana = models.DateField()
    dias_suplemento = models.PositiveIntegerField(default=0)
    dias_alimentacion = models.PositiveIntegerField(default=0)
    promedio_redondeado = models.PositiveIntegerField(default=0)
    nivel = models.CharField(max_length=10, choices=NIVEL_CHOICES, default='ROJO')

    def calcular_nivel(self):
        # Regla simple: promedio de dias cumplidos (de 7) -> 6 o mas VERDE, 4 o mas AMARILLO, si no ROJO
        self.promedio_redondeado = round((self.dias_suplemento + self.dias_alimentacion) / 2)
        if self.promedio_redondeado >= 6:
            self.nivel = 'VERDE'
        elif self.promedio_redondeado >= 4:
            self.nivel = 'AMARILLO'
        else:
            self.nivel = 'ROJO'
        return self.nivel

    def save(self, *args, **kwargs):
        self.calcular_nivel()
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.nino) + "-" + self.nivel


class Alerta(models.Model):
    TIPO_CHOICES = [
        ('INASISTENCIA', 'Inasistencia'),
        ('SUPLEMENTO_INCUMPLIDO', 'Suplemento incumplido'),
        ('MALA_ALIMENTACION', 'Mala alimentación'),
    ]
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('ATENDIDA', 'Atendida'),
    ]
    nino = models.ForeignKey(Nino, on_delete=models.CASCADE)
    personal = models.ForeignKey(PersonalSalud, on_delete=models.SET_NULL, null=True, blank=True)
    tipo = models.CharField(max_length=25, choices=TIPO_CHOICES)
    fecha_generada = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='PENDIENTE')
    fecha_atencion = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.nino) + "-" + self.tipo
