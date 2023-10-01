import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoModule } from './curso/curso.module';
import { AlumnoModule } from './alumno/alumno.module';
import { MateriaModule } from './materia-curso/materia-curso.module';
import { AlumnoCursoModule } from './alumno-curso/alumno-curso.module';
import { MateriaCursoModule } from './materia/materia.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotasExamenesModule } from './notas_examenes/notas_examenes.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { DataCargaModule } from './data-carga/data-carga.module';
import { ImagenesModule } from './imagenes/imagenes.module';
import { AvisosModule } from './avisos/aviso.module';
import { AlumnoAvisoModule } from './alumno-aviso/alumno-aviso.module';


@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "escuela",
    entities: [
      "dist/**/**.entity{.ts,.js}", "node_modules/@nestjs/jwt"
    ],
    synchronize: true
  }),

    CursoModule,
    AlumnoModule,
    MateriaModule,
    AlumnoCursoModule,
    UsuarioModule,
    MateriaCursoModule,
    AsistenciaModule,
    NotasExamenesModule,
    ProfesorModule,
    DataCargaModule,
    ImagenesModule,
    AvisosModule,
    AlumnoAvisoModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
