import { NoteDialog } from '@components/note-dialog'
import { NoteCardProps, CardTriggerProps, ContentProps, FooterProps } from './note-card.types'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

function TriggerCard (props: CardTriggerProps) {
  return (
    <button
      className="rounded-md text-left flex outline-none bg-slate-800 p-5 text-sm relative hover:ring-2 hover:ring-slate-700 focus-visible:ring-2 focus-visible:ring-lime-400"
      onClick={props.onClick}
    >
      <div className="space-y-3">
        <span className="text-slate-300 font-medium leading-5">
        {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className="text-slate-400 left-6">
          {props.note.content}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  )
}

function ContentCard (props: ContentProps) {
  return (
    <p className="text-slate-400 left-6">
      {props.note.content}
    </p>
  )
}

function FooterCard (props: FooterProps) {
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

  const triggerProps = {
    ...props,
    onClick: toggleDialog
  }

  return (
    <>
      <TriggerCard {...triggerProps} />

      <NoteDialog
        title={title}
        open={isOpened}
        onClose={toggleDialog}
        contentNode={<ContentCard {...props} />}
        footerNode={<FooterCard {...props} />}
      />
    </>
  )
}
