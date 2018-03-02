export class NavController {
    constructor(AuthService) {
      this.message = 'hello world';
      this.auth = AuthService;
    }
     isAdmin(){
          if (this.auth.isAdmin()){
            return true;
          }
          return false;

     }

     isAuthenticated(){
        if (this.auth.isAuthenticated()) {
            return true;
          }
          return false;
     }
     getName() {
         return this.auth.getName();
     }
     getCurrentUserId() {
         return this.auth.getId();
     }

     logout() {
        this.auth.logout();
     }
     isTrackingMode(){
        return  this.auth.isTrackingMode();
     }
     showNormalMode()
     {
         if (!this.isTrackingMode()){
            if (this.isAuthenticated())
                return true;
         }
         return false;
        
     }
     goToPage(page){
         this.auth.clearLastTab();
         this.auth.goToPage(page);
     }
  }