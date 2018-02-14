const fs = require('fs'),
      _ = require('lodash'),
      yargs = require('yargs');

const notes = require('./notes.js');
      
const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  }).command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv,
  command = argv._[0];


switch(command) {
  case "add":
    notes.addNote(argv.title, argv.body) ? console.log("Note Created") : console.log("Title already taken");
    break;
    
  case "read":
    notes.getNote(argv.title) ? console.log(notes.getNote(argv.title)) : console.log("Note not found");
    break;
    
  case "remove":
    notes.removeNote(argv.title);
    break;
    
  case "list":
    const allNotes = notes.getAll();
    allNotes.forEach((note) => console.log(note));
    break;
    
  default:
    console.log("Command is not recognized");
}