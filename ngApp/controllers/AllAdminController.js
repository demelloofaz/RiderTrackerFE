export class AllAdminController {
    constructor(AuthService, RideService) {
      this.auth = AuthService;
      this.service = RideService;
      this.message = '';
      this.myView = "/AllAdmin";
      this.service.clearCurrentRideId();
      this.service.clearBackLink();
      this.selectedTab = this.auth.getLastTab();
      this.auth.clearLastTab();
    }

    goToPage(page){
        this.auth.goToPage(page);
    }
}