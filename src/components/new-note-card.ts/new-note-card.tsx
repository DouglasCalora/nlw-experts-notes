import { BaseCard } from '@components/base-card'
import { NoteDialog } from '@components/note-dialog'

import type {
  NewNoteCardProps,
  NewNoteContentDialogProps,
  NewNoteFooterDialogProps
} from './new-note-card.types'

import { useState, ChangeEvent } from 'react'

import { toast } from 'sonner'

function ContentDialog (props: NewNoteContentDialogProps) {
  if (props.shouldShowOnboarding) {
    return (
      <p className="text-slate-400 left-6 font-medium">
        Comece <button type="button" className="text-lime-400" onClick={props.handleStartRecording}>gravando uma nota</button> em áudio ou se preferir <button type="button" className="text-lime-400" onClick={props.handleStartEditor}>utilize apenas texto</button>.
      </p>
    )
  }

  return (
    <textarea
      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
      autoFocus
      onChange={props.handleContentChange}
      value={props.content}
    />
  )
}

function FooterDialog (props: NewNoteFooterDialogProps) {
  if (props.isRecording) {
    return (
      <button
        className="bg-slate-900 outline-none py-4 text-sm font-medium group text-slate-300 hover:text-slate-100 flex items-center justify-center gap-2"
        type="button"
        onClick={props.stopRecording}
      >
        <span className="size-3 bg-red-500 rounded-full animate-pulse" />
        Gravando! (clique p/ interromper)
      </button>
    )
  }

  return (
    <button
      className="bg-lime-400 outline-none py-4 text-sm font-medium group text-lime-950 hover:bg-lime-500"
      type="button"
      onClick={props.saveNote}
      disabled
    >
      Salvar nota
    </button>
  )
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard (props: NewNoteCardProps) {
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isOpened, setIsOpened] = useState(false)

  const contentDialogProps: NewNoteContentDialogProps = {
    content,
    handleContentChange,
    handleStartEditor,
    handleStartRecording,
    shouldShowOnboarding
  }

  const footerDialogProps: NewNoteFooterDialogProps = {
    isRecording,
    saveNote,
    stopRecording
  }

  function toggleDialog () {
    setIsOpened(!isOpened)
  }

  function handleStartEditor () {
    setShouldShowOnboarding(false)
  }

  function handleStartRecording () {
    setIsRecording(true)

    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta gravação!')

      return
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    setShouldShowOnboarding(false)

    speechRecognition.onresult = event => {
      const transcriptionList = Array.from(event.results)
      const transcription = transcriptionList.reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = event => {
      console.log('TCL: handleStartRecording -> event', event)
    }

    speechRecognition.start()
  }

  function stopRecording () {
    setIsRecording(false)

    speechRecognition?.stop()
  }

  function handleContentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  function saveNote () {
    if (!content) return

    props.onNoteCreated(content)
    setShouldShowOnboarding(true)
    setContent('')
    toast('Nota salva!')
  }

  return (
  // <Dialog.Root>
  //   <Dialog.Trigger className="rounded-md text-left flex bg-slate-700 p-5 outline-none text-sm space-y-3 hover:ring-2 hover:ring-slate-700 focus-visible:ring-2 focus-visible:ring-lime-400">
  //     <div>
  //       <span className="text-slate-200 font-medium leading-5" >Adicionar nota</span>

  //       <p className="text-slate-400 left-6">Grave uma nota em áudio que será convertida para texto automaticamente.</p>
  //     </div>
  //   </Dialog.Trigger>

  //   <Dialog.Portal>
  //     <Dialog.Overlay className="inset-0 fixed bg-black/50" />

  //     <Dialog.Content className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 h-[60vh] rounded-md flex flex-col outline-none overflow-hidden">
  //       <Dialog.Close className="p-1.5 absolute bg-slate-800 right-0 group">
  //         <X className=" text-slate-500 size-5 group-hover:text-slate-100" />
  //       </Dialog.Close>

  //       <form className="flex flex-col flex-1">
  //         <div className="flex flex-1 flex-col gap-3 p-5">
  //           <span className="text-slate-300 font-medium leading-5">
  //             Adicionar uma nota
  //           </span>

  //           {
  //             shouldShowOnboarding
  //               ? <Content handleStartEditor={handleStartEditor} handleStartRecording={handleStartRecording} />
  //               : <Textarea content={content} handleContentChange={event => handleContentChange(event)} />
  //           }
  //         </div>

  //         {isRecording ? <RecordingButton stopRecording={stopRecording} /> : <DefaultButton saveNote={saveNote} />}
  //       </form>
  //     </Dialog.Content>
  //   </Dialog.Portal>
  // </Dialog.Root>

    <>
      <BaseCard
        title='Adicionar uma nota'
        content='Grave uma nota em áudio que será convertida para texto automaticamente.'
        useNew={true}
        onClick={toggleDialog}
      />

      <NoteDialog
        contentNode={<ContentDialog {...contentDialogProps} />}
        footerNode={<FooterDialog {...footerDialogProps} />}
        open={isOpened}
        title='Adicionar uma nota'
        onClose={toggleDialog}
      />
    </>
  )
}
