'use strict';

var katana = angular.module('katana');
katana.controller('AccountController', function($scope,$localStorage,User) {
    $scope.settingsList = [
        { text: "Enable news from iBorrow", checked: true }
    ];
    $scope.signIn = function(){
        User.save($scope.loginData,function(result){
            $localStorage.userToken= result;
        });
    }

    $scope.user = {};
    $scope.signUp = function(){
        User.save($scope.user,function(result){
            $localStorage.user= result.data;
        });
    }
})
