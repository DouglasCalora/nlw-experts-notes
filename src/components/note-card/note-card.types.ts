export interface Note {
  content: string
  date: Date
  id: string
}

export interface NoteCardProps {
  note: Note,
  onNoteDeleted: (id: string) => void
}

export interface NoteCardTriggerProps {
  onClick: () => void
  note: Pick<Note, 'content' | 'date'>
}

export interface NoteContentProps {
  note: Pick<Note, 'content'>
}

export interface NoteFooterProps extends Pick<NoteCardProps, 'onNoteDeleted'> {
  note: Pick<Note, 'id'>
}
