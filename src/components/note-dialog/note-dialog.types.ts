import { ReactNode } from 'react'
import { DialogProps } from '@radix-ui/react-dialog'

export interface NoteDialogProps {
  children?: ReactNode
  contentNode: ReactNode
  triggerNode?: ReactNode
  dialogProps?: DialogProps
  footerNode: ReactNode
  title: string
}
