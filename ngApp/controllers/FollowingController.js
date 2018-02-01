export class FollowingController {
    constructor(FollowService, RiderService,  $http, AuthService, $location) {
      this.message = 'Hello from Following';
      this.FollowService = FollowService;
      this.RiderService = RiderService;
      this.$http = $http;
      this.$location= $location;
      this.auth = AuthService;
      this.riderInfo=[];
      this.followingIds=[];
      this.followings=[];
      this.FollowService.clearCurrentFollowerId();
      this.FollowService.clearCurrentFollowingId();
      debugger;
      var ridersRequestString = this.RiderService.getAllRidersInfoRequestString();
      // Needto get all the riders.
      this.$http.get(ridersRequestString)
      .then(res => {  
          this.riderInfo = res.data;
          this.message = "Success - Got the rider info"
          var followRequestString = this.FollowService.getMyFollowingsRequestString();
    
          this.$http.get(followRequestString)
          .then(res => {  
            this.followingIds = res.data;
            this.message = "Success - Got my followings"
            this.createMyFollowingList();
          })
          .catch(res => {
            this.message = "Error in getting my followings";
          });
      })
      .catch(res => {
          this.message = "Error in getting rider info.";
      });

    }
    createMyFollowingList(){
      this.followings = [];
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        if (this.alreadyFollowing(currentId))
          this.followings.push(this.riderInfo[i]);
      }
    }

    alreadyFollowing(riderID)
    {
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderID){
          return true;
        }
      }
      return false;
    }
    followingAllowed(riderid) {
      return true;
    }
    removeFollowing(riderId){
      var targetId = 0;
      var targetLoc = -1;
      // find the target follow and remove it from the followerIds list
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderId){
          targetId = this.followingIds[i].followID;
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
            this.followingIds.splice(targetLoc,1);
            this.createMyFollowingList();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Ride Data at this time.";
        });
    }
    locate(riderId){
      debugger;
      this.FollowService.setCurrentFollowingId(riderId);
      this.$location.path(['/LocateRider'])
    }
}