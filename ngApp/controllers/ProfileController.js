export class ProfileController {

    constructor(AuthService, $http) {
        this.auth = AuthService;
        this.$http = $http;
        this.message = '';
        this.lastname = '';
        this.firstname = '';
        this.userid = 0;
        this.emailaddress = '';
        this.phonenumber = '';

        debugger;
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
            debugger;
            this.username = res.data.userName;
            this.lastname = res.data.lastName;
            this.firstname = res.data.firstName;
            this.userid = res.data.id;
            this.emailaddress = res.data.emailAddress;
            this.phonenumber = res.data.phoneNumber;
            }).
            catch( (res) => {
                this.message = "Unable to Get Data at this time.";
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
        });
      }
  }