export interface Note {
  content: string
  date: Date
  id: string
}

export interface AppNoteCardProps {
  note: Note,

  onNoteDeleted: (id: string) => void
}
