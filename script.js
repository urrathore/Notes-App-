document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const saveNoteButton = document.getElementById('saveNote');
    const exportNoteButton = document.getElementById('exportNote');
    const notesList = document.getElementById('notesList');

    // Load notes from local storage
    loadNotes();

    // Save note to local storage
    saveNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value;
        if (noteText) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
        }
    });

    // Export notes as .txt file
    exportNoteButton.addEventListener('click', () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const blob = new Blob([notes.join('\n\n')], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'notes.txt';
        link.click();
    });

    // Load notes into the notes list
    function loadNotes() {
        notesList.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = marked(note); // Use marked.js for Markdown support
            notesList.appendChild(noteDiv);
        });
    }
});