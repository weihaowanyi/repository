'use strict';

/**
 * @ngdoc overview
 * @name katana
 * @description
 * # katana
 *
 * Main module of the application.
 */
var katana = angular.module('katana', [
  'ionic',
  'ngResource',
  'ui.router',
  'ngStorage',
  'pascalprecht.translate',
  'angular-jwt'
]);
katana.config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $translateProvider,$ionicConfigProvider,$httpProvider, jwtInterceptorProvider) {

  $httpProvider.interceptors.push(function ($rootScope,$injector) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function (response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      responseError: function (rejection) {
        $rootScope.$broadcast('loading:hide');
        console.log(JSON.stringify(rejection));
        if (rejection.data === null) {

        } else if (rejection.status === 401) {
          $injector.invoke(function ($state) {
            console.log($state.current.name);
            $state.go('insight.signIn');
          });
        } else if (rejection.status === 403) {

        } else if (rejection.status === 404) {

        } else if (rejection.status === 500) {

        }
      }
    }
  });
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  jwtInterceptorProvider.authPrefix = '';
  jwtInterceptorProvider.tokenGetter = ['config','jwtHelper','$localStorage', function (config,jwtHelper,$localStorage) {
    var theUserToken = $localStorage.userToken;
    if(theUserToken instanceof Object){
      var date = jwtHelper.getTokenExpirationDate(theUserToken.token);
      var bool = jwtHelper.isTokenExpired(theUserToken.token);
      return theUserToken.token;
    }else{
      //do nothing with rejected with 401 Unauthorized error
    }
  }];
  $httpProvider.interceptors.push('jwtInterceptor');
  $translateProvider.useStaticFilesLoader({
    prefix: 'api/languages/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('zh_CN');
  $translateProvider.fallbackLanguage('zh_EN');
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  $stateProvider
    .state('katana', {
      url: "/katana",
      abstract: true,
      templateUrl: "views/menu.html",
      controller: 'KatanaController'
    })

    .state('katana.books', {
      url: "/books",
      views: {
        'menuContent': {
          templateUrl: "views/iBook/books.html",
          controller: 'BooksController'
        }
      }
    })

    .state('katana.book', {
      url: "/book/:id",
      views: {
        'menuContent': {
          templateUrl: "views/iBook/book.html",
          controller: 'BookDetailsController'
        }
      }
    })
    .state('katana.bookScanner', {
      url: "/bookScanner",
      views: {
        'menuContent': {
          templateUrl: "views/scanner/bookScanner.html",
          controller: 'BookScannerController'
        }
      }
    })
    .state('katana.bookRecommendations', {
      url: "/bookRecommendations",
      views: {
        'menuContent': {
          templateUrl: "views/iBook/bookRecommendations.html",
          controller: 'BookRecommendationsController'
        }
      }
    })
    // conference
    .state('katana.conference', {
      url: "/conference",
      views: {
        'menuContent': {
          templateUrl: "views/conference/conference.html",
          controller: 'ConferenceController'
        }
      }
    })
    .state('katana.interactive', {
      url: "/interactive",
      views: {
        'menuContent': {
          templateUrl: "views/conference/interactive.html",
          controller: 'ConferenceController'
        }
      }
    })
    .state('katana.account', {
      url: "/account",
      views: {
        'menuContent': {
          templateUrl: "views/account/account.html",
          controller: 'AccountController'
        }
      }
    })
    .state('katana.signIn', {
      url: "/account/signIn",
      views: {
        'menuContent': {
          templateUrl: "views/account/signIn.html",
          controller: 'AccountController'
        }
      }
    })
    .state('katana.signUp', {
      url: "/account/signUp",
      views: {
        'menuContent': {
          templateUrl: "views/account/signUp.html",
          controller: 'AccountController'
        }
      }
    })

    //for books for me tabs
    .state('katana.booksForMe', {
      url: "/booksForMe",
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: "views/booksForMe/tabs.html",
          controller: 'BooksForMeController'
        }
      }
    })
    .state('katana.booksForMe.read', {
      url: "/read",
      views: {
        'readContent': {
          templateUrl: "views/booksForMe/read.html",
          controller: 'BooksForMeController'
        }
      }
    })
    .state('katana.booksForMe.onReading', {
      url: "/onReading",
      views: {
        'readingContent': {
          templateUrl: "views/booksForMe/reading.html",
          controller: 'BooksForMeController'
        }
      }
    })
    .state('katana.booksForMe.wishList', {
      url: "/wishList",
      views: {
        'wishListContent': {
          templateUrl: "views/booksForMe/wishList.html",
          controller: 'BooksForMeController'
        }
      }
    })
    .state('katana.booksForMe.favorite', {
      url: "/favorite",
      views: {
        'favoriteContent': {
          templateUrl: "views/booksForMe/favorite.html",
          controller: 'BooksForMeController'
        }
      }
    })
    .state('katana.booksForMe.label', {
      url: "/label",
      views: {
        'labelContent': {
          templateUrl: "views/booksForMe/label.html",
          controller: 'BooksForMeController'
        }
      }
    })

    //for books for borrow tabs
    .state('katana.booksForBorrow', {
      url: "/booksForBorrow",
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: "views/booksForBorrow/tabs.html",
          controller: 'BooksForBorrowController'
        }
      }
    })
    .state('katana.booksForBorrow.borrowedFrom', {
      url: "/borrowedFrom",
      views: {
        'borrowedFromContent': {
          templateUrl: "views/booksForBorrow/borrowedFrom.html",
          controller: 'BooksForBorrowController'
        }
      }
    })
    .state('katana.booksForBorrow.borrowedTo', {
      url: "/borrowedTo",
      views: {
        'borrowedToContent': {
          templateUrl: "views/booksForBorrow/borrowedTo.html",
          controller: 'BooksForBorrowController'
        }
      }
    })

    .state('katana.settings', {
      url: "/account/settings",
      views: {
        'menuContent': {
          templateUrl: "views/account/settings.html",
          controller: 'AccountController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/katana/conference');
});

katana.run(function ($ionicPlatform, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function () {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  //register listeners for loading
  $rootScope.$on('loading:show', function () {
    $ionicLoading.show();
  })
  $rootScope.$on('loading:hide', function () {
    $ionicLoading.hide();
  })
})
