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

export class UserInfoResponse {
  constructor(accountId, email, phone_number, nickname, point, profileImageUrl, userRole,province,sigun,gu) {
    this.accountId = accountId;
    this.email = email;
    this.phone_number = phone_number;
    this.nickname = nickname;
    this.point = point;
    this.profileImageUrl = profileImageUrl;
    this.userRole = userRole;
    this.province = province;
    this.sigun = sigun;
    this.gu = gu;
  }
}