
export class LoginController {

    constructor(AuthService, $http, $mdDialog ) {
      this.auth = AuthService;
      this.$http = $http;
      this.Dialog = $mdDialog;
      this.message = '';
      this.username = '';
      this.password = '';
    }

    login() {
        // create a loginData object.
        var loginData = {userName : this.username, password: this.password};
        this.$http.post(this.auth.getBaseRiderURL() + '/login', loginData)
        .then(res => {
            this.auth.authenticate(res);
        })
        .catch(res => {
            if (res.status == 404)
                this.message = "Invalid Username or Password provided";
            else
                this.message = "Unable to login at this time try again later";
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
            .title('Error on Login')
            .textContent(this.message)
            .ariaLabel('Login Error')
            .ok('OK')
        );
    }
}