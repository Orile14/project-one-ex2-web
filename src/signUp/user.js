class User {
    static allUsers = [];
    constructor(name, NickName, password, image) {
      this.name = name;
    this.NickName = NickName;
      this.password = password;
      this.image = image;
      User.allUsers.push(this);
    }
     getNickName() {
      return this.NickName;
    }
    getImage() {
      return this.image;
    }
  }
  
  export default User;