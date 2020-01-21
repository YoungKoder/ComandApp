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
        const delayMS = 1500;

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
    function Token() {
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
         * @returns {String} Return current session token
         */
        this.get = () => {
            return localStorage.getItem('token');
        };

        /**
         * Async session token verification
         * @returns {Promise}
         */
        this.verify = () => {
            return newPromise((resolve, reject) => { 
                jwt.verify(this.getToken(), secretKey, function(error, decoded) {
                    if (error) reject(error);
                    resolve(decoded);
                });
            });
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
    }

    function Auth() {

    }

    function User() {

    }

    function News() {

    }

    function Events() {

    }

    /**
     * Return public instances
     */
    return {
        Token: new Token(),
        Auth: new Auth(),
        User: new User(),
        News: new News(),
        Events: new Events()
    };
})();

export default FakeApi;