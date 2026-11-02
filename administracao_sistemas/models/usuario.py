from django.db import models
from .perfil import Perfil
from core.choices import ROLE_SEXO,ROLE_PASSWORD_STATUS,ROLE_STATUS

class Usuario(models.Model):    

    id_usuario = models.AutoField(
        primary_key=True,        
    )
    nome_usuario = models.CharField(
        max_length=100,
    )
    sexo = models.IntegerField(
        choices=ROLE_SEXO,
        null=True,
        blank=True,
    )

    cpf = models.CharField(
        max_length=14,
    )
    user_name = models.CharField(
        max_length=100,
    )
    password = models.CharField(
        max_length=255,
    )
    password_status = models.IntegerField(
        choices= ROLE_PASSWORD_STATUS,
        null=True,
        blank=True,        
    )

    id_perfil = models.ForeignKey(
        Perfil,
        on_delete = models.RESTRICT,
        db_column = 'fk_id_perfil',
    )

    def __str__(self):
        return self.nome_usuario
    
    class Meta :
        db_table = 'usuario'


