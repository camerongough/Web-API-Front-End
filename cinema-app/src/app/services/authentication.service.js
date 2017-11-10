(function() {
  'use strict';

  angular
    .module('app')
    .factory('AuthenticationService', Service);

  function Service($http, $localStorage) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(email, password, callback) {
      $http.post('/api/v1/authenticate', {
          email: email,
          password: password
        })
        .success(function(response) {
          if (response.token) {
            $localStorage.currentUser = {
              email: email,
              token: response.token
            };

            $http.defaults.headers.common.Authorization = response.token;
          }
        });
    }

    function Logout() {
      delete $localStorage.currentUser;
      $http.defaults.headers.common.Authorization = '';
    }
  }
})();
