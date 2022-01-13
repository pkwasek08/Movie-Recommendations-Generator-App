export class User {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    constructor(id: number, login: string, firstname: string, lastname: string, email: string, password: string) {
        this.id = id;
        this.login = login;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}
