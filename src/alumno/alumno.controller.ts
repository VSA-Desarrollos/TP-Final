import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('alumno')
@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Get('por-anio/:anio')
  async getAlumnosPorAnio(@Param('anio') anio: string) {

    return this.alumnoService.getAlumnosPorAnio(anio);
  }



  @Get()
  async getAllAlumnos() {
    const alumnos = await this.alumnoService.getAllAlumnos();
    return alumnos;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoService.findOne(+id);
  }

  @Get('usuario/:id')
  findAlumnoByUsuario(@Param('id',ParseIntPipe) id: number) {

    return this.alumnoService.findAlumnoByUsuario(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.update(+id, updateAlumnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoService.remove(+id);
  }
} 
 