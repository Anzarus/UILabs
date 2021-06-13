export function authHeader() {
    // return authorization header with jwt token
    let x = localStorage.getItem('user')
    let user = JSON.parse(x);

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}