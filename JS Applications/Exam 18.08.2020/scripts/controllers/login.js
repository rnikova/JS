import { login as apiLogin } from '../data.js';

export default async function login(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/user/login.hbs')
    };

    this.partial('./templates/user/login.hbs', this.app.userData);
}

export async function loginPost(){
    try {
        const result = await apiLogin(this.params.email, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.email = result.email;
        this.app.userData.userId = result.userId;
        
        this.redirect('/');
    } catch (err) {
        console.error(err);
    }
}