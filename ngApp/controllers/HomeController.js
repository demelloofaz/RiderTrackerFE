export class HomeController {
    constructor(AuthService, $location) {
      this.auth = AuthService;
      this.$location = $location;
      if (this.auth.isAuthenticated())
        this.$location.path(['/HomeLoggedIn']);
        
      this.message = 'Daves hello world';
    }
  }