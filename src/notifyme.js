(function(root, definition) {
    if (typeof define === 'function' && define.amd) {
        define([], definition);
    } else {
        root.NotifyMe = definition();
    }
})(this, function() {
    var defaultOptions = {
        icon: 'http://us.cdn2.123rf.com/168nwm/dxinerz/dxinerz1506/'
            + 'dxinerz150601488/41355464-bell-notification-call-icon-vector'
            + '-image-can-also-be-used-for-education-academics-and-science'
            + '-suitab.jpg',
        lang: 'en-US',
        onclick: function() {},
        onclose: function() {},
        onerror: function() {}
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
            if (base.hasOwnProperty(key)) {
                extended[key] = base[key];
            }
        }
        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                if (extension[key].constructor === Object) {
                    extended[key] = extend(base[key], extension[key]);
                } else {
                    extended[key] = extension[key];
                }
            }
        }
        return extended;
    }


    /**
     *  Generate a random four-digit hex value.
     */
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
    }


    /**
     *  Generate a random UUID string.
     *  @return {String} A randomly-generated UUID string.
     */
    function generateTag() {
        return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-');
    }


    /**
     *  NotifyMe Constructor
     *  @param {String} `title`     The title for the notification instance.
     *  @param {Object} `options`   The options parameter for the notification
     *      instance and is used to extend the default options.
     */
    function NotifyMe(title, options) {
        if (!(this instanceof NotifyMe)) {
            return new NotifyMe(title, options);
        }
        this.title = title;
        this.options = extend(defaultOptions, options || {});
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
