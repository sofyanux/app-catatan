import React from 'react';
import './NoteList.css'

const NoteList = ({ notes, archivedNotes, deleteNote, archiveNote, restoreNote }) => {
  return (
    <div className="container-note">
      <div>
        <h2>Daftar Catatan</h2>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <div className="note-list" key={note.id}>
                <strong className="judul">{note.title}</strong>
                <p className="tanggal">{note.date}</p>
                <p className="isi">{note.content}</p>
                <div className="btn">
                  <button className="btn-del" onClick={() => deleteNote(note.id)}>Hapus</button>
                  <button className="btn-archive" onClick={() => archiveNote(note.id)}>Arsipkan</button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Tidak ada catatan aktif.</p>
        )}
      </div>

      <div>
        <h2>Arsip Catatan</h2>
        {archivedNotes.length > 0 ? (
          <ul>
            {archivedNotes.map((note) => (
              <div className="note-list" key={note.id}>
                <div>
                  <strong className="judul">{note.title}</strong>
                  <p className="tanggal">{note.date}</p>
                  <p className="isi">{note.content}</p>
                </div>
                <div className="btn">
                  <button className="btn-del" onClick={() => deleteNote(note.id)}>Hapus</button>
                  <button className="btn-restore" onClick={() => restoreNote(note.id)}>Kembalikan</button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Tidak ada catatan dalam arsip.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;

