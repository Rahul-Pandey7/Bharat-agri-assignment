class Protected {
  constructor() {
    this.userAuthenticate = "";
  }

  login(callback) {
    if (localStorage.getItem("name") !== undefined) {
      this.userAuthenticate = true;
      callback();
    } else {
      this.userAuthenticate = false;
    }
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
