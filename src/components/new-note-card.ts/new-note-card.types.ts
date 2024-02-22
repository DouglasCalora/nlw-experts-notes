import { ChangeEvent } from 'react'

export interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export interface NewNoteContentDialogProps {
  content: string
  shouldShowOnboarding: boolean
  handleContentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  handleStartEditor: () => void
  handleStartRecording: () => void
}

export interface NewNoteFooterDialogProps {
  isRecording: boolean
  saveNote: () => void
  stopRecording: () => void
}
