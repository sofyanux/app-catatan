import React from 'react';
import './NoteList.css'

const NoteList = ({ notes, archivedNotes, deleteNote, archiveNote, restoreNote }) => {
  return (
    <div>
      <h2>Daftar Catatan</h2>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <div key={note.id}>
              <strong>{note.title}</strong>
              <p>({note.date})</p>
              <p>{note.content}</p>
              <div>
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
                <button onClick={() => archiveNote(note.id)}>Arsipkan</button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>Tidak ada catatan aktif.</p>
      )}

      <h2>Arsip Catatan</h2>
      {archivedNotes.length > 0 ? (
        <ul>
          {archivedNotes.map((note) => (
            <div key={note.id}>
              <strong>{note.title}</strong>
              <p>({note.date})</p>
              <p>{note.content}</p>
              <div>
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
                <button onClick={() => restoreNote(note.id)}>Kembalikan</button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>Tidak ada catatan dalam arsip.</p>
      )}
    </div>
  );
};

export default NoteList;

