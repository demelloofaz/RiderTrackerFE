
export class AuthService{

    constructor($http, $location)
    {
        this.$http = $http;
        this.$location = $location;
        //this.BASE_URL = "http://localhost:60944";
        this.BASE_URL = "http://13.56.174.144";
        this.BASE_RIDER_URL = this.BASE_URL + '/Riders';
        this.BASE_RIDES_URL = this.BASE_URL + '/Rides';
        this.BASE_SIGNUPS_URL = this.BASE_URL + '/Signups';
        this.BASE_FOLLOWS_URL = this.BASE_URL + '/Follows';
        this.NAME_KEY = 'name';
        this.TOKEN_KEY = 'token';
        this.CURRENT_ID_KEY = 'currentId';
        this.ROLE_KEY = 'role';
        this.USERNAME_KEY = 'username';
        this.TRACKING_KEY = 'tracking';
        this.BACK_LINK_KEY = 'BackLink';
        this.LON_KEY = "LonKey";
        this.LAT_KEY = "LatKey";
        this.LAST_TAB_KEY = 'lasttab';
    }

    getBaseRiderURL() {
        return this.BASE_RIDER_URL;
    }
    getBaseRideURL() {
        return this.BASE_RIDES_URL;
    }
    getBaseSignupURL() {
        return this.BASE_SIGNUPS_URL;
    }
    getBaseFollowURL() {
        return this.BASE_FOLLOWS_URL;
    }
    getName() {
        return localStorage.getItem(this.NAME_KEY);
    }
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    getTracking() {
        return localStorage.getItem(this.TRACKING_KEY);
    }
    setTracking() {
        localStorage.setItem(this.TRACKING_KEY,'TRACKING');
    }
    clearTracking() {
        localStorage.removeItem(this.TRACKING_KEY);
    }
    getLongitude() {
        return localStorage.getItem(this.LON_KEY);
    }
    setLongitude(value) {
        localStorage.setItem(this.LON_KEY, value);
    }
    clearLongitude() {
        localStorage.removeItem(this.LON_KEY);
    }
    getLatitude() {
        return localStorage.getItem(this.LAT_KEY);
    }
    setLatitude(value) {
        localStorage.setItem(this.LAT_KEY, value);
    }
    clearLatitude() {
        localStorage.removeItem(this.LAT_KEY);
    }
    

    isTrackingMode(){
        var trackingString = this.getTracking();
        if (trackingString == null)
            return false;
        else
            return true;
    }
    getCurrentId() {
        return localStorage.getItem(this.CURRENT_ID_KEY);
    }
    getRole() {
        return localStorage.getItem(this.ROLE_KEY);
    }
    getUserName() {
        return localStorage.getItem(this.USERNAME_KEY);
    }

    setBackLink(backLink){
        localStorage.setItem(this.BACK_LINK_KEY, backLink );
    }
    getBackLink(){
        return localStorage.getItem(this.BACK_LINK_KEY);
    }
    clearBackLink(){
        return localStorage.removeItem(this.BACK_LINK_KEY);
    }

    // tabs data
    getLastTab() {
        var result = localStorage.getItem(this.LAST_TAB_KEY);
        if (result == null)
            return  0;
        return result;
    }
    setLastTab(tab) {
        localStorage.setItem(this.LAST_TAB_KEY,tab);
    }
    clearLastTab() {
        localStorage.removeItem(this.LAST_TAB_KEY);
    }


    
    isAuthenticated(){
        var authString = this.getToken();
        if (authString == null)
            return false;
        else
            return true;
    }

    isAdmin() {
        var result = false;
        var roleString = this.getRole();
        if (roleString != null){
            if (roleString == "Admin")
                result = true;
        }

        return result;
    }
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.CURRENT_ID_KEY);
        localStorage.removeItem(this.ROLE_KEY);
        localStorage.removeItem(this.USERNAME_KEY);
        //redirect
        this.goToPage('/');
        
    }

    // User Profile methods
    createUserProfileUpdateRequest(firstname, lastname, emailaddress, phonenumber)
    {
        var targetid = this.getCurrentId();
        var requestData = this.createProfileUpdateRequest(targetid, firstname, lastname, emailaddress, phonenumber);
        return requestData;
    }

    createAdminProfileUpdateRequest(targetid, firstname, lastname, emailaddress, phonenumber)
    {
        var requestData = this.createProfileUpdateRequest(targetid, firstname, lastname, emailaddress, phonenumber);
        return requestData;
    }

    createProfileUpdateRequest(targetid, firstname, lastname, emailaddress, phonenumber)
    {
        var requestData = {
            targetId : targetid,
            requestingId : this.getCurrentId(),
            authorization : this.getToken(),
            firstName : firstname,
            lastName: lastname,
            emailAddress: emailaddress,
            phoneNumber : phonenumber
        }
        return requestData;
    }

    createRiderUpdateRequest(rider)
    {
        var requestData = {
            targetId : rider.id,
            requestingId : this.getCurrentId(),
            authorization : this.getToken(),
            firstName : rider.firstName,
            lastName: rider.lastName,
            emailAddress: rider.emailAddress,
            phoneNumber : rider.phoneNumber,
            role : rider.role
        }
        return requestData;
    }
    
    // to be moved when we do admin pages...
    adminUpdateProfile(_userid, _firstname, _lastname, _emailaddress, _phonenumber, message) {
        
        var user = {
            requestingId : this.getCurrentId(),
            targetId : userId,
            authorization : this.getToken(),
            firstName : _firstname,
            lastName: _lastname,
            emailAddress: _emailaddress,
            phoneNumber : _phonenumber
        };

        this.$http.post(this.auth.getBaseRiderURL() + '/EditRider', user)
        .then(res => {
            this.authenticate(res);
        })
        .catch(res => {
           message = "Error on admin update profile detected";
        });
    }

    createRegistrationRequest(username, firstname, lastname, emailaddress, phonenumber, password)
    {
        var request = {
            userName : username, 
            firstName : firstname,
            lastName: lastname,
            emailAddress: emailaddress,
            phoneNumber : phonenumber,
            password: password };

        return request;
    }

    createPasswordChangeRequest(targetid, password)
    {
        var request = {
            requestingId : this.getCurrentId(),
            targetId : this.getCurrentId(),
            authorization : this.getToken(),
            password: password };

        if (targetid != 0)
            request.targetId = targetid;

        return request;
    }

    authenticate(res){
        var authResponse = res.data;
        if (!authResponse.authorization)
            return;

        // valid token
        
        localStorage.setItem(this.TOKEN_KEY, authResponse.authorization );
        localStorage.setItem(this.NAME_KEY, authResponse.firstName );
        localStorage.setItem(this.CURRENT_ID_KEY, authResponse.userId );
        localStorage.setItem(this.ROLE_KEY, authResponse.role);
        localStorage.setItem(this.USERNAME_KEY, authResponse.userName);
        localStorage.removeItem(this.TRACKING_KEY);
        
        //redirect
        this.goToPage('/HomeLoggedIn');
    }
    goToPage(location){
        this.$location.path([location]);
    }

}

AuthService.$inject = ['$http', '$location'];