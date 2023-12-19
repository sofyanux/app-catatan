// src/components/NoteForm.js
import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newNote = {
        id: Date.now().toString(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      addNote(newNote);
      setTitle('');
      setContent('');
    } else {
      alert('Judul dan isi catatan tidak boleh kosong!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Tambah Catatan Baru</h2>
      <div className="note-form">
        <label>
          Judul:
          <input className="note-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Isi:
          <textarea className="note-content" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button className="btn-add" onClick={handleAddNote}>Tambah Catatan</button>
      </div>
    </div>
  );
};

export default NoteForm;
