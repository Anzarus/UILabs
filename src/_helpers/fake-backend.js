// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
let shortcutBackend = "my-fake-shorcuts.com/" //hosting shortcuts in vue app itself is not viable   


export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);
                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });
                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            sex: user.sex,
                            birthdate: user.birthdate,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);
                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }
                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                let filteredShortcuts = shortcuts.filter(shortcut => {
                                    return shortcut.user !== id;
                                });
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                localStorage.setItem('shortcuts', JSON.stringify(filteredShortcuts));
                                break;
                            }
                        }
                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                //add shortcut
                if (url.endsWith('/shortcuts/add') && opts.method === 'POST') {
                    let user = JSON.parse(localStorage.getItem('user'));
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token' && user) {
                        let newShortcut = JSON.parse(opts.body);
                        if(isValidURL(newShortcut.link))
                        { 
                            newShortcut.id = shortcuts.length ? Math.max(...shortcuts.map(shortcut => shortcut.id)) + 1 : 1;
                            newShortcut.user = user.id
                            newShortcut.sk = shortcutBackend + newShortcut.id       // in production should generate slug with hash function or something like that instead of id
                            shortcuts.push(newShortcut);
                            localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
                            resolve({ ok: true, text: () => Promise.resolve() });
                        } else {
                            reject('Bad url');
                        }
                    } else {
                        reject('Unauthorised');
                    }
                    return;
                }

                //get shortcuts
                if (url.endsWith('/shortcuts') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(shortcuts))});
                    } else {
                        reject('Unauthorised');
                    }
                    return;
                }

                //get shortcut by id
                if (url.match(/\/shortcuts\/user\/\d+$/) && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/');
                        let uid = parseInt(urlParts[urlParts.length - 1]);
                        let matched = shortcuts.filter(shortcut => { return shortcut.user === uid; });
                        if(!matched.length)
                            reject('You don\'t have shortcuts');
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(matched))});
                    } else {
                        reject('Unauthorised');
                    }
                    return;
                }

                //get shortcut by id
                if (url.match(/\/shortcuts\/\d+$/) && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedShortcuts = shortcuts.filter(shortcut => { return shortcut.id === id; });
                        let shortcut = matchedShortcuts.length ? matchedShortcuts[0] : null;

                        resolve({ ok: true, text: () => JSON.stringify(shortcut)});
                    } else {
                        reject('Unauthorised');
                    }
                    return;
                }
                
                // delete shortcut
                if (url.match(/\/shortcuts\/\d+$/) && opts.method === 'DELETE') {
                    //get user 
                    let user = JSON.parse(localStorage.getItem('user'));
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token' && user) {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < shortcuts.length; i++) {
                            let shortcut = shortcuts[i];
                            if (shortcut.id === id) {
                                //check for right user
                                if(shortcut.user === user.id)       //set true to clean up 
                                {
                                    shortcuts.splice(i, 1);
                                    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
                                } else {
                                    reject('Wrong user');
                                }
                                break;
                            }
                        }
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        reject('Unauthorised');
                    }
                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}

function isValidURL(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}