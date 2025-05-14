import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import NoteList from "../NoteList/NoteList";
import SearchBar from "../SearchBar/SearchBar";

const AcceuilDashBoard = ({ handleCreateNote, handleSearch, filteredNotes, handleEditNote, handleDeleteNote }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          Mes Notes
        </h1>
        <CreateNoteButton onClick={handleCreateNote} />
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* // Décommentez si vous implémentez les contrôles de filtre/tri
        <div className="mb-6">
          <FilterSortControls />
        </div> 
        */}

      <NoteList
        notes={filteredNotes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default AcceuilDashBoard;