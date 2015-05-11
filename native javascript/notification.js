/**
 * Defining Notification Class
 */
var Notify;
Notify = (function() {
    var getPermissionAndLaunch, launchNotiWindow;
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
     * Helps in launching Notification(Private)
     * @param  {String} title   Title for Notification
     * @param  {Object} options Object with Options for Notification
     * @return {Notification}         Object of Notification is returned along with the Notification being launched.
     */
    launchNotiWindow = function(title, options) {
        var notify;
        return notify = new Notification(title, options);
    };
    /**
     * Checks for the permission from the user
     * @param  {String} title   Title for Notification
     * @param  {Object} options Object with Options for Notification
     * @return {NA}         NA
     */
    getPermissionAndLaunch = function(title, options) {
        return Notification.requestPermission(function(permission) {
            return launchNotiWindow(title, options);
        });
    };
    /**
     * Prototype function for invoking the Notification object.
     * @return {NA} [NA]
     */
    Notify.prototype.launch = function() {
        return getPermissionAndLaunch(this.title, this.options);
    };
    return Notify;
})();