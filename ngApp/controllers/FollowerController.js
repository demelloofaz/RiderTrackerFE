export class FollowerController {
    constructor(FollowService, RiderService, $http, AuthService, $location) {
      this.message = 'Hello from Follower';
      this.FollowService = FollowService;
      this.RiderService = RiderService;
      this.$http = $http;
      this.$location= $location;
      this.auth = AuthService;
      this.riderInfo=[];
      this.followerIds=[];
      this.followers=[];
      this.FollowService.clearCurrentFollowerId();
      this.FollowService.clearCurrentFollowingId();

      var ridersRequestString = this.RiderService.getAllRidersInfoRequestString();
  
      debugger;

      // Needto get all the riders.
      this.$http.get(ridersRequestString)
      .then(res => {  
          this.riderInfo = res.data;
          this.message = "Success - Got the rider info"
          var followRequestString = this.FollowService.getMyFollowersRequestString();
    
          this.$http.get(followRequestString)
          .then(res => {  
            this.followerIds = res.data;
            this.message = "Success - Got my followers"
            this.createMyFollowerList();
          })
          .catch(res => {
            this.message = "Error in getting my followers";
          });
      })
      .catch(res => {
          this.message = "Error in getting rider info.";
      });

    }
    createMyFollowerList(){
      this.followers=[];
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        if (this.isAFollower(currentId))
          this.followers.push(this.riderInfo[i]);
      }
    }

    isAFollower(riderID)
    {
      for (var i = 0; i < this.followerIds.length; i++){
        if (this.followerIds[i].followerID == riderID){
          return true;
        }
      }
      return false;
    }
    removeFollower(riderId)
    {
      var targetId = 0;
      var targetLoc = -1;
      // find the target follow and remove it from the followerIds list
      for (var i = 0; i < this.followerIds.length; i++){
        if (this.followerIds[i].followerID == riderId){
          targetId = this.followerIds[i].followID;
          targetLoc = i;
          break;
        }
      }
      // then send a request to remove it from the database
      if (targetId == 0)
        return;
      var requestString = this.FollowService.getDeleteFollowUrlString();
      // do the delete request...
      this.$http({
        method: 'DELETE',
        url: requestString,
        data: {
            requestingId : this.auth.getCurrentId(),
            authorization : this.auth.getToken(),
            followId : targetId
        },
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }})
        .then( (res) => {
            this.followerIds.splice(targetLoc,1);
            this.createMyFollowerList();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Ride Data at this time.";
        });

    }
}