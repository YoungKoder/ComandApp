import jwt from 'jsonwebtoken';

/**
 * Initialize fakeApi as a global variable
 */
const FakeApi = (() => {

    /**
     * Private module common variables 
     */
    /**
     * Server response emulation
     * @param {Function} method
     * @returns {Promise} Returns Promise instance
     * that will be solved / rejected within response
     * delay time
     */
    const newPromise = (method) => {
        const delayMS = 100;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                method(resolve, reject);
            }, delayMS);
        });
    }

    /**
     * Api's entities
     */
    /**
     * JWT API wrapper
     * https://github.com/auth0/node-jsonwebtoken#usage
     */
    const Token = new function() {
        const secretKey = 'evok9nrnbe';

        /**
         * Store session token within localStorage
         * @param {String} token 
         */
        const set = (token) => {
            if (token) localStorage.setItem('token', token);
            else throw new Error('Can not set false token: ', token);
        }

        /**
         * Retrieve token from localStorage
         * @returns {Promise} If request was sent from client
         * @returns {String} Instantly if request was made within server
         */
        const get = () => {
            return newPromise((resolve, reject) => {
                const token = localStorage.getItem('token');
                if (!token) reject(new Error('Token value is false: ', token));
                resolve(token);
            });
        };

        /**
         * Destroy session token if exists, otherwise throws an error
         * @returns {Promise} Returns promise resolved with true
         */
        this.destroy = () => {
            return newPromise((resolve, reject) => {
                get()
                .then(token => {
                    if (!token) reject(new Error('There is no token to be destroyed!'));
                    localStorage.removeItem('token');
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
            });
        }

        /**
         * Create new token
         * https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtsignpayload-secretorprivatekey-options-callback
         * 
         * @param {Object} payload Data to be tokenized
         * @param {Object} options JWT options
         */
        this.create = (payload, options = { expiresIn: '7 days' }) => {
            return newPromise((resolve, reject) => { 
                jwt.sign(payload, secretKey, options, (error, token) => {
                    if (error) reject(error);
                    set(token);
                    resolve(token);
                });
            });
        };
        
        /**
         * Decodes valid token, afterwards returns data that was tokenized
         * https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtdecodetoken--options
         * 
         * @param {Boolean} withHeader Specifies whether header should be
         * included in response or not
         */
        this.decode = (withHeader = false) => {
            return newPromise((resolve, reject) => {
                get()
                .then(token => {
                    const decoded = jwt.decode(token, withHeader ? { complete: true } : {});
                    if (!decoded) reject(new Error('Token is not valid, please reassign it!'));
                    resolve(decoded);
                })
                .catch(error => {
                    reject(error);
                });
            });
        }

        /**
         * Token verification
         * https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtverifytoken-secretorpublickey-options-callback
         * 
         * @returns {Promise}
         */
        this.verify = (options = {}) => {
            return newPromise((resolve, reject) => {
                get()
                .then(token => {
                    jwt.verify(token, secretKey, options, function(error, decoded) {
                        if (error) reject(error);
                        resolve(decoded);
                    });
                })
                .catch(error => {
                    reject(error);
                });
            });
        };
    }

    const Auth = new function() {

    }

    const User = new function() {

    }

    const News = new function() {

    }

    const Events = new function() {

    }

    /**
     * Return public instances
     */
    return {
        Token: Token,
        Auth: Auth,
        User: User,
        News: News,
        Events: Events
    };
})();

const Token = FakeApi.Token;
const Auth = FakeApi.Auth;
const User = FakeApi.User;
const News = FakeApi.News;
const Events = FakeApi.Events;

export {Token, Auth, User, News, Events};