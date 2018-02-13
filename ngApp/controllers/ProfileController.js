export class ProfileController {

    constructor(AuthService, $http, $mdDialog) {
        this.auth = AuthService;
        this.$http = $http;
        this.Dialog = $mdDialog;
        this.message = '';
        this.lastname = '';
        this.firstname = '';
        this.userid = 0;
        this.emailaddress = '';
        this.phonenumber = '';
        
        // create the url string
        var requestString = this.auth.getBaseRiderURL()  + 
            '/GetRider?RequestingId=' + 
            this.auth.getCurrentId() + 
            '&TargetId=' + 
            this.auth.getCurrentId() +
            '&Authorization=' + 
            this.auth.getToken();
        
        // make the http get request
        this.$http.get(requestString)
        .then( (res) => {
            this.username = res.data.userName;
            this.lastname = res.data.lastName;
            this.firstname = res.data.firstName;
            this.userid = res.data.id;
            this.emailaddress = res.data.emailAddress;
            this.phonenumber = res.data.phoneNumber;
            }).
        catch( (res) => {
            this.message = "Unable to Get Data at this time.";
            this.showErrorDialog();
        });
    }

    updateProfile() {

    //create request
    var requestData  = this.auth.createUserProfileUpdateRequest(this.firstname,this.lastname,this.emailaddress,this.phonenumber);
    this.message = "";
    this.$http.post(this.this.auth.getBaseRiderURL()  + '/EditRider', requestData)
    .then(res => {
        //redirect
        this.auth.authenticate(res);
    }).catch(res => {
        this.message = "Unable to update profile at this time, try again later";
        this.showErrorDialog();
    });
    }

    isAdmin(){
    if (this.auth.isAdmin()){
        return true;
    }
    return false;
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