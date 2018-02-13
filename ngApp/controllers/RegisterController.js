export class RegisterController {
    constructor(AuthService, $http, $mdDialog) {
        this.auth = AuthService;
        this.$http = $http;
        this.Dialog = $mdDialog
        this.message = '';
        this.username = '';
        this.firstname = '';
        this.lastname = '';
        this.emailaddress = '';
        this.phonenumber = '';
        this.password = '';
        this.confirmingpassword='';
      }
  
      // Register a new user
      register() {
          if (this.password == this.confirmingpassword){
             //this.auth.register(this.username, this.firstname, this.lastname, this.emailaddress, this.phonenumber, this.password, this.message);
             var regRequest = this.auth.createRegistrationRequest(this.username, this.firstname, this.lastname, this.emailaddress, 
                this.phonenumber, this.password );
        
            this.$http.post(this.auth.getBaseRiderURL()  + '/register', regRequest)
                .then(res => {
                    this.auth.authenticate(res);
                })
                .catch(res => {
                    if (res.status == 401)
                        this.message = "Username already in use, try a different username.";
                    else
                        this.message = "Unable to register at this time, try again later";
                    this.showErrorDialog();
                }
            );
            }
             else { 
                this.message = " Passwords do not match!"
                this.showErrorDialog();
             }
      }
      
      showErrorDialog(){
          // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      this.Dialog.show(
        this.Dialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Error on Registration')
          .textContent(this.message)
          .ariaLabel('Registration Error')
          .ok('OK')
      );
      }
  }