/**
 * Created by rvishnu on 7/12/15.
 */
'use strict';

(function (app) {

  app.controller('EditModalInstanceCtrl', ['NodeService', 'TreeService', '$modalInstance', 'node', 'parentNode',
    function(NodeService, TreeService, $modalInstance, node, parentNode){
      var self = this;
      self.node = node;


      self.save = function(){
        var saved = NodeService.saveNode(self.node, parentNode, function(node)
        {
          if(!node){
            console.log("Unable to save");
          }
          else {
            TreeService.putNodeInArray(node);
            console.log("Calling the callback");
          }
        });
        $modalInstance.close();

      }

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
})(angular.module('TreeModule'));
