
export class LoginController {

    constructor(AuthService, $http ) {
      this.auth = AuthService;
      this.$http = $http;
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
            debugger;
            if (res.status == 404)
                this.message = "Invalid Username or Password provided";
            else
                this.message = "Unable to login at this time try again later";
        });
    }
  }