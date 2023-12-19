import React, { useState } from 'react';
import NoteForm from './components/NoteForm/NoteForm';
import NoteList from './components/NoteList/NoteList';
import { dummyNotes } from './utils/data';

import './App.css';

const App = () => {
  const [notes, setNotes] = useState(dummyNotes);
  const [keyword, setKeyword] = useState('');

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, { ...note, id: String(Date.now()) }]);
  };

  const deleteNote = (id) => {
    const isDummyNote = notes.find((note) => note.id === id) !== undefined;
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);

    if (!isDummyNote) {
      // No localStorage usage
    }
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    noteToArchive.archived = true;
    setNotes([...notes]); // Force re-render
  };

  const restoreNote = (id) => {
    const noteToRestore = notes.find((note) => note.id === id);
    noteToRestore.archived = false;
    setNotes([...notes]); // Force re-render
  };

  const searchNotes = (query) => {
    setKeyword(query);
  };

  return (
    <div className="container">
      <div className="nav">
        <h1 className="title">CatApp</h1>
        <input
          className="search"
          type="text"
          placeholder="Cari catatan berdasarkan judul"
          onChange={(e) => searchNotes(e.target.value)}
        />
      </div>
      <div>
        <NoteForm addNote={addNote} />
        <NoteList
          notes={activeNotes}
          deleteNote={deleteNote}
          archiveNote={archiveNote}
          restoreNote={restoreNote}
          title="Daftar Catatan"
        />
        <NoteList
          notes={archivedNotes}
          deleteNote={deleteNote}
          restoreNote={restoreNote}
          title="Arsip Catatan"
        />
      </div>
    </div>
  );
};

export default App;
