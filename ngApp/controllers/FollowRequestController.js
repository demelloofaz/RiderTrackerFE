export class FollowRequestController {
    constructor(FollowService, RiderService, $http, AuthService, $mdDialog) {
      this.message = 'Hello from Follow Request';
      this.RiderService = RiderService;
      this.FollowService = FollowService;
      this.$http = $http;
      this.auth = AuthService;
      this.Dialog = $mdDialog;
      this.followingIds=[];
      this.unfollowed=[];
      this.riderInfo=[];
      this.FollowService.clearCurrentFollowerId();
      this.FollowService.clearCurrentFollowingId();

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
            this.createUnfollowedList();
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
    createUnfollowedList(){
      for (var i = 0; i < this.riderInfo.length; i++) {
        var currentId = this.riderInfo[i].riderId;
        if (currentId != this.auth.getCurrentId() && currentId != 1) {
          if (!this.alreadyFollowing(currentId))
            this.unfollowed.push(this.riderInfo[i]);
        }
      }
    }

    alreadyFollowing(riderId)
    {
      for (var i = 0; i < this.followingIds.length; i++){
        if (this.followingIds[i].followingID == riderId){
          return true;
        }
      }
      return false;
    }
    requestToFollow(riderId) {
      var request = this.FollowService.createFollowRequest(riderId);
      this.$http.post(this.auth.getBaseFollowURL()  + '/CreateFollow', request)
      .then(res => {
         var newFollow = res.data;
         this.updateFollowingData(newFollow);
      })
      .catch(res => {
          this.message = "Unable to follow at this time, try again later";
          this.showErrorDialog();
      });

    }
    updateFollowingData(newFollow){
      // need to add the rider id to the following list
      this.followingIds.push(newFollow);
      this.unfollowed=[];
      this.createUnfollowedList();
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