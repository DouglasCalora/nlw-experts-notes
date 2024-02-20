import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { NoteDialogProps } from './note-dialog.types'

export function NoteDialog (props: NoteDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex bg-slate-700 p-5 outline-none text-sm space-y-3 hover:ring-2 hover:ring-slate-700 focus-visible:ring-2 focus-visible:ring-lime-400">
        {props.triggerNode}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 h-[60vh] rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="p-1.5 absolute bg-slate-800 right-0 group">
            <X className=" text-slate-500 size-5 group-hover:text-slate-100" />
          </Dialog.Close>

          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-slate-300 font-medium leading-5">
                {props.title}
              </span>

              {props.contentNode}
            </div>

            {props.footerNode}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
  </Dialog.Root>
  )
}
