import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { User as UserEntity } from 'src/auth/entity/user.entitiy';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @User() user: UserEntity,
  ) {
    return this.notesService.createNote(createNoteDto, user.email);
  }

  @Get()
  async getNotes(@User() user: UserEntity) {
    return this.notesService.getNotes(user.email);
  }
}
