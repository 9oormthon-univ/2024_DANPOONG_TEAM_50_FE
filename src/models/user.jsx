export class SigninRequest{
    constructor(email, password) {
      this.email = email;
      this.password = password;
      }
  }
  
  export class SigninResponse{
    constructor(accountId, userRole, accessToken, refreshToken) {
        this.accountId = accountId;
        this.userRole = userRole;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
  }