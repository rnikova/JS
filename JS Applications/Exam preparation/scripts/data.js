import { beginRequest, endRequest } from './notification.js';

function host(endpoint) {
    return `https://api.backendless.com/FB1B712F-0CB2-021B-FF60-98B031660000/BCE5C77D-07A4-4A0C-8B65-A6E2EF8C20C8/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    RECIPES: 'data/recipes',
    RECIPE_BY_ID: 'data/recipes/'
}

export async function register(username, password) {
    beginRequest();

    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    endRequest();

    return result;
}

export async function login(username, password) {
    beginRequest();

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    endRequest();

    return result;
}

export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();

    return result;
}

export async function allRecipes() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    let result = (await fetch(host(endpoints.RECIPES), {
            headers: {
                'user-token': token
            }
        })).json();

    endRequest();

    return result;
}

export async function create(recipe) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.RECIPES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(recipe)
    })).json();

    endRequest();

    return result;
}

export async function getRecipeById(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.RECIPE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

export async function edit(id, updatedProps) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.RECIPE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();

    return result;
}

export async function deleteRecipe(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.RECIPE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

export async function likes(recipe) {
    const newLikes = recipe.likes + 1;
    const recipeId = recipe.objectId;

    return edit(recipeId, { likes: newLikes });
}