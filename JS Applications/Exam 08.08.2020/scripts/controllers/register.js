import { register as apiRegister} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/user/register.hbs')
    };

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function registerPost(){
    try {
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Password don\'t match');
        }
        if (!this.params.email) {
            throw new Error('Email must be filled');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be atleast 6 characters long');
        }

        const result = await apiRegister(this.params.email, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Successful registration!');

        this.app.userData.email = result.email;
        this.app.userData.userId = result.userId;

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}
