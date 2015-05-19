NotifyMe
--------

### Introduction
NotifyMe is a simple JavaScript Library written in JavaScript and implements the Notificaiton Interface for Web. It’s still being built and some amazing features are being added to it. The best way is to use this library directly with your front end code and invoke it from multiple medium. It gives you options for the following :-

  - A custom icon
  - Callbacks to be executed
  - Everything you can creatively do with it

### Implementation

The implementation for the same are pretty easy and straight forward. Import the NotifyMe.js from the dist folder and prepare the object to be passes to it.

A typical implementation looks something like this.[Sample can be found in index.html]

```js
(function(){
    //TO build the option Object with data
    var options = {
		        icon: 'http://i.istockimg.com/file_thumbview_approve/46749378/3/stock-illustration-46749378-cute-piglet-icon-animal-icons-series.jpg',
		        body: 'This is a simple demo for the notification API',
		        onclick:function(){
		        	console.log("On Click Triggered");
		        },
		        onerror:function(){
		        	console.log("On Error Triggered");
		        },
		        onclose:function(){
		        	console.log("On Close Triggered");
		        }
		    };

    //Actual Implementation of NotifyMe.js
    NotifyMe.launch(title,options);
})();
```
> Note: Right now any user should provide a default options for the 4 different callbacks. In the next version we would extend this object to a custom object so as to have a default object in place. This would not allow errors to occour at console. As such the functionalities are fine and working.

### Version
1.0.1



### Todo's

 - Write Tests for the same
 - Integrate with  Travis CI
 - Fix the options to extend to default
 - Propagate it through the community
 - Prepare samples with WebSocket
 - Integrate Alarm API with this

License
----

MIT


> To Contact Author or Contribute
> mailat: gshiv.sk@gmail.com 
> skype: gshiv.sk
> Please fork and give me a pull request [If interested to contribute]