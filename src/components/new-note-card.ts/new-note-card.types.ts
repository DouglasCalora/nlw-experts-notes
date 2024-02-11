import { ChangeEvent } from 'react'

export interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export interface NewNoteCardContentProps {
  handleStartRecording: () => void
  handleStartEditor: () => void
}

export interface NewNoteCardTextareaProps {
  handleContentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  content: string
}

export interface NewNoteCardRecordingButtonProps {
  stopRecording: () => void
}

export interface NewNoteCardDefaultButtonProps {
  saveNote: () => void
}
