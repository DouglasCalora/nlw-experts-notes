import { NewNoteCard } from '@components/new-note-card.ts'
import { NoteCard } from '@components/note-card'

import { useNotes } from '@hooks/use-notes.hook'

// import type { Note } from '@components/note-card'

import logo from './assets/logo.svg'

import { ChangeEvent, useState } from 'react'

export default function App () {
  const [search, setSearch] = useState('')
  const { notes, add, remove } = useNotes()

  const filteredNotes = search
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  function onTypeSearch (event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logo} alt='Logo nlw' />

      <form className='w-full'>
        <input
          type='text'
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none'
          onChange={onTypeSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={add} />

        {filteredNotes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeleted={() => remove(note.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
