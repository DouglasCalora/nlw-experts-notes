import { NewNoteCard } from '@components/new-note-card.ts'
import { NoteCard, Note } from '@components/note-card'

import logo from './assets/logo.svg'

import { ChangeEvent, useState } from 'react'

export default function App () {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesFromStorage = localStorage.getItem('notes')

    return notesFromStorage ? JSON.parse(notesFromStorage) : []
  })

  const filteredNotes = search
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  function onNoteCreated (content: string) {
    const newNote: Note = {
      content,
      date: new Date(),
      id: crypto.randomUUID()
    }

    const notesList = [newNote, ...notes]

    setNotes(notesList)

    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  function onNoteDeleted (id: string) {
    const notesList: Note[] = [...notes]

    const index = notesList.findIndex(note => note.id === id)

    if (~index) notesList.splice(index, 1)

    setNotes(notesList)

    localStorage.setItem('notes', JSON.stringify(notesList))
  }

  function onTypeSearch (event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="Logo nlw" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none"
          onChange={onTypeSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={() => onNoteDeleted(note.id)} />
        })}
      </div>
    </div>
  )
}
