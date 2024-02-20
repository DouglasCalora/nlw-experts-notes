import { NoteDialog } from '@components/note-dialog'
import { NoteCardProps, CardTriggerProps, ContentProps, FooterProps } from './note-card.types'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function TriggerCard (props: CardTriggerProps) {
  return (
    <>
      <div className="space-y-3">
        <span className="text-slate-300 font-medium leading-5">
        {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className="text-slate-400 left-6">
          {props.note.content}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </>
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
  const title = formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })

  return (
    <NoteDialog
      title={title}
      contentNode={<ContentCard {...props} />}
      footerNode={<FooterCard {...props} />}
      triggerNode={<TriggerCard {...props} />}
    />
  )
}
