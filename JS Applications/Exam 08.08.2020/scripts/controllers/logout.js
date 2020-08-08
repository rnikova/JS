import { logout as apiLogout } from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function logout(){
    try{
        const result = await apiLogout();
        
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.email = '';
        this.app.userData.userId = '';
        
        showInfo('Successful logout');

        this.redirect('#/login');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}