export class FollowController {
    constructor(FollowService, RiderService, $http, AuthService,  $mdDialog) {
      this.message = 'Hello from Follow';
      this.FollowService = FollowService;
      this.RiderService = RiderService;
      this.$http = $http;
      this.auth = AuthService;
      this.Dialog = $mdDialog;
      this.selectedTab = this.auth.getLastTab();
      this.auth.clearLastTab();
      this.riderInfo=[];
      this.followerIds=[];
      this.followers=[];
      this.FollowService.clearCurrentFollowerId();
      this.FollowService.clearCurrentFollowingId();
      this.followings=[];
      this.unfollowed=[];
      this.FollowService.clearBackLink();
      this.myView = "/Following";      

      var ridersRequestString = this.RiderService.getAllRidersInfoRequestString();
      // Needto get all the riders.
      this.$http.get(ridersRequestString)
      .then(res => {  
          this.riderInfo = res.data;
          this.message = "Success - Got the rider info"
          var followRequestString = this.FollowService.getMyFollowersRequestString();
    
          // Followers...
          this.$http.get(followRequestString)
          .then(res => {  
            this.followerIds = res.data;
            this.message = "Success - Got my followers"
            this.createMyFollowerList();

            // Following 
            var followRequestString = this.FollowService.getMyFollowingsRequestString();
    
            this.$http.get(followRequestString)
            .then(res => {  
              this.followingIds = res.data;
              this.message = "Success - Got my followings"
              this.createMyFollowingLists();
              console.log(this.unfollowed);
            })
            .catch(res => {
              this.message = "Error in getting my followings";
              this.showErrorDialog();
            });
          })
          .catch(res => {
            this.message = "Error in getting my followers";
            this.showErrorDialog();
          });
      })
      .catch(res => {
          this.message = "Error in getting rider info.";
          this.showErrorDialog();
      });

    }

    createMyFollowerList(){
      this.followers=[];
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        var state = this.getFollowerState(currentId);
        if (state > -1 && state < 2) {
          this.riderInfo[i].followerStatus = this.getFollowerStatusString(state);
          this.followers.push(this.riderInfo[i]);
        }
      }
    }

    getFollowerState(riderId)
    {
      for (var i = 0; i < this.followerIds.length; i++){
        if (this.followerIds[i].followerID == riderId) {
          return this.followerIds[i].followState; 
        }
      }
      return -1;
    }
    getFollowerStatusString(state){
      var result = "        ";
      if (state == 0)
            result = "Requested";
      return result;
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
            this.showErrorDialog();
        });

    }

    isPending (riderId){
      for (var i = 0; i < this.followerIds.length; i++) 
      {
        if (this.followerIds[i].followerID == riderId) {
          if (this.followerIds[i].followState == 0) {
            return true;
          }
          else
            return false;
        }
      }
      return false;
    }

    updateFollowRequest(riderId, status) {
      var requestString = this.FollowService.getUpdateFollowStateUrlString();
      var requestData = this.FollowService.createUpdateFollowerRequest(status);
      // do the delete request...
      this.$http.post(requestString , requestData)
        .then( (res) => {
            this.message = "Follow status updated";
           })
        .catch( (res) => {
            this.message = "Unable to update follow status at this time.";
            this.showErrorDialog();
        });
    }

    createMyFollowingLists(){
      this.followings = [];
      this.unfollowed = [];
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        if ( (currentId != 1)  && (currentId != this.auth.getCurrentId())) { // skip the admin and yourself 
          var state = this.getFollowingState(currentId);
          if (state == -1)  // not found.. So add to unfollowed list.
             this.unfollowed.push(this.riderInfo[i]);
          else if (state < 3) { // found and not blocked add to following list
            this.riderInfo[i].followingStatus =  this.getFollowingStatusString(state);
            this.followings.push(this.riderInfo[i]);
          }
        }
      }
    }
    getFollowingState(riderId) {
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderId){
          return this.followingIds[i].followState;
          }
        }
      return -1; // not found...
    }

    getFollowingStatusString(followState){
      var result = "        ";
      if (followState == 0)
          result = "Pending";
      else if (followState == 2)
          result = "Declined";
      return result;
    }
     updateFollowingRequest(riderId, status) {
      var requestString = this.FollowService.getUpdateFollowStateUrlString();
      var requestData = this.FollowService.createUpdateFollowingRequest(status);
      // do the delete request...
      this.$http.post(requestString , requestData)
        .then( (res) => {
            this.message = "Follow status updated";
           })
        .catch( (res) => {
            this.message = "Unable to update follow status at this time.";
            this.showErrorDialog();
        });
    }
    isAllowed (riderId){
      for (var i = 0; i < this.followingIds.length; i++) 
      {
        if (this.followingIds[i].followingID == riderId) {
          if (this.followingIds[i].followState == 1)
            return true;
          else
            return false;
        }
      }
      return false;
    }

    removeFollowing(riderId){
      var targetId = 0;
      var targetLoc = -1;
      // find the target follow and remove it from the followingIds list
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
            this.createMyFollowingLists();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Ride Data at this time.";
            this.showErrorDialog();
        });
    }

    locate(riderId){
      this.selectedTab = 1;
      this.auth.setLastTab(this.selectedTab);
      this.FollowService.setCurrentFollowingId(riderId);
      this.FollowService.routeToView("/LocateRider", this.myView);
    }

    //Follow Request
    requestToFollow(riderId) {
      var request = this.FollowService.createFollowRequest(riderId);
      this.$http.post(this.auth.getBaseFollowURL()  + '/CreateFollow', request)
      .then(res => {
         var newFollow = res.data;
         this.followingIds.push(newFollow);
         this.createMyFollowingLists();  
      })
      .catch(res => {
          this.message = "Unable to follow at this time, try again later";
          this.showErrorDialog();
      });

    }


    showErrorDialog(){
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      this.Dialog.show(
      this.Dialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Server Error')
          .textContent(this.message)
          .ariaLabel('Server Error')
          .ok('OK')
      );
  }
}