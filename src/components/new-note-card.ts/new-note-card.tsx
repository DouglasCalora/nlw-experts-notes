import { BaseCard } from '@components/base-card'
import { NoteDialog } from '@components/note-dialog'

import type {
  NewNoteCardProps,
  NewNoteContentDialogProps,
  NewNoteFooterDialogProps,
  NewNoteFooterDialogRecordingProps,
  NewNoteFooterDialogSaveProps
} from './new-note-card.types'

import { clsx } from 'clsx'
import { toast } from 'sonner'

import { useState } from 'react'
import type { ChangeEvent, ButtonHTMLAttributes } from 'react'

// content
function ContentDialog (props: NewNoteContentDialogProps) {
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
    className: 'text-lime-400'
  }

  const startButtonProps = { ...buttonProps, onClick: props.handleStartRecording }
  const textButtonProps = { ...buttonProps, onClick: props.handleStartEditor }

  return (
    props.shouldShowOnboarding
      ? <p className='text-slate-400 left-6 font-medium'>
        Comece <button {...startButtonProps}>gravando uma nota</button> em áudio ou se preferir <button {...textButtonProps}>utilize apenas texto</button>.
      </p>
      : <textarea
        className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
        autoFocus
        onChange={props.handleContentChange}
        value={props.content}
      />
  )
}

// footer
function FooterDialogRecording (props: NewNoteFooterDialogRecordingProps) {
  return (
    <button
      className='bg-slate-900 outline-none py-4 text-sm font-medium group text-slate-300 hover:text-slate-100 flex items-center justify-center gap-2'
      type='button'
      onClick={props.stopRecording}
    >
      <span className='size-3 bg-red-500 rounded-full animate-pulse' />
      Gravando! (clique p/ interromper)
    </button>
  )
}

function FooterDialogSave (props: NewNoteFooterDialogSaveProps) {
  const staticClasses = 'bg-lime-400 outline-none py-4 text-sm font-medium group text-lime-950'
  const isDisabled = !props.content

  const classes = clsx(
    staticClasses,
    isDisabled ? 'cursor-not-allowed bg-slate-200' : 'hover:bg-lime-500'
  )

  return (
    <button
      className={classes}
      type='button'
      onClick={props.saveNote}
      disabled={isDisabled}
    >
      Salvar nota
    </button>
  )
}

function FooterDialog (props: NewNoteFooterDialogProps) {
  return props.isRecording
    ? <FooterDialogRecording {...props} />
    : <FooterDialogSave {...props} />
}

// speech
let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard (props: NewNoteCardProps) {
  const [content, setContent] = useState('')
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)

  const contentDialogProps: NewNoteContentDialogProps = {
    content,
    handleContentChange,
    handleStartEditor,
    handleStartRecording,
    shouldShowOnboarding
  }

  const footerDialogProps: NewNoteFooterDialogProps = {
    content,
    isRecording,
    saveNote,
    stopRecording
  }

  function toggleDialog () {
    setIsDialogOpened(!isDialogOpened)
  }

  function reset () {
    toggleDialog()
    setShouldShowOnboarding(true)
    stopRecording()
    setContent('')
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

    speechRecognition.onerror = () => {
      toast.error('Erro ao inicializar speaker.')
    }

    speechRecognition.start()
  }

  function stopRecording () {
    setIsRecording(false)

    speechRecognition?.abort()
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
    <>
      <BaseCard
        content='Grave uma nota em áudio que será convertida para texto automaticamente.'
        title='Adicionar uma nota'
        useNew={true}
        onClick={toggleDialog}
      />

      <NoteDialog
        contentNode={<ContentDialog {...contentDialogProps} />}
        footerNode={<FooterDialog {...footerDialogProps} />}
        open={isDialogOpened}
        title='Adicionar uma nota'
        onClose={reset}
      />
    </>
  )
}
