export class AuthReponse {
    token: string;
    username: string;
    email: string;

    constructor(token: string, username: string, email: string) {
        this.token = token;
        this.username = username;
        this.email = email;
    }
}