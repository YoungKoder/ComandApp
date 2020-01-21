/**
 * Initialize fakeApi as a global variable
 */
const fakeApi = (() => {

    /**
     * Private module variables 
     */
    const privateVariableExample = 'I am visible';

    /**
     * Api's factory methods
     */
    function Auth() {

    }

    function User() {

    }

    function News() {

        /**
         * Private methods
         */
        const privateMethodExample = () => {
            return 'Johny, and ' + privateVariableExample;
        }

        /**
         * Public methods
         */
        this.publicMethodExample = () => {
            console.log('Its me, ', privateMethodExample());
        };
    }

    function Events() {

    }

    /**
     * Return public instances
     */
    return {
        Auth: new Auth(),
        User: new User(),
        News: new News(),
        Events: new Events()
    };
})();

export default fakeApi;