(function () {
    "use strict";

    var model,
        songs,
        timeout,
        httpMock;

    beforeEach(module("musiComp"));

    describe("Song Model Tests", function () {

        beforeEach(function () {

            songs = [
                { _id: 1, title: "Song1"},
                { _id: 2, title: "Song2"},
                { _id: 3, title: "Song3"}
            ];

            inject(function (songModel, $timeout, $httpBackend) {
                model = songModel;
                timeout = $timeout;
                httpMock = $httpBackend;
            });
        });

        it("should load songs appropriately from API", function () {

            httpMock.when("GET", "api/songs").respond({ d: songs });

            model.getSongs().then(function (songList) {

                expect(songList).toEqual(songs);
            });

            httpMock.flush();
            timeout.flush();

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
