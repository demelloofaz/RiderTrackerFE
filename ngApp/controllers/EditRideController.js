export class EditRideController {
    constructor(RideService, $http, AuthService) {
      this.message = '';
      this.service = RideService;
      this.auth = AuthService;
      this.$http = $http;
      this.rideId = this.service.getCurrentRideId();
      this.ride = [];
      this.dateInput = "";
      this.timeInput=null;

      // create the url string
      var requestString = this.service.getRideRequest(this.rideId);

      // make the http get request
      this.$http.get(requestString)
      .then( (res) => {
          this.ride = res.data;
          this.getTimeData();
      })
      .catch( (res) => {
          this.message = "Unable to Get Ride Data at this time.";
          return;
      });
    }

    getTimeData(){

      this.timeInput = new Date(this.ride.startDate);
      this.timeInput.setMilliseconds(0);
      this.timeInput.setSeconds(0);
      
      //parse out the date string as the date picker needs a string
      var day = this.timeInput.getDate();
      var month = this.timeInput.getMonth() + 1;
      var year = this.timeInput.getFullYear();
      if (day < 10)
        day = "0" + day;
      this.dateInput = month +"/" + day + "/" + year;
    }
    editRide() {
      // create the url string
      
      var request = this.service.getEditRideRequest(
        this.rideId, 
        this.ride.rideName, 
        this.ride.description, 
        this.ride.startDate, 
        this.ride.distance);
        
      var urlString = this.auth.getBaseRideURL()  + '/EditRide';
     
      // make the http get request
      this.$http.post(urlString, request)
      .then( (res) => {
            this.goBackToParentView();
           })
      .catch( (res) => {
            this.message = "Unable to Update Ride Data at this time.";
        });
    }

    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }