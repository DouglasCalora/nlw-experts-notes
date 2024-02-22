import { NoteDialog } from '@components/note-dialog'
import { BaseCard } from '@components/base-card'

import type { NoteContentProps, NoteFooterProps, NoteCardProps } from './note-card.types'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

function ContentDialog (props: NoteContentProps) {
  return (
    <p className="text-slate-400 left-6">
      {props.note.content}
    </p>
  )
}

function FooterDialog (props: NoteFooterProps) {
  return (
    <button className="bg-slate-800 outline-none py-4 text-sm font-medium group" onClick={() => props.onNoteDeleted(props.note.id)}>
      Deseja <span className="text-red-400 group-hover:underline">apagar esta nota</span>?
    </button>
  )
}

export function NoteCard (props: NoteCardProps) {
  const [isOpened, setIsOpened] = useState(false)

  const title = formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })

  function toggleDialog () {
    setIsOpened(!isOpened)
  }

  return (
    <>
      <BaseCard
        content={props.note.content}
        title={title}
        useNew={false}
        onClick={toggleDialog}
      />

      <NoteDialog
        title={title}
        open={isOpened}
        onClose={toggleDialog}
        contentNode={<ContentDialog {...props} />}
        footerNode={<FooterDialog {...props} />}
      />
    </>
  )
}
