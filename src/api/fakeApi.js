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
        const delayMS = 1000;

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
        }

        /**
         * Retrieve token from localStorage
         * @param {Boolean} withinServer
         * @returns {Promise} If request was sent from client
         * @returns {String} Instantly if request was made within server
         */
        this.get = (withinServer = false) => {
            return withinServer
            ? localStorage.getItem('token')
            : newPromise((resolve, reject) => {
                const token = localStorage.getItem('token');
                if (!token) reject(new Error('Token value is false: ', token));
                resolve(token);
            })
        };

        /**
         * Method to be called on user's
         * sign in or sign up
         * @param {Object} payload Data to be tokenized
         * @param {Object} options JWT options
         */
        this.createToken = (payload, options = {}) => {
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
         * @param {Boolean} withHeader Specifies whether header should be
         * included in response or not
         */
        this.decode = (withHeader = false) => {
            return newPromise((resolve, reject) => {
                const decoded = jwt.decode(this.get(true), withHeader ? { complete: true } : {});
                if (!decoded) reject(new Error('Token is not valid, please reassign token!'));
                resolve(decoded);
            });
        }

        /**
         * Async session token verification
         * @returns {Promise}
         */
        this.verify = () => {
            return newPromise((resolve, reject) => {
                jwt.verify(this.get(true), secretKey, function(error, decoded) {
                    if (error) reject(error);
                    resolve(decoded);
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

export default FakeApi;