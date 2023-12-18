import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm/NoteForm';
import NoteList from './components/NoteList/NoteList';
import './App.css';

const App = () => {
  const initialNotes = JSON.parse(localStorage.getItem('notes')) || [];
  const initialArchivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];

  const [notes, setNotes] = useState(initialNotes);
  const [archivedNotes, setArchivedNotes] = useState(initialArchivedNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    const isDummyNote = notes.find((note) => note.id === id) !== undefined;

    const updatedNotes = notes.filter((note) => note.id !== id);
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
    setArchivedNotes(updatedArchivedNotes);

    // Hapus catatan dari local storage hanya jika bukan catatan dummy
    if (!isDummyNote) {
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      localStorage.setItem('archivedNotes', JSON.stringify(updatedArchivedNotes));
    }
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    setArchivedNotes([...archivedNotes, noteToArchive]);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const restoreNote = (id) => {
    const noteToRestore = archivedNotes.find((note) => note.id === id);
    setNotes([...notes, noteToRestore]);
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
  };

  const searchNotes = (query) => {
    setSearchQuery(query);
    // Filter catatan berdasarkan judul dan update searchResults
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredNotes);
  };

  useEffect(() => {
    const addDummyNotesIfNeeded = () => {
      const storedNotes = JSON.parse(localStorage.getItem('notes'));
      const storedArchivedNotes = JSON.parse(localStorage.getItem('archivedNotes'));

      if (!storedNotes || !storedArchivedNotes) {
        const dummyNotes = [
          { id: '1', title: 'Catatan Dummy 1', content: 'Isi catatan dummy 1', date: 'Tanggal dummy 1' },
          { id: '2', title: 'Catatan Dummy 2', content: 'Isi catatan dummy 2', date: 'Tanggal dummy 2' },
          // ... tambahkan catatan dummy lainnya
        ];

        dummyNotes.forEach((dummyNote) => addNote(dummyNote));
      }
    };

    addDummyNotesIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div>
      <div>
        <h1>Aplikasi Catatan</h1>
        <input
          type="text"
          placeholder="Cari catatan berdasarkan judul"
          onChange={(e) => searchNotes(e.target.value)}
        />
      </div>
      <NoteForm addNote={addNote} />
      <NoteList
        notes={searchQuery ? searchResults : notes || []}
        archivedNotes={archivedNotes || []}
        deleteNote={deleteNote}
        archiveNote={archiveNote}
        restoreNote={restoreNote}
      />
    </div>
  );
};

export default App;
