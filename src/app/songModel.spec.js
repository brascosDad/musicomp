(function () {
    "use strict";

    var model,
        songs,
        song,
        timeout,
        httpMock,
        $rootScope;

    beforeEach(module("musiComp"));

    describe("Song Model Tests", function () {

        beforeEach(function () {

            songs = [
                { _id: 1, title: "Song1"},
                { _id: 2, title: "Song2"},
                { _id: 3, title: "Song3"}
            ];

            song = {
                _id: 100,
                title: 'titlefoo',
                sections: [
                     { _id: 101, name: "foo" },
                     { _id: 102, name: "bar" },
                     { _id: 103, name:"me" }
                     ]
            };

            inject(function (songModel, $timeout, $httpBackend, _$rootScope_) {
                model = songModel;
                timeout = $timeout;
                httpMock = $httpBackend;
                $rootScope = _$rootScope_;
            });
        });

        it("should create a new section", function() {
            $rootScope.song = song;
            model.newSection($rootScope);

            expect($rootScope.song.sections.length).toEqual(4);

        });

        it("should load songs appropriately from API", function () {

            httpMock.when("GET", "api/songs").respond({ d: songs });

            model.getSongs().then(function (songList) {

                expect(songList).toEqual(songs);
            });

            httpMock.flush();
            timeout.flush();

        });

        it("should add song to scope when songModel.song does not exist", function() {
            model.song = null;

            httpMock.when("GET", "api/songs").respond({ d: song });

            model.addSongToScope($rootScope).then(function (returnSong) {

                expect(song).toEqual(returnSong);
            });

        });

        it("should add song to scope when songModel.song does exist", function() {
            model.song = song;

            // httpMock.when("GET", "api/songs").respond({ d: song });

            model.addSongToScope($rootScope).then(function (returnSong) {

                expect(song).toEqual(returnSong);
            });

        });

        it("should create song appropriately from API", function () {

            var song = songs[2];
            delete song._id;

            httpMock.when("POST", "api/songs").respond({ d: song });

            model.saveSong(song).then(function (returnSong) {

                expect(song).toEqual(returnSong);
            });

            httpMock.flush();
            timeout.flush();

        });

        it('should delete song appropriately from API', function() {
            var song = songs[2],
                message = "you successfully deleted the last song";
            // delete song._id;

            httpMock.when("DELETE", "api/songs/3").respond({ d: message });

            model.deleteSong(song).then(function (m) {

                expect(m).toEqual(message);
            });

            httpMock.flush();
            timeout.flush();
        });

        it("should update song appropriately from API", function () {

            var song = songs[2];

            httpMock.when("PUT", "api/songs").respond({ d: song });

            model.saveSong(song).then(function (returnSong) {

                expect(song).toEqual(returnSong);
            });

            httpMock.flush();
            timeout.flush();

        });

    });

}());
