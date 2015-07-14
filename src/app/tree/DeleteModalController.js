/**
 * Created by rvishnu on 7/12/15.
 */
'use strict';
(function (app) {
app.controller('DeleteModalInstanceCtrl', ['NodeService', '$modalInstance', 'node',
  function(NodeService, $modalInstance, node){
    var self = this;

    self.node = node;
    console.log(self.node.name);
    var deleted= false;
    self.delete = function () {
      console.log("Inside the delete method");
      var count = NodeService.deleteNode(self.node, function(count)
      {
        if(count){
          deleted = true;
          console.log(deleted);
        }else{
          console.log('Not Deleted');
        }
      });
      $modalInstance.close(deleted);
    };

    self.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);

})(angular.module('TreeModule'));
