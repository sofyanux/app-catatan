import React from 'react';
import './NoteList.css';
import { showFormattedDate } from '../../utils/data';

const NoteList = ({ notes, title, deleteNote, archiveNote, restoreNote }) => {
  return (
    <div className="container-note">
      <div>
        <h2>{title}</h2>
        {notes && notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <div className="note-list" key={note.id}>
                <strong className="judul">{note.title}</strong>
                {/* Pastikan properti yang ingin diakses telah ada */}
                <p className="tanggal">{showFormattedDate(note.createdAt)}</p>
                <p className="isi">{note.body}</p>
                <div className="btn">
                  <button className="btn-del" onClick={() => deleteNote(note.id)}>
                    Hapus
                  </button>
                  <button
                    className="btn-restore"
                    onClick={() => (note.archived ? restoreNote(note.id) : archiveNote(note.id))}
                  >
                    {note.archived ? 'Kembalikan' : 'Arsipkan'}
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="info">Tidak ada catatan.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
