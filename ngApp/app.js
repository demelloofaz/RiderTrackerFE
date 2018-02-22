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
import {FollowingController} from './controllers/FollowingController';
import {FollowerController} from './controllers/FollowerController';
import {FollowRequestController} from './controllers/FollowRequestController';
import {LocateRiderController} from './controllers/LocateRiderController';
import {NavController} from './controllers/NavController';
import {AuthService} from './services/AuthService';
import {RiderService} from './services/RiderService';
import {RideService} from './services/RideService';
import {SignupService} from './services/SignupService';
import {FollowService} from './services/FollowService';


    angular.module('RiderTracker', 
      [ uirouter, 
        ngResource, 
        uiBootstrap, 
        ngMaterial, 
        ngMessages])
    .service('AuthService', AuthService)
    .service('RiderService',RiderService)
    .service('RideService',RideService)
    .service('SignupService', SignupService)
    .service('FollowService', FollowService)
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
            templateUrl: '/ngApp/views/Login.html',
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
            templateUrl: '/ngApp/views/Admin.html',
            controller: AdminController,
            controllerAs: 'controller'
          })
          .state('AdminRides', {
            url: '/AdminRides',
            templateUrl: '/ngApp/views/AdminRides.html',
            controller: AdminRidesController,
            controllerAs: 'controller'
          })
          .state('Rides', {
            url: '/Rides',
            templateUrl: '/ngApp/views/Rides.html',
            controller: RidesController,
            controllerAs: 'controller'
          })
          .state('MyRides', {
            url: '/MyRides',
            templateUrl: '/ngApp/views/MyRides.html',
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
          .state('Following', {
            url: '/Following',
            templateUrl: '/ngApp/views/Following.html',
            controller: FollowingController,
            controllerAs: 'controller'
          })
          .state('Follower', {
            url: '/Follower',
            templateUrl: '/ngApp/views/Follower.html',
            controller: FollowerController,
            controllerAs: 'controller'
          })
          .state('FollowRequest', {
            url: '/FollowRequest',
            templateUrl: '/ngApp/views/FollowRequest.html',
            controller: FollowRequestController,
            controllerAs: 'controller'
          })
          .state('LocateRider', {
            url: '/LocateRider',
            templateUrl: '/ngApp/views/LocateRider.html',
            controller: LocateRiderController,
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