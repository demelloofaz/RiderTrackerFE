export class FollowRequestController {
    constructor(FollowService, RiderService, $http, AuthService, $location) {
      this.message = 'Hello from Follow Request';
      this.RiderService;
      this.service = FollowService;
      this.$http = $http;
      this.$location= $location;
      this.auth = AuthService;
      this.Following=[];
      this.Unfollowed=[];
      this.Riders=[];
    }
}