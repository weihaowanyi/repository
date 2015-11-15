'use strict';

var katana = angular.module('katana');

katana
  .factory("TheAccount", function($resource) {
      return $resource('http://127.0.0.1:3000/account/attendConference');
  })
    .factory("BookRecommendations", function($resource) {
        return $resource('dataset/bookRecommendations.json');
    })
    .factory("Book", function($resource) {
        return $resource('dataset/book.json');
    })
    .factory("Books", function($resource) {
        return $resource('dataset/books.json');
    })
    .factory("Tags", function($resource) {
        return $resource('dataset/tags.json');
    })
    .factory("Article", function($resource) {
        return $resource('https://128.199.91.142:3000/articles/55cef0949d9179700985c90d');
    })
    .factory("User", function($resource) {
        return $resource('http://127.0.0.1:3000/user');
    })
    .factory("Language", function($resource) {
        return $resource('dataset/languages/languages.json');
    })
    .factory("Account", function($resource) {
        return $resource('dataset/account.json');
    })
    .factory('Camera', ['$q', function($q) {

        return {
            getPicture: function(options) {
                var q = $q.defer();

                navigator.camera.getPicture(function(result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }]);
