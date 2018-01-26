export class FollowService{
    constructor(AuthService, $location)
    {
        this.auth = AuthService;
        this.$location = $location;
    }

}
FollowService.$inject = ['AuthService', '$location'];