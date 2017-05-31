'use strict';

angular.module('svdesignti.loggedUser', []);

angular.module('svdesignti.loggedUser').provider('LoggedUserService', [
    function () {

        /**
         * Polyfill for IE8
         *
         * http://stackoverflow.com/a/1181586
         */
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (needle) {
                var l = this.length;
                for (; l--;) {
                    if (this[l] === needle) {
                        return l;
                    }
                }
                return -1;
            };
        }

        var config = {
            storage: 'sessionStorage',
            storageKey: 'LoggedUserService'
        };

        var data = {
            user: {}
        };

        /**
         * Retrieve the user
         *
         * @returns {object}
         */
        var getUser = function () {
            return data.user;
        };

        /**
         * Persist data to storage based on config
         */
        var save = function () {
            switch (config.storage) {
                case 'sessionStorage':
                    saveToStorage('sessionStorage');
                    break;
                case 'localStorage':
                    saveToStorage('localStorage');
                    break;
                default:
                    // Don't save
                    return;
            }
        };

        var unset = function () {
            switch (config.storage) {
                case 'sessionStorage':
                    unsetFromStorage('sessionStorage');
                    break;
                case 'localStorage':
                    unsetFromStorage('localStorage');
                    break;
                default:
                    // Don't save
                    return;
            }
        };

        /**
         * Persist data to web storage
         */
        var saveToStorage = function (storagetype) {
            window[storagetype].setItem(config.storageKey, JSON.stringify(data));
        };

        /**
         * Unset data from web storage
         */
        var unsetFromStorage = function (storagetype) {
            window[storagetype].removeItem(config.storageKey);
        };

        /**
         * Retrieve data from web storage
         */
        var fetchFromStorage = function (storagetype) {
            var data = window[storagetype].getItem(config.storageKey);
            return (data) ? JSON.parse(data) : false;
        };

        var LoggedUserService = {};
        LoggedUserService.resume = resume;


        /**
         * Restore data from web storage.
         *
         * Returns true if web storage exists and false if it doesn't.
         *
         * @returns {boolean}
         */
        function resume() {
            var storedData;

            switch (config.storage) {
                case 'sessionStorage':
                    storedData = fetchFromStorage('sessionStorage');
                    break;
                case 'localStorage':
                    storedData = fetchFromStorage('localStorage');
                    break;
                default:
                    storedData = null;
            }
            if (storedData) {
                angular.extend(data, storedData);
                return true;
            }

            return false;
        }

        /**
         * Remove data from web storage
         */
        LoggedUserService.flushStorage = function () {
            unset();
        };

        /**
         * Returns the current user
         * @returns {Object}
         */
        LoggedUserService.getUser = function () {
            return data.user;
        };

        /**
         * Set the user object (overwriting previous user)
         *
         * @param user
         */
        LoggedUserService.setUser = function (user) {
            data.user = user;
            save();
        };

        /**
         * Get logged user
         *
         * @returns {Object}
         */
        LoggedUserService.get = function () {
            return getUser();
        };

        return {
            config: function (userConfig) {
                angular.extend(config, userConfig);
            },
            resume: resume,
            $get: function () {
                return LoggedUserService;
            }
        };

    }
]);
