import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GroupsService } from './groups.service';
import { GenerateGroupsDto } from './dto/generate-groups.dto';
import { MoveStudentDto } from './dto/move-student.dto';

@Controller('api/v1')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Post('courses/:id/groups/generate')
  generate(@Param('id') id: string, @Body() dto: GenerateGroupsDto) {
    return this.groupsService.generate(+id, dto);
  }
  @Get('courses/:id/groups')
  findAll(@Param('id') id: string) {
    return this.groupsService.findAllForCourse(+id);
  }
  @Post('courses/:id/groups/publish')
  publish(@Param('id') id: string) {
    return this.groupsService.publish(+id);
  }
  @Get('groups/:id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }
  @Patch('groups/:id/move-student')
  moveStudent(@Param('id') id: string, @Body() dto: MoveStudentDto) {
    return this.groupsService.moveStudent(+id, dto);
  }
}