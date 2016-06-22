angular.module('myApp')
  .factory('NoteService', ['$q', '$cookieStore', function ($q, $cookieStore) {
    var service = {};
    var noteList = $cookieStore.get('Notes') || [];

    service.generateOrder = function () {
      if (noteList.length === 0) {
        return 0;
      } else {
        return noteList[noteList.length - 1].order + 1;
      }
    };

    // Note model { id: Number, content: String, isDone: Bool, onEditing: Bool }
    service.create = function (newNote) {
      noteList.push({
        order: service.generateOrder(),
        content: newNote,
        isDone: false,
        onEditing: false
      });
      $cookieStore.put('Notes', noteList);
    };

    service.update = function (note) {
      var index = _.indexOf(noteList, {order: note.order});
      noteList[index] = note;
      note.onEditing = false;
      $cookieStore.put('Notes', noteList);
    };

    service.delete = function (note) {
      var index = _.findIndex(noteList, {order: note.order});
      if (index > -1) {
        noteList.splice(index, 1);
        $cookieStore.put('Notes', noteList);
      }
    };

    service.fetchList = function () {
      return noteList;
    };

    service.deleteAll = function () {
      $cookieStore.remove('Notes');
    };

    return service;
  }]);