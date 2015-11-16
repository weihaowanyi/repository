'use strict';

var katana = angular.module('katana');
katana.controller('ConferenceController', function($scope,$ionicModal,$localStorage,TheAccount,Question) {

  $scope.account = {};
  $scope.interview = {};
  $scope.register = function(){
    TheAccount.save( $scope.account,function(result){
      $localStorage.account = result.data;
      $scope.message = "您已经签到成功！ 请参考会议安排进行下一步，感谢您的支持！";
      $scope.openModal();
    }, function(error){
      console.log(error)
    });
  }

  $scope.getAccountName = function(){
    return  angular.fromJson($localStorage.account).name;
  }
  $scope.askQuestion = function(){
    $scope.interview.name = angular.fromJson($localStorage.account).name;
    $scope.interview.phone = angular.fromJson($localStorage.account).phone;
    Question.save($scope.interview,function(result){
      $scope.message = "您已经提问成功！感谢您的支持！";
      $scope.openModal();
    })
  }
  $ionicModal.fromTemplateUrl('theDialog.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
