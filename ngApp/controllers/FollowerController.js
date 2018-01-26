export class FollowerController {
    constructor(FollowService, $http, AuthService, $location) {
      this.message = 'Hello from Follower';
      this.service = FollowService;
      this.$http = $http;
      this.$location= $location;
      this.auth = AuthService;
      this.followers = [];
    }
}