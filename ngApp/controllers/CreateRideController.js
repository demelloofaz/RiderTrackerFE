export class CreateRideController {
    constructor(RideService, $http, AuthService) {
      this.service = RideService;
      this.$http = $http;
      this.auth = AuthService;
      this.message = '';
      this.service.clearCurrentRideId();
      this.rideName = "";
      this.description= "";
      this.startDate = new Date();
      this.distance;
      this.dateInput;
      this.timeInput;

      // create the minimum date for the date picker
      this.today = new Date();
      var dd = this.today.getDate();
      var mm = this.today.getMonth()+1; //January is 0!
      var yyyy = this.today.getFullYear();
      if(dd<10) {
        dd = '0'+dd
      } 
      if(mm<10) {
        mm = '0'+mm
      } 
      this.today = mm + '/' + dd + '/' + yyyy;
      
    }

    addRide() {
      // verify the date is OK if so the call the add ride endpoint   
      this.startDate.setMinutes(this.timeInput.getMinutes());
      this.startDate.setHours(this.timeInput.getHours());   
      this.startDate.setSeconds(0);  
      this.startDate.getTimezoneOffset(); 

      this.startDate.setDate(this.dateInput.getDate());
      this.startDate.setMonth(this.dateInput.getMonth());
      this.startDate.setFullYear(this.dateInput.getFullYear());

      var request = this.service.getCreateRideRequest(this.rideName, this.description, this.startDate, this.distance);
      this.$http.post(this.auth.getBaseRideURL()  + '/CreateRide', request)
      .then(res => {
         this.goBackToParentView();
      })
      .catch(res => {
          this.message = "Unable to create a ride at this time, try again later";
      });
    }
    goBackToParentView()
    {
      this.service.goBackToParentView();
    }
  }