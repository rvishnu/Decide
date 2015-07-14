/**
 * Created by rvishnu on 6/11/15.
 */
'use strict';

(function (app) {

  app.factory('Node', function () {

    function Node() {
      this._id ;
      this.name;
      this.childQuestion;
      //this.children = [];
      this.parentId;
    }

    Node.prototype.addChild = function (Node) {
      this.children.push(Node);
    };

    Node.prototype.setProperties = function (properties) {
      this.properties = properties;
    };

    return Node;
  });

  app.factory('TreeResource', function ($resource) {
    return $resource('/api/Tree', null, {
      getTree: {
        method: "GET",
        isArray: false
      },
      saveTree: {
        method: "PUT",
        isArray: false
      }
    })
  })

  app.service('TreeApiService', function (TreeResource) {
    var self = this;

    self.getTree = function (completionCallback) {
      TreeResource.getTree()
        .$promise
        .then(function onSuccess(response) {
          completionCallback(true, response);
        }, function onError(error) {
          completionCallback(false, error);
        });
    }

    self.saveTree = function (Node, completionCallback) {
      TreeResource.saveTree(Node)
        .$promise
        .then(function onSuccess(response) {
          completionCallback(true, response);
        }, function onError(error) {
          completionCallback(false, error);
        });
    }
  })

  app.service('TreeCtrlService', function (TreeApiService) {
    var self = this;

    self.getTree = function (completionCallback) {
      TreeApiService.getTree(function (isValid, response) {
        if (isValid) {
          completionCallback(true, response.tree);
        } else {
          completionCallback(false);
        }
      });
    }

    self.saveTree = function (Node, completionCallback) {
      TreeApiService.saveTree(Node, function (isValid, response) {
        if (isValid) {
          completionCallback(true, response.tree);
        } else {
          completionCallback(false);
        }
      });
    }


  });

  /**
   * Methods to aid the tree service.
   *  1. Get Tree
   *  2. Create Tree
   *  3. Update Node (put in Node Service)
   *  4. Delete Node
   *  5. Edit Node
   *  6. Add Properties to Node
   *  7. Modify Properties to Node
   */

  app.service('TreeService', [ 'TreeCtrlService', '$q',
    function ( TreeCtrlService, $q) {

      var self = this;

      self.rootNode;

      self.allNode = new Array();

      self.getNodeById = function (id) {
        return self.allNode[id];
      }

      self.getTreeOnlyOnce = function(){
        if(self.rootNode){
          console.log("Not calling the backend");
          return self.rootNode;
        }
        else{
          return self.getTree();
        }
      }

      self.getTree = function () {

        return $q(function(resolve, reject) {
          TreeCtrlService.getTree(function (isValid, tree) {
            if (isValid) {
              self.rootNode = tree[0];
              self.saveAllNodesInArray(self.rootNode);
              resolve(self.rootNode);
            }
            else{
              reject();
            }
          })
        }, 10);
      };

      self.saveAllNodesInArray = function (node) {
        self.allNode[node._id] = node;
        if (node.children && node.children.length > 0)
          node.children.forEach(function (item) {
            self.saveAllNodesInArray(item);
          });
      };

      self.putNodeInArray = function(node){
        self.allNode[node._id] = node;
      };

      self.deleteNodeInArray = function(node){
          delete self.allNode[node._id];
      }

      /**
       * Create the tree from the array
       */
 //     self.decisionTree = DecisionTree;

 /*     self.createTree = function () {
        for (var i = 0; i < self.decisionTree.length; i++) {
          var nodeFromArray = self.decisionTree[i];
          var node = new Node(nodeFromArray.id, nodeFromArray.name,
            nodeFromArray.parentId, nodeFromArray.childQuestion);
          self.allNodes[node.id] = node;
          if (!(node.parentId === undefined)) {
            var parentNode = self.allNodes[node.parentId];
            parentNode.addChild(node);
          }
        }
        self.rootNode = self.allNodes[0];
        return self.rootNode;
      }*/

      self.saveTree = function () {
        //  localStorage.setItem('Tree', JSON.stringify(rootNode));
        console.log(self.rootNode);
        TreeCtrlService.saveTree(JSON.stringify(self.rootNode));
      };
    }]);


})(angular.module('TreeModule'));

/*  self.generateUUID = function () {
 var d = new Date().getTime();
 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
 var r = (d + Math.random() * 16) % 16 | 0;
 d = Math.floor(d / 16);
 return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
 });
 return uuid;
 };

 self.average = function (a, b) {
 return (a + b) / 2;
 }*/
