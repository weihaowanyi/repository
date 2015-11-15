'use strict';

var katana = angular.module('katana');
katana.controller('BookRecommendationsController', function($scope,BookRecommendations) {
    BookRecommendations.query(function(result){
        $scope.recommendations = result;
    })
    $scope.getTags = function(tags){
        var tagArray = [];
        angular.forEach(tags, function(value, key) {
            tagArray.push(value.name);
        });
        return tagArray;
    }
});
