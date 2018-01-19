export class RegisterController {
    constructor(AuthService, $http) {
        this.auth = AuthService;
        this.$http = $http;
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
                });
            }
             else { 
                this.message = " Passwords do not match!"
             }
      }
  }