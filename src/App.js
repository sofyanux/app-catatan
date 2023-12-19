import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm/NoteForm';
import NoteList from './components/NoteList/NoteList';
import { dummyNotes } from './utils/data';
import './App.css';

const App = () => {
  const initialNotes = JSON.parse(localStorage.getItem('notes')) || dummyNotes;  // Gunakan dummyNotes sebagai nilai default
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
    setNotes((prevNotes) => [...prevNotes, { ...note, id: String(Date.now()) }]);
  };

  const deleteNote = (id) => {
    const isDummyNote = notes.find((note) => note.id === id) !== undefined;
    const updatedNotes = notes.filter((note) => note.id !== id);
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
    setArchivedNotes(updatedArchivedNotes);

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
    noteToArchive.archived = true;
  };

  const restoreNote = (id) => {
    const noteToRestore = archivedNotes.find((note) => note.id === id);
    setNotes([...notes, noteToRestore]);
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
  };

  const searchNotes = (query) => {
    setSearchQuery(query);

    const allNotes = [...notes, ...archivedNotes];

    const filteredNotes = allNotes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredNotes);
  };

  useEffect(() => {
    const addDummyNotesIfNeeded = () => {
      const storedNotes = JSON.parse(localStorage.getItem('notes'));
      const storedArchivedNotes = JSON.parse(localStorage.getItem('archivedNotes'));
      const dummyNotesAdded = localStorage.getItem('dummyNotesAdded');

      if ((!storedNotes || storedNotes.length === 0) && (!storedArchivedNotes || storedArchivedNotes.length === 0)) {
        localStorage.removeItem('dummyNotesAdded');
      }

      if ((!storedNotes || storedNotes.length === 0) && (!storedArchivedNotes || storedArchivedNotes.length === 0) && !dummyNotesAdded) {

        const filteredDummyNotes = dummyNotes.filter(dummyNote => !notes.some(note => note.id === dummyNote.id));

        setNotes(prevNotes => [...prevNotes, ...filteredDummyNotes]);
        
        localStorage.setItem('dummyNotesAdded', true);
      }
    };

    addDummyNotesIfNeeded();
  }, [notes]); 

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
          notes={searchQuery ? searchResults : notes || []}
          archivedNotes={archivedNotes || []}
          deleteNote={deleteNote}
          archiveNote={archiveNote}
          restoreNote={restoreNote}
        />
      </div>
    </div>
  );
};

export default App;
