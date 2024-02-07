class User {
    static allUsers = [];
    constructor(name, password, image) {
      this.name = name;
      this.password = password;
      this.image = image;
      User.allUsers.push(this);
    }
     getName() {
      return this.name;
    }
  }
  
  export default User;