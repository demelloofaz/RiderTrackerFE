export class FollowingController {
    constructor(FollowService, RiderService,  $http, AuthService, $mdDialog) {
      this.message = 'Hello from Following';
      this.FollowService = FollowService;
      this.RiderService = RiderService;
      this.$http = $http;
      this.auth = AuthService;
      this.Dialog = $mdDialog;
      this.riderInfo=[];
      this.followingIds=[];
      this.followings=[];
      this.FollowService.clearCurrentFollowerId();
      this.FollowService.clearCurrentFollowingId();
      this.FollowService.clearBackLink();
      this.myView = "/Following";
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
            this.showErrorDialog();
          });
      })
      .catch(res => {
          this.message = "Error in getting rider info.";
          this.showErrorDialog();
      });

    }
    createMyFollowingList(){
      this.followings = [];
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        if (this.alreadyFollowing(currentId)){
          this.riderInfo[i].statusString =  this.getFollowingStatusString(currentId);
          this.followings.push(this.riderInfo[i]);
        }
      }
    }

    alreadyFollowing(riderId)
    {
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderId){
          if (this.followingIds[i].followState < 3) {
            return true;
          }
        }
      }
      return false;
    }
    getFollowingStatusString(riderId){
      var result = "        ";
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderId) {
          if (this.followingIds[i].followState == 0)
            result = "Pending";
          else if (this.followingIds[i].followState == 2)
            result = "Declined";
        }
      }
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
            this.createMyFollowingList();
           })
        .catch( (res) => {
            this.message = "Unable to Delete Ride Data at this time.";
            this.showErrorDialog();
        });
    }
    locate(riderId){
      this.FollowService.setCurrentFollowingId(riderId);
      this.FollowService.routeToView("/LocateRider", this.myView);
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