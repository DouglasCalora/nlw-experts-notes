import type { Note } from '@components/note-card'
import { useState } from 'react'

export function useNotes () {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesFromStorage = localStorage.getItem('notes')

    return notesFromStorage ? JSON.parse(notesFromStorage) : []
  })

  function add (content: string) {
    const newNote: Note = {
      content,
      date: new Date(),
      id: crypto.randomUUID()
    }

    const notesList = [newNote, ...notes]

    setNotes(notesList)

    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  function remove (id: string) {
    const notesList: Note[] = [...notes].filter(note => note.id !== id)

    setNotes(notesList)

    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  return {
    notes,

    add,
    remove
  }
}
