/**
 * Global Variable NotifyMe
 */
var NotifyMe = {};
(function (window, NotifyMe) {
    var Notify;
    Notify = (function () {
        var getPermissionAndLaunch, launchNotiWindow, mergeObjects, defaultOptions, generateGuid;

        /**
         * Notify Constructor
         * @param {String} title   Title for Notification
         * @param {Object} options Object with Options for Notification
         */
        function Notify(title, options) {
            this.title = title;
            this.options = options;
        }

        /**
         * UUID Generator
         * @return {String} Object  Returns a string of UUID for each of the Notification
         */
        generateGuid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
        defaultOptions = {
            icon: '',
            body: 'This is the Default Body',
            lang: 'en-US',
            tag: generateGuid(),
            dir: 'ltr'
        };

        /**
         * Helps in launching Notification(Private)
         * @param  {String} title   Title for Notification
         * @param  {Object} options Object with Options for Notification
         * @return {Notification}         Object of Notification is returned along with the Notification being launched.
         */
        launchNotiWindow = function (title, options) {
            var notify;
            notify = new Notification(title, options);
            notify.onclick = function () {
                options.onclick();
            };
            notify.onerror = function () {
                options.onerror();
            };
            notify.onclose = function () {
                options.onclose();
            };
        };

        /**
         * Helps to merge the two Objects.
         * defaultOptions refers to the option which is available by default
         * options refers to the options that are being injected.
         * @param  {Object} defaultOptions  Object carrying default options
         * @param  {Object} options Object carrying options provided by the user
         * @return {Object} defaultOptions  merges options with defaultObject and returns defaultOption
         */
        mergeObjects = function (defaultOptions, options) {
            for (var p in options) {
                try {
                    // Property in destination object set; update its value.
                    if (options[p].constructor == Object) {
                        defaultOptions[p] = MergeRecursive(defaultOptions[p], options[p]);
                    } else {
                        defaultOptions[p] = options[p];
                    }
                } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    defaultOptions[p] = options[p];
                }
            }
            return defaultOptions;
        };

        /**
         * Checks for the permission from the user
         * @param  {String} title   Title for Notification
         * @param  {Object} options Object with Options for Notification
         * @return {NA}         NA
         */
        getPermissionAndLaunch = function (title, options) {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    launchNotiWindow(title, mergeObjects(defaultOptions, options));
                } else if (permission === 'denied') {
                    console.log("Request denied by the User");
                }
            });
        };
        /**
         * Prototype function for invoking the Notification object.
         * @return {NA} [NA]
         */
        Notify.prototype.launch = function () {
            return getPermissionAndLaunch(this.title, this.options);
        };
        return Notify;
    })();

    NotifyMe.launch = function (title, options) {
        var tempObj = new Notify(title, options);
        tempObj.launch();
    };

    return window.NotifyMe;
})(this, NotifyMe);