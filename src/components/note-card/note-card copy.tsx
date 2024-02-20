import { NoteCardProps } from './note-card.types'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function NoteCard (props: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex outline-none bg-slate-800 p-5 text-sm relative hover:ring-2 hover:ring-slate-700 focus-visible:ring-2 focus-visible:ring-lime-400">
          <div className="space-y-3">
            <span className="text-slate-300 font-medium leading-5">
            {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
            </span>

            <p className="text-slate-400 left-6">
              {props.note.content}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 h-[60vh] rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="p-1.5 absolute bg-slate-800 right-0 group">
            <X className=" text-slate-500 size-5 group-hover:text-slate-100" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-slate-300 font-medium leading-5">
              {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
            </span>

            <p className="text-slate-400 left-6">
              {props.note.content}
            </p>
          </div>

          <button className="bg-slate-800 outline-none py-4 text-sm font-medium group" onClick={() => props.onNoteDeleted(props.note.id)}>
            Deseja <span className="text-red-400 group-hover:underline">apagar esta nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
