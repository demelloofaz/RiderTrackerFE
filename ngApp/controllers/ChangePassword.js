export class ChangePasswordController {
    constructor(AuthService, $http) {
        this.auth = AuthService;
        this.$http = $http;
        this.password = '';
        this.confirmingpassword='';
        this.message = '';
      }
  
      changePassword() {
        debugger;
        if (this.password == this.confirmingpassword) {
            var request = this.auth.createPasswordChangeRequest( 0, this.password);
            this.$http.post(this.auth.getBaseRiderURL() + '/ChangePassword', request)
            .then(res => {
                this.auth.authenticate(res);
            })
            .catch( res => {
                this.message = "Unable to updated password at this time, try again later."; 
            });
        }
        else
            this.message = 'Passwords do not match!'
      }
  }