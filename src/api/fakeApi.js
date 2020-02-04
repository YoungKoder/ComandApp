import jwt from "jsonwebtoken";
import { func } from "prop-types";

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
  const newPromise = method => {
    const delayMS = 100;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        method(resolve, reject);
      }, delayMS);
    });
  };

  /**
   * Api's submodules
   */
  /**
   * JWT API wrapper
   * https://github.com/auth0/node-jsonwebtoken#usage
   */
  const Token = new (function() {
    const secretKey = "evok9nrnbe";

    /**
     * Store session token within localStorage
     * @param {String} token
     */
    const set = token => {
      if (token) localStorage.setItem("token", token);
      else throw new Error("Can not set false token");
    };

    /**
     * Retrieve token from localStorage
     * @returns {Promise} If request was sent from client
     * @returns {String} Instantly if request was made within server
     */
    const get = () => {
      return newPromise((resolve, reject) => {
        const token = localStorage.getItem("token");
        if (!token) reject(new Error("Token value is false"));
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
            if (!token) reject(new Error("There is no token to be destroyed!"));
            localStorage.removeItem("token");
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    };

    /**
     * Create new token
     * https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtsignpayload-secretorprivatekey-options-callback
     *
     * @param {Object} payload Data to be tokenized
     * @param {Object} options JWT options
     */
    this.create = (payload, options = { expiresIn: "7 days" }) => {
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
            const decoded = jwt.decode(
              token,
              withHeader ? { complete: true } : {}
            );
            if (!decoded)
              reject(new Error("Token is not valid, please reassign it!"));
            resolve(decoded);
          })
          .catch(error => {
            reject(error);
          });
      });
    };

    /**
     * Token verification
     * https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtverifytoken-secretorpublickey-options-callback
     *
     * @returns {Promise}
     */
    this.verify = (options = {}, forceLogout = true) => {
      return newPromise((resolve, reject) => {
        get()
          .then(token => {
            jwt.verify(token, secretKey, options, function(error, decoded) {
              if (error) reject(error);
              resolve(decoded);
            });
          })
          .catch(error => {
            if (!forceLogout) reject(error);
            localStorage.removeItem("token");
            window.location.replace("/sign-in");
          });
      });
    };
  })();

  const Auth = new (function() {
    const adminEmail = "admin@admin.com";

    /**
     * Initialize default users data if there is no in localStorage
     */
    const usersDataInit = () => {
      const usersExist = Boolean(localStorage.getItem("users"));
      if (!usersExist) {
        localStorage.setItem(
          "users",
          JSON.stringify([
            {
              email: adminEmail,
              password: "test123"
            },
            {
              email: "test@gmail.com",
              password: "useruser"
            }
          ])
        );
      }
    };

    this.signUp = userData => {
      return newPromise((resolve, reject) => {
        usersDataInit();
        const users = JSON.parse(localStorage.getItem("users"));
        const userExists = users.find(user => user.email === userData.email);
        if (userExists) return reject(new Error("This email already in use"));

        users.push({ email: userData.email, password: userData.password });
        localStorage.setItem("users", JSON.stringify(users));

        userData.role = userData.email === adminEmail ? "admin" : "reader";
        delete userData.password;

        Token.create(userData)
          .then(token => resolve(token))
          .catch(error => reject(error));
      });
    };

    this.signIn = userData => {
      return newPromise((resolve, reject) => {
        usersDataInit();

        const users = JSON.parse(localStorage.getItem("users"));
        const userRecord = users.find(
          user =>
            user.email === userData.email && user.password === userData.password
        );
        if (!userRecord)
          return reject(new Error("Provided incorrect sign in data!"));

        userData.role = userData.email === adminEmail ? "admin" : "reader";
        delete userData.password;

        Token.create(userData)
          .then(token => resolve(token))
          .catch(error => reject(error));
      });
    };
  })();

  const User = new (function() {
    this.hasAdministrativePermissions = () => {
      return newPromise((resolve, reject) => {
        Token.decode()
          .then(decoded =>
            decoded.role === "admin" ? resolve(true) : resolve(false)
          )
          .catch(error => reject(error));
      });
    };

    this.saveToLocalStorage = userData => {
      return newPromise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem("users"));

        delete userData.initialPassword;

        const userIndex = users.findIndex(
          user => user.email === userData.email
        );

        if (!~userIndex) return reject("There is no user with such email!");
        users[userIndex] = userData;

        localStorage.setItem("users", JSON.stringify(users));
        resolve(true);
      });
    };
    this.getUserData = () => {
      return newPromise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem("users"));
        console.log(users, "users");
        Token.decode()
          .then(decoded => {
            const user = users.find(user => user.email === decoded.email);

            console.log(user, "user");
            resolve(user);
          })

          .catch(error => reject(error));
        /*
          .then((decoded => decoded.email)
          .catch(error => reject(error));
        //  console.log(localStorage.getItem("user"));
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        if (!userData) reject(new Error("There is no user data"));
        resolve(userData);
      });*/
      });
    };
  })();

  const News = new (function() {
    /**
     * Add new news item with default data
     * @param {Object} newsData Default data blueprint
     * @returns {Promise}
     */
    this.add = (
      newsItemData = {
        title: "",
        description: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQn7TjsgkXDv7yDmoL8aV4RpF9K5ba5DDULOxqe4Y1674KzDErw&s"
      }
    ) => {
      return newPromise((resolve, reject) => {
        Token.verify()
          .then(decoded => {
            const newsItemId = Date.now();
            const newsItem = { [`${newsItemId}`]: newsItemData };
            const news = Object.assign(
              JSON.parse(localStorage.getItem("news") || "{}"),
              newsItem
            );

            localStorage.setItem("news", JSON.stringify(news));
            resolve(news);
          })
          .catch(error => reject(error));
      });
    };

    /**
     * Delete news item
     * @param {String} newsId Id of news item to be deleted
     * @returns {Promise}
     */
    this.delete = (newsItemId = "") => {
      return newPromise((resolve, reject) => {
        Token.verify()
          .then(decoded => {
            const newsJsonString = localStorage.getItem("news");
            if (!newsJsonString) reject(new Error("There is no news!"));
            const news = JSON.parse(newsJsonString);

            if (newsItemId) {
              if (!news[newsItemId])
                reject(new Error("There is no news with such id!"));
              delete news[newsItemId];
              localStorage.setItem("news", JSON.stringify(news));
              return resolve(news);
            }

            localStorage.removeItem("news");
            resolve(true);
          })
          .catch(error => reject(error));
      });
    };

    /**
     * Get all or particular news
     * @param {String} newsItemId Id of news item to fetch
     * @returns {Promise}
     */
    this.get = (newsItemId = "") => {
      return newPromise((resolve, reject) => {
        Token.verify()
          .then(decoded => {
            const newsJsonString = localStorage.getItem("news");
            const news = JSON.parse(newsJsonString);
            if (newsItemId) {
              if (!news) reject(new Error("There is no news!"));
              if (!news[newsItemId])
                reject(new Error("There is no news with such id!"));
              resolve(news[newsItemId]);
            }
            resolve(news);
          })
          .catch(error => reject(error));
      });
    };

    /**
     * Update news item data
     * @param {String} newsItemId
     * @param {String} newsItemData
     * @returns {Promise}
     */
    this.update = (newsItemId, newsItemData) => {
      return newPromise((resolve, reject) => {
        Token.verify()
          .then(decoded => {
            const newsJsonString = localStorage.getItem("news");
            const news = JSON.parse(newsJsonString);
            if (!news[newsItemId])
              reject(new Error("There is no news with such id"));
            news[newsItemId] = newsItemData;
            localStorage.setItem("news", JSON.stringify(news));
            resolve(true);
          })
          .catch(error => reject(error));
      });
    };
  })();

  const Events = new (function() {})();

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

export { Token, Auth, User, News, Events };
