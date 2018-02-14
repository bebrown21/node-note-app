const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

const getNote = (title) => {
  const notes = fetchNotes();
  
  return notes.filter((note) => note.title === title)[0];
};

const getAll = () => {
  return fetchNotes();
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes(),
      note = {
        title,
        body
      },
      duplicateNotes = notes.filter((note) => note.title === title);
  
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    
    return note;
  }
};

const removeNote = (title) => {
  const notes = fetchNotes(),
        filteredNotes = notes.filter((note) => note.title !== title);
        
  saveNotes(filteredNotes);
};


module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll
};