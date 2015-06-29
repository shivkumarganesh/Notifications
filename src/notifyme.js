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


    function generateTag() {
        return Math.floor(Math.random() * 0x10000000).toString(16);
    }


    function NotifyMe(title, body, options) {
        if (!(this instanceof NotifyMe)) {
            return new NotifyMe(title, body, options);
        }
        this.title = title;
        this.options = extend(defaultOptions, options);
        this.options.body = body;
        this.options.tag = generateTag();
    }

    NotifyMe.permissionGranted = false;

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
