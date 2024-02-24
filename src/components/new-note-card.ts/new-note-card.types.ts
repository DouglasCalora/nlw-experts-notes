import type { ChangeEvent } from 'react'

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
  content: string
  isRecording: boolean
  saveNote: () => void
  stopRecording: () => void
}

export type NewNoteFooterDialogRecordingProps = Pick<NewNoteFooterDialogProps, 'stopRecording'>
export type NewNoteFooterDialogSaveProps = Pick<NewNoteFooterDialogProps, 'content' | 'saveNote'>
