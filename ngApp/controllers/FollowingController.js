export class FollowingController {
    constructor(FollowService, $http, AuthService, $location) {
      this.message = 'Hello from Following';
      this.service = FollowService;
      this.$http = $http;
      this.$location= $location;
      this.auth = AuthService;
      this.following=[];
    }
}