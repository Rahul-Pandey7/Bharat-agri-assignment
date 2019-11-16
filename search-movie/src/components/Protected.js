class Protected {
  constructor() {
    this.userAuthenticate = false;
  }

  login(callback) {
    this.userAuthenticate = true;
    callback();
  }

  logout(callback) {
    this.userAuthenticate = false;
    callback();
  }

  isUserAuthenticated() {
    return this.userAuthenticate;
  }
}
export default new Protected();
