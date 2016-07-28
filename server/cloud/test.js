'use strict';
/* global Parse */



Parse.Cloud.define('test_push', function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  if (!user) {
    return response.error({message: 'Not logged in'});
  }


});
