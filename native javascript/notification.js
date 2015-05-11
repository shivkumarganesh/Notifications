var Notify;
Notify = (function() {
  var getPermissionAndLaunch, launchNotiWindow;
  function Notify(title, options) {
    this.title = title;
    this.options = options;
  }
  Notify.prototype.print = function() {
    return console.log(this.title + this.options);
  };
  launchNotiWindow = function(title, options) {
    var notify;
    return notify = new Notification(title, options);
  };
  getPermissionAndLaunch = function(title, options) {
    return Notification.requestPermission(function(permission) {
      return launchNotiWindow(title, options);
    });
  };
  Notify.prototype.launch = function() {
    return getPermissionAndLaunch(this.title, this.options);
  };
  return Notify;
})();