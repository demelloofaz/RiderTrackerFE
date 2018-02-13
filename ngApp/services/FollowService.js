export class FollowService{
    constructor(AuthService, $location)
    {
        this.auth = AuthService;
        this.$location = $location;
        this.CURRENT_FOLLOWER_KEY = 'CurrentFollower';
        this.CURRENT_FOLLOWING_KEY = 'CurrentFollower';

    }

    getMyFollowersRequestString() {
        var result = this.auth.getBaseFollowURL();
        result += "/GetMyFollowers?RequestingId=";
        result += this.auth.getCurrentId();
        result += "&FollowingId=";
        result += this.auth.getCurrentId();
        result += "&Authorization=";
        result += this.auth.getToken();
        return result;
    }
    getMyFollowingsRequestString() {
        var result = this.auth.getBaseFollowURL();
        result += "/GetMyFollowing?RequestingId=";
        result += this.auth.getCurrentId();
        result += "&FollowerId=";
        result += this.auth.getCurrentId();
        result += "&Authorization=";
        result += this.auth.getToken();
        return result;
    }
    getDeleteFollowUrlString() {
        var result = this.auth.getBaseFollowURL();
        result += "/DeleteFollowbyId";
        return result;
    }
    createFollowRequest(riderId) {
        var requestData = {
            requestingId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            followerId: this.auth.getCurrentId(),
            followingId: riderId
        }
        return requestData;
    }
    getUpdateFollowStateUrlString() {
        var result = this.auth.getBaseFollowURL();
        result += "/EditFollow";
        return result;
    }
    createUpdateFollowerRequest(riderId, status) {
        var requestData = {
            requestingId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            followingId: this.auth.getCurrentId(),
            followerId: riderId,
            State : status
        }
        return requestData;
    }
    createUpdateFollowingRequest(riderId, status) {
        var requestData = {
            requestingId : this.auth.getCurrentId(),
            authorization: this.auth.getToken(),
            followerId: this.auth.getCurrentId(),
            followingId: riderId,
            State : status
        }
        return requestData;
    }

    clearCurrentFollowerId() {
        localStorage.removeItem(this.CURRENT_FOLLOWER_KEY);
    }
    setCurrentFollowerId(id){
        localStorage.setItem(this.CURRENT_FOLLOWER_KEY, id );
    }
    getCurrentFollowerId(){
        return localStorage.getItem(this.CURRENT_FOLLOWER_KEY);
    }
    clearCurrentFollowingId() {
        localStorage.removeItem(this.CURRENT_FOLLOWING_KEY);
    }
    setCurrentFollowingId(id){
        localStorage.setItem(this.CURRENT_FOLLOWING_KEY, id );
    }
    getCurrentFollowingId(){
        return localStorage.getItem(this.CURRENT_FOLLOWING_KEY);
    }
    routeToView( newDest, backLink){
        this.auth.setBackLink(backLink);
        this.$location.path([newDest]);
    }
    goBackToParentView() {
        var previousView = this.auth.getBackLink();
        this.auth.clearBackLink();
        this.$location.path([previousView]);
    }
    clearBackLink() {
        this.auth.clearBackLink();
    }

}
FollowService.$inject = ['AuthService', '$location'];