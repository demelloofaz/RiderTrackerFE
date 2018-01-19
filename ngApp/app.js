import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import uiBootstrap from 'angular-bootstrap-npm';
import {HomeController} from './controllers/HomeController';
import {HomeLoggedInController} from './controllers/HomeLoggedInController';
import {LoginController} from './controllers/LoginController';
import {RegisterController} from './controllers/RegisterController';
import {ProfileController} from './controllers/ProfileController';
import {ChangePasswordController} from './controllers/ChangePassword';
import {AdminChangePasswordController} from './controllers/AdminChangePassword';
import {AdminController} from './controllers/AdminController';
import {AdminRidesController} from './controllers/AdminRidesController';
import {RidesController} from './controllers/RidesController';
import {MyRidesController} from './controllers/MyRidesController';
import {CreateRideController} from './controllers/CreateRideController';
import {EditRideController} from './controllers/EditRideController';
import {DeleteRideController} from './controllers/DeleteRideController';
import {RideDetailsController} from './controllers/RideDetailsController';
import {CreateRiderController} from './controllers/CreateRiderController';
import {EditRiderController} from './controllers/EditRiderController';
import {DeleteRiderController} from './controllers/DeleteRiderController';
import {RiderDetailsController} from './controllers/RiderDetailsController';
import {RideSignupController} from './controllers/RideSignupController';
import {NavController} from './controllers/NavController';
import {AuthService} from './services/AuthService';
import {RiderService} from './services/RiderService';
import {RideService} from './services/RideService';


    angular.module('RiderTracker', 
      [ uirouter, 
        ngResource, 
        uiBootstrap, 
        ngMaterial, 
        ngMessages])
    .service('AuthService', AuthService)
    .service('RiderService',RiderService)
    .service('RideService',RideService)
    .config(routing);

    routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function routing($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('Home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: HomeController,
            controllerAs: 'controller'
          })
          .state('HomeLoggedIn', {
            url: '/HomeLoggedIn',
            templateUrl: '/ngApp/views/HomeLoggedIn.html',
            controller: HomeLoggedInController,
            controllerAs: 'controller'
          })
          .state('Login', {
            url: '/Login',
            templateUrl: '/ngApp/views/login.html',
            controller: LoginController,
            controllerAs: 'controller'
          })
          .state('Register', {
            url: '/Register',
            templateUrl: '/ngApp/views/Register.html',
            controller: RegisterController,
            controllerAs: 'controller'
          })
          .state('Profile', {
            url: '/Profile',
            templateUrl: '/ngApp/views/profile.html',
            controller: ProfileController,
            controllerAs: 'controller'
          })
          .state('Admin', {
            url: '/Admin',
            templateUrl: '/ngApp/views/admin.html',
            controller: AdminController,
            controllerAs: 'controller'
          })
          .state('AdminRides', {
            url: '/AdminRides',
            templateUrl: '/ngApp/views/adminRides.html',
            controller: AdminRidesController,
            controllerAs: 'controller'
          })
          .state('Rides', {
            url: '/Rides',
            templateUrl: '/ngApp/views/rides.html',
            controller: RidesController,
            controllerAs: 'controller'
          })
          .state('MyRides', {
            url: '/MyRides',
            templateUrl: '/ngApp/views/Myrides.html',
            controller: MyRidesController,
            controllerAs: 'controller'
          })
          .state('CreateRide', {
            url: '/CreateRide',
            templateUrl: '/ngApp/views/CreateRide.html',
            controller: CreateRideController,
            controllerAs: 'controller'
          })
          .state('EditRide', {
            url: '/EditRide',
            templateUrl: '/ngApp/views/EditRide.html',
            controller: EditRideController,
            controllerAs: 'controller'
          })
          .state('DeleteRide', {
            url: '/DeleteRide',
            templateUrl: '/ngApp/views/DeleteRide.html',
            controller: DeleteRideController,
            controllerAs: 'controller'
          })
          .state('RideDetails', {
            url: '/RideDetails',
            templateUrl: '/ngApp/views/RideDetails.html',
            controller: RideDetailsController,
            controllerAs: 'controller'
          })
          .state('CreateRider', {
            url: '/CreateRider',
            templateUrl: '/ngApp/views/CreateRider.html',
            controller: CreateRiderController,
            controllerAs: 'controller'
          })
          .state('EditRider', {
            url: '/EditRider',
            templateUrl: '/ngApp/views/EditRider.html',
            controller: EditRiderController,
            controllerAs: 'controller'
          })
          .state('DeleteRider', {
            url: '/DeleteRider',
            templateUrl: '/ngApp/views/DeleteRider.html',
            controller: DeleteRiderController,
            controllerAs: 'controller'
          })
          .state('RiderDetails', {
            url: '/RiderDetails',
            templateUrl: '/ngApp/views/RiderDetails.html',
            controller: RiderDetailsController,
            controllerAs: 'controller'
          })
          .state('RideSignup', {
            url: '/RideSignup',
            templateUrl: '/ngApp/views/RideSignup.html',
            controller: RideSignupController,
            controllerAs: 'controller'
          })
          .state('ChangePassword', {
            url: '/ChangePassword',
            templateUrl: '/ngApp/views/ChangePassword.html',
            controller: ChangePasswordController,
            controllerAs: 'controller'
          })
          .state('AdminChangePassword', {
            url: '/AdminChangePassword',
            templateUrl: '/ngApp/views/AdminChangePassword.html',
            controller: AdminChangePasswordController,
            controllerAs: 'controller'
          })
          .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
          });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    }

    angular.module('RiderTracker').controller('navController', NavController);