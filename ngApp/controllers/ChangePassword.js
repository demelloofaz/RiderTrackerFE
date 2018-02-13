export class ChangePasswordController {
    constructor(AuthService, $http, $mdDialog) {
        this.auth = AuthService;
        this.$http = $http;
        this.Dialog = $mdDialog;
        this.password = '';
        this.confirmingpassword='';
        this.message = '';
      }
  
    changePassword() {
    
    if (this.password == this.confirmingpassword) {
        var request = this.auth.createPasswordChangeRequest( 0, this.password);
        this.$http.post(this.auth.getBaseRiderURL() + '/ChangePassword', request)
        .then(res => {
            this.auth.authenticate(res);
        })
        .catch( res => {
            this.message = "Unable to updated password at this time, try again later."; 
            this.showErrorDialog();
        });
    }
    else
        this.message = 'Passwords do not match!'
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