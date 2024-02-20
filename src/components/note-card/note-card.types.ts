export interface Note {
  content: string
  date: Date
  id: string
}

export interface NoteCardProps {
  note: Note,
  onNoteDeleted: (id: string) => void
}

export interface CardTriggerProps {
  note: Pick<Note, 'content' | 'date'>
}

export interface ContentProps {
  note: Pick<Note, 'content'>
}

export interface FooterProps extends Pick<NoteCardProps, 'onNoteDeleted'> {
  note: Pick<Note, 'id'>
}
