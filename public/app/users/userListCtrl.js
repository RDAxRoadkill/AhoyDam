(function () {
    "use strict";
    angular
        .module('usersManagement', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '',
                    templateUrl: 'views/partials/index.html'
                })
                .state('agenda', {
                    url: '/agenda',
                    templateUrl: 'views/partials/agenda/agenda.html',
                    controller: "AgendaListCtrl as ctrl"
                })
                .state('registreren', {
                    url: '/registreren',
                    templateUrl: 'views/partials/registreren.html',
                   // controller: "UserListCtrl as ctrl"
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/partials/login.html',
                    controller: "UserListCtrl as ctrl"
                })
                .state('concert', {
                    url: '/addConcert',
                    templateUrl: 'views/partials/concert/addConcert.html',
                    controller: "UserListCtrl as ctrl"
                })
        }])

        .controller('UsersListCtrl', ['$http', UsersListCtrl])
        .controller('AgendaListCtrl', ['$http', AgendaListCtrl])


    function AgendaListCtrl($http) {
        console.log("Ik ben in Agenda");
        var self = this;

        $http.get('/agenda')
            .success(function (data) {
                self.agenda = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data)
            });

        self.foto = false;

        self.fotoAanUit = function () {
            self.foto = !self.foto;
        }
    }

})();
