angular.module('myApp')
  .controller('NoteController', ['$scope', 'NoteService', function ($scope, NoteService) {
    $scope.init = function () {
      $scope.newNote = '';
      $scope.noteList = NoteService.fetchList();
      $scope.doneList = _.filter($scope.noteList, function (note) {
        return note.isDone === true;
      });
    };

    $scope.createNote = function (event) {
      if (event.which == 13 && $scope.newNote.length > 0) { // press "Enter"
        NoteService.create($scope.newNote);
        $scope.newNote = '';
        console.log($scope.noteList.length);
      }
    };

    $scope.deleteNote = function (note) {
      NoteService.delete(note);
    };

    $scope.editNote = function (note) {
      console.log('editing', note);
      NoteService.update(note);
    };

    $scope.deleteAll = function () {
      NoteService.deleteAll();
      console.log('finished');
    };

    $scope.clearDoneList = function () {
      _.each($scope.doneList, function (item) {
        NoteService.delete(item);
      });
    };

    var noteListWatcher = $scope.$watch('noteList', function(newVal, oldVal) {
      $scope.doneList = _.filter($scope.noteList, function (note) {
        return note.isDone === true;
      });
    }, true);

    var allDoneWatcher = $scope.$watch('isAllDone', function(newVal, oldVal) {
      if (newVal !== undefined) {
        console.log('trigger isAllDone watcher');
        _.each($scope.noteList, function(item) {
          item.isDone = newVal;
          NoteService.update(item);
        });
      }
    });

    $scope.$on('$destroy', function() {
      console.log('destroy');
      noteListWatcher();
      allDoneWatcher();
    });

  }]);