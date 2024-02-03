class User {
    static allUsers = [];
  
    constructor(name, password, image) {
      this.name = name;
      this.password = password;
      this.image = image;
  
      // Add the new user to the global array
      User.allUsers.push(this);
    }
  }
  
  export default User;