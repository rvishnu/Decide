/**
 * Created by rvishnu on 6/11/15.
 */
'use strict';
(function (app) {

  app.controller('TreeController', ['TreeService', 'Node', 'rootNode', '$stateParams', '$modal',
    function (TreeService, Node, rootNode, $stateParams, $modal) {
      var self = this;

      self.node;

      if ($stateParams.nodeid) {
        self.node = TreeService.getNodeById($stateParams.nodeid);
      } else {
        self.node = rootNode;
      }


      self.saveTree = function () {
        TreeService.saveTree();
      };

      self.confirmDelete = function(node){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'app/tree/deleteModal.html',
          controller: 'DeleteModalInstanceCtrl as ctrll',
          size: 'sm',
          resolve: {
            node: function () {
              return node;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          self.confirmDelete = selectedItem;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      self.editNode = function(node, parentNode) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'app/tree/editNodeModal.html',
          controller: 'EditModalInstanceCtrl as ctrll',
          size: 'lg',
          resolve: {
            node: function () {
              return node;
            },
            parentNode: function() {
              return parentNode;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          self.saved = selectedItem;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }
  }]);

  app.directive('diSanitizeString', function(){
    return {
      controller : "DiSanitizeStringCtrl as sctrl",
      scope:{
        stringToSanitize : '=diSanitizeString'
      },
      templateUrl:'app/tree/sanitizeString.html',
      bindToController: true
    }

  });

  app.controller('DiSanitizeStringCtrl', ['$sce', function($sce){
    var self = this;

    self.sanitizedString = $sce.trustAsHtml(self.stringToSanitize);

  }]);

  app.directive('diGetContent', function(){
    return {
      templateUrl:'app/tree/GetContent.html',
      controller: "GetContentCtrl as gctrl",
      scope: {
        node: '=node'
      },
      bindToController: true
    }
    });

    app.controller('GetContentCtrl', ['$sce', '$window', function($sce, $window){
      var self = this;
      self.redirect = false;

      if(self.node.children.length < 1 && self.node.pageURL)
      {
        self.redirect = true;
        $window.open(self.node.pageURL, "_self");
      }
   }]);


})(angular.module('TreeModule', []));

/*

 self.toggleAddNode = function () {
 self.addNode = true;
 };

 self.toggleDeleteNode = function () {
 self.editNode = true;
 };




 self.addNode = false;

 self.editNode = false;

 self.getTree = function(){
 TreeService.getTree(function(tree){
 self.node = tree;
 })
 }*/
//self.getTree();

/*    self.getNode = function(node){
 self.node = node;
 };

 self.addChildNode = function () {
 self.newNode.id = TreeService.generateUUID();
 self.newNode.parentId = self.node.id;
 self.node.children.push(angular.copy(self.newNode));
 self.newNode = new Node();
 self.addNode = false;
 self.editNode = false;
 };

 self.editNode = function () {

 };

 self.deleteNodeAndChildren = function (node) {
 for (var i = 0; i < self.node.children.length; i++) {
 var childNode = self.node.children[i];
 if (childNode.id === node.id) {
 self.node.children.splice(i, 1);
 break;
 }
 }
 self.addNode = false;
 self.editNode = false;
 };
 */

