export class AdminChangePasswordController {
    constructor(AuthService, $http, $location, RiderService) {
        this.auth = AuthService;
        this.$http = $http;
        this.$location = $location;
        this.service = RiderService;
        this.password = '';
        this.confirmingpassword='';
        this.message = '';
        this.currentRiderId = this.service.getCurrentRiderId();
      }
  
      changePassword() {  
        if (this.password == this.confirmingpassword) {
            var request = this.auth.createPasswordChangeRequest( this.currentRiderId, this.password);
            this.$http.post(this.auth.getBaseRiderURL() + '/ChangePassword', request)
            .then(res => {
                this.$location.path(['/EditRider']);
            })
            .catch( res => {
                this.message = "Unable to updated password at this time, try again later."; 
            });
        }
        else
            this.message = 'Passwords do not match!'
      }
  }