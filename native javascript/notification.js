var Notify;
Notify = (function() {
  var launchNotification;
  function Notify(title, options) {
    this.title = title;
    this.options = options;
  }
  launchNotification = function() {
    var notify;
    return notify = new Notification(this.title);
  };
  Notify.prototype.getPermission = function() {
    return Notification.requestPermission(function(permission) {
      if (permission === "granted") {
        return launchNotification();
      }
    });
  };
  return Notify;
})();