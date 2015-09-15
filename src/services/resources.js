import Store from 'store';
import request from 'superagent';

class Cart {
    constructor () {
        this._storeKey = 'itemsInCart';
    }
    all() {
        return Store.get(this._storeKey) || []
    }
    add(item) {
        let items = this.all().concat([item]);
        Store.set(this._storeKey, items);
        return this;
    }
    size() {
        return this.all().length;
    }
    clear() {
        Store.remove(this._storeKey);
        return this;
    }
}

class Item {
    constructor() {
        this._cache = null;
    }
    all() {
        if (this._cache) {
            return new Promise((resolve) => {
                resolve(this._cache)
            });
        }
        return new Promise((resolve) => {
            request.get(require('./items.json'))
                .set('Accept', 'application/json')
                .end((err, res) => {
                    // imitation of the delay from the server
                    setTimeout(() => {
                        this._cache = res.body;
                        resolve(res.body);
                    }, 1000);
                })
        });
    }
}

class User {
    constructor(){
        this._storeKey = 'users';
    }
    all() {
        return Store.get(this._storeKey) || [];
    }
    add(user) {
        let users = this.all().concat([user]);
        Store.set(this._storeKey, users);
        return this;
    }
    findByEmail(email) {
        let users = this.all();
        return users.filter((user) => user.email == email)[0];
    }
}

export default {
    Item: new Item,
    Cart: new Cart,
    User: new User
}
