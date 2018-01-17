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
  }