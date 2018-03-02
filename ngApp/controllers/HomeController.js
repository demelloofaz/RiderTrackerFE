export class HomeController {
    constructor(AuthService) {
      this.auth = AuthService;
      if (this.auth.isAuthenticated())
        this.auth.goToPage('/HomeLoggedIn');
        
      this.message = 'Daves hello world';
    }
  }