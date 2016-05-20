(function(angular) {
    "use strict";

    angular.module("musiComp").factory("songModel", ["songService", "$q", "$routeParams",
        function(songService, $q, $routeParams) {

            var Model = function() {
                return this;
            };

            Model.prototype.newSection = function($scope) {
                //push new section into song.sections
                $scope.song.sections.push({
                    name: '',
                    measures:[
                        {
                            id: 0,
                            rows: []
                        }
                    ],
                    bpm: 120,
                    timeSig: 4,
                    sectionColor: null
                });
            };

            Model.prototype.getSongs = function(searchObj) {

                var self = this,
                    defer = $q.defer();

                songService.get(searchObj, function(data) {

                    self.songs = data.d;
                    if (self.songs && !_.isArray(self.songs)) {
                        self.song = self.songs;
                    }
                    defer.resolve(self.songs);
                });

                return defer.promise;
            };

            Model.prototype.addSongToScope = function($scope) {

                var self = this,
                    defer = $q.defer(),
                    id = $routeParams.songId;

                //if the browser is refreshed
                if (!self.song) {
                    self.getSongs({ id: id }).then(function(song) {
                        $scope.song = song;
                        defer.resolve($scope.song);
                    });
                } else {
                    //via redirect/location.path
                    $scope.song = self.song;
                    defer.resolve($scope.song);
                }

                return defer.promise;
            };

            Model.prototype.deleteSong = function(song) {

                var self = this,
                    defer = $q.defer();

                songService["delete"]({ id: song._id }, function(data) {

                    self.song = undefined;
                    defer.resolve(data.d);
                });

                return defer.promise;
            };

            Model.prototype.saveSong = function(song) {

                var self = this,
                    defer = $q.defer(),
                    saveOperation = song._id ? "update" : "save";

                songService[saveOperation](song, function(data) {

                    self.song = data.d;
                    defer.resolve(self.song);
                });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));
