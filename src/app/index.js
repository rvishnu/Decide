'use strict';

angular.module('sampleNode', ['ngAnimate', 'ngResource', 'ui.router', 'ui.bootstrap', 'TreeModule','ngSanitize'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as ctrl'
      })
      .state('tree', {
        url: '/tree/:nodeid',
        templateUrl: 'app/tree/Tree.html',
          controller: 'TreeController as ctrl',
        resolve: {
          rootNode: ['TreeService',
            function (TreeService) {
              return TreeService.getTreeOnlyOnce();
            }]
        }
      })
      .state('decide', {
        url: '/decide/:nodeid',
        templateUrl: 'app/tree/Decide.html',
        controller: 'TreeController as ctrl',
        resolve: {
          rootNode: ['TreeService',
            function (TreeService) {
              return TreeService.getTreeOnlyOnce();
            }]
        }

      })
      .state('angulartree', {
        url: '/angulartree',
        templateUrl: 'app/tree/angulartree.html',
        controller: 'TreeController as ctrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
