(function(root, definition) {
    if (typeof define === 'function' && define.amd) {
        define([], definition);
    } else {
        root.NotifyMe = definition();
    }
})(this, function() {
    var defaultOptions = {
        icon: 'http://i.istockimg.com/file_thumbview_approve/46749378/3/'
            + 'stock-illustration-46749378-cute-piglet-icon-animal-icons'
            + '-series.jpg',
        lang: 'en-US'
    };


    /**
     *  Utility method to extend an object with properties from another object.
     *  @param {Object} `base`      The object that is going to be extended.
     *  @param {Object} `extension` The object that will be used to extend
     *      the base object.
     *  @return {Object} A new object whose keys and values are a merge of
     *      the base and extension objects.
     */
    function extend(base, extension) {
        var extended = {};
        for (var key in base) {
            extended[key] = base[key];
        }
        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                if (extension[key].constructor === Object) {
                    base[key] = extend(base[key], extension[key]);
                } else {
                    base[key] = extension[key];
                }
            }
        }
        return extended;
    }


    /**
     *  Generate a random tag string.
     *  @return {String} A randomly-generated tag string.
     */
    function generateTag() {
        return Math.floor(Math.random() * 0x10000000).toString(16);
    }


    /**
     *  NotifyMe Constructor
     *  @param {String} `title`     The title for the notification instance.
     *  @param {String} `body`      The body string for the notification
     *      instance. This will just be added to the options object, but still
     *      placed here to simplify the process for users who just want to use
     *      the default options.
     *  @param {Object} `options`   The options parameter for the notification
     *      instance and is used to extend the default options.
     */
    function NotifyMe(title, body, options) {
        if (!(this instanceof NotifyMe)) {
            return new NotifyMe(title, body, options);
        }
        this.title = title;
        this.options = extend(defaultOptions, options || {});
        this.options.body = body;
        this.options.tag = generateTag();
    }

    NotifyMe.permissionGranted = false;

    /**
     *  Request permission from the user to use the Notifications API.
     *  @return {Promise}
     */
    NotifyMe.requestPermission = function() {
        return new Promise(function(resolve, reject) {
            Notification.requestPermission(function(permission) {
                NotifyMe.permissionGranted = permission === 'granted';
                if (NotifyMe.permissionGranted) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    };

    /**
     *  Launch a notification instance, asking permission from the user first
     *  when permission is not yet granted.
     *  @return {Promise}
     */
    NotifyMe.prototype.launch = function() {
        if (NotifyMe.permissionGranted) {
            this.notification = new Notification(this.title, this.options);
            this.notification.onclick = this.options.onclick;
            this.notification.onerror = this.options.onerror;
            this.notification.onclose = this.options.onclose;
            return Promise.resolve(this.notification);
        } else {
            return NotifyMe.requestPermission()
                .then(this.launch.bind(this))
                .catch(console.warn.bind(console));
        }
    };


    return NotifyMe;
});
