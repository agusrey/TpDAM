class User {
    constructor(id, name, email, isLogged) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.isLogged = isLogged;
    }
    printInfo() {
        console.log(this.name + " - " + this.isLogged);
    }
    setIsLogged(isLogged) {
        this.isLogged = isLogged;
    }
    getIsLogged() {
        return this.isLogged;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
}
