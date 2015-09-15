import Store from 'store';

class CurrentUser {

    static isLoggedIn() {
        return !!this.get();
    }

    static get() {
        return Store.get('user');
    }

    static set(user) {
        Store.set('user', user);
    }

    static remove() {
        Store.remove('user');
    }
}

export default CurrentUser;
