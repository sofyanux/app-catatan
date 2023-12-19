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
        body: content,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      addNote(newNote);
      setTitle('');
      setContent('');
    } else {
      alert('Judul dan isi catatan tidak boleh kosong!');
    }
  };

  const maxTitleLength = 50;
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;

    if (newTitle.length <= maxTitleLength) {
      setTitle(newTitle);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Tambah Catatan Baru</h2>
      <div className="note-form">
        <label>
          <div className='title-counter'>
            <span>Judul:</span>
            <p className="counter">{maxTitleLength - title.length} karakter tersisa</p>
          </div>
          <input className="note-title" type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          <span>Isi:</span>
          <textarea className="note-content" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button className="btn-add" onClick={handleAddNote}>Tambah Catatan</button>
      </div>
    </div>
  );
};

export default NoteForm;