import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entity/note.entity';

@Injectable()
export class NotesService {
  notes: Note[] = [];

  createNote(createNoteDto: CreateNoteDto, userEmail: string) {
    const note: Note = {
      title: createNoteDto.title,
      content: createNoteDto.content,
      createdBy: userEmail,
    };
    this.notes.push(note);
    return note;
  }

  getNotes(userEmail: string) {
    return this.notes.filter((note) => note.createdBy === userEmail);
  }
}
