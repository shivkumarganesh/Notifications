angular.module('Notification').factory('Notify',[function(){
	var notification;
	notification = (function() {
  	function notification(title,options) {
  		this.title=title;
  		this.options=options;
  	}
  	function launchNotification(title,options){
  		var n = new Notification(title,options);
  	}
  	function getRequestNLaunch(title,options){
  		Notification.getPermission(function(permission){
  			if(permission==='granted'){
  				launchNotification(title,options);
  			}
  		});
  	}
  	notification.prototype.launch = function() {
  		getRequestNLaunch(this.title,this.options);
  	};
  	return notification;
	})();	
}]);