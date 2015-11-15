'use strict';

var katana = angular.module('katana');
katana.controller('ConferenceController', function($scope,$ionicModal,TheAccount) {

  $scope.account = {};
  $scope.register = function(){
    TheAccount.save( $scope.account,function(result){
      $scope.openModal();
    }, function(error){
      console.log(error)
    });
  }
  $ionicModal.fromTemplateUrl('success.html', {
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
