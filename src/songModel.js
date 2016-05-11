(function(angular) {
    "use strict";

    angular.module("musiComp").factory("songModel", ["songService", "$q", "$routeParams",
        function(songService, $q, $routeParams) {

            var Model = function() {
                return this;
            };

            // Model.prototype.addSectionToScope = function($scope) {
                
            //     var self = this,
            //         songId = $routeParams.songId,
            //         sectionId = $routeParams.sectionId;

            //     if (!self.song) {
            //         self.getSongs$scope.currentSection = song.section
            //     }             

            // };

            Model.prototype.addSongToScope = function($scope) {

                var self = this,
                    id = $routeParams.songId,
                    sectionId = $routeParams.sectionId,
                    setSectionId = function() { 
                        if (sectionId) {
                            $scope.currentSection = _.find($scope.song.sections, {_id: sectionId});
                        }
                    };

                //if the browser is refreshed
                if (!self.song) {
                    self.getSongs({ id: id }).then(function(song) {
                        $scope.song = song;
                        setSectionId();
                    });
                } else {
                    //via redirect/location.path
                    $scope.song = self.song;
                    setSectionId();
                }
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

            Model.prototype.deleteSong = function(song) {

                var self = this,
                    defer = $q.defer();

                songService["delete"](song, function(message) {

                    self.song = undefined;
                    defer.resolve(message);
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
