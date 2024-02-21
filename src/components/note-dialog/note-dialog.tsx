import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { NoteDialogProps } from './note-dialog.types'

export function NoteDialog (props: NoteDialogProps) {
  return (
    <Dialog.Root
      {...props.dialogProps}
      open={props.open}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 h-[60vh] rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close
            className="p-1.5 absolute bg-slate-800 right-0 group"
            onClick={props.onClose}
          >
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
