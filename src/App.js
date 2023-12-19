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
        let nextId = 1;

        const dummyNotes = [
          { id: String(nextId++), title: 'Ayam Goreng', content: 'Ayam Goreng paling enak bagian dada dan paha.', date: 'Senin, 4 Desember 2023' },
          { id: String(nextId++), title: 'Ayam Bakar Madu', content: 'Ayam bakar madu memiliki cita rasa yang unik dan sangat nikmat jika dimakan masih hangat.', date: 'Selasa, 5 Desember 2023' },
          { id: String(nextId++), title: 'Sate Ayam Madura', content: 'Tesate satenya dekkk.', date: 'Rabu, 6 Desember 2023' },
          { id: String(nextId++), title: 'Kambing Guling', content: 'Kasian kambingnya diguling-guling.', date: 'Kamis, 7 Desember 2023' },
          { id: String(nextId++), title: 'Rendang', content: 'Cita rasa yang sungguh menggugah selera.', date: 'Jumat, 8 Desember 2023' },
        ];
        
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
