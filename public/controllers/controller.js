// create the module
var crudApp = angular.module('crudApp', ['ngRoute']);

/* Configuration of routes. */
crudApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
      // route for the home page

     .when('/login', {
      	templateUrl : 'pages/login.html',
      	controller  : 'loginController'
      })
      // route for the about page
      .when('/profile', {
      	templateUrl : 'pages/profile.html',
      	controller  : 'profileController'
      })

	  .when('/feed', {
      	templateUrl : 'pages/feed.html',
      	controller  : 'feedController'
      })
	  .when('/', {
      	templateUrl : 'pages/login.html',
      	controller  : 'loginController'
      });

      .when('/login', {
      	templateUrl : 'pages/login.html',
      	controller  : 'loginController'
      })
      // route for the about page
      .when('/profile', {
      	templateUrl : 'pages/profile.html',
      	controller  : 'profileController'
      })

			.when('/', {
      	templateUrl : 'pages/feed.html',
      	controller  : 'feedController'

      });


      $locationProvider.html5Mode(true);
  });



 crudApp.controller('mainController', function($scope, $location) {

 	/*
		1. Dashboard
		- populate the main feed (different methods)
		- populate the side bar for the user
		- populate interests, groups
		- populate name, admin/not admin


  // Initialize the model object
 /* $scope.firstModelObj = {
  	account_name: "",
  	is_admin: false,
  	display_name: "",
  	email: "",
  	show_logout: false,
  	show_name: false,
  	loggedIn: false
  };*/




 });







/**
 * Controller for login page template.
 */
 crudApp.controller('loginController', function($scope, $location, $http) {

 	$scope.logged = false;
 	$scope.username = null;
 	$scope.login_error_msg = "";
 	$scope.register_error_msg = "";
 	$scope.loginError = false;
 	$scope.registerError = false;


	$scope.login = function(){
		var email = $("#login-email").val()
		var password = $("#login-password").val()

		if(!email){
			$("#login-error").html("Email required!")
			$("#login-error").show()
			return
		}else if(!password){
			$("#login-error").html("Password required!")
			$("#login-error").show()
			return
		}

		/*$.ajax({
			url: "/auth/local/login",
			type: "POST",
			contentType: "application/x-www-form-urlencoded",
			data: {'email': email, 'password': password},
			success: function(data){
				// Successful login
				location.href = "profile.html"
			},
			error: function(data){
				$("#login-error").html(data.responseJSON.message)
				$("#login-error").show()
			}
		})*/


		var data = {
    		email: email,
    		password: password
    	};
		$http.post('/auth/local/login', data).success(function(response) {
    		 $location.path('/feed');

    	}).error(function (data, status, headers, config) {
    		$scope.login_error_msg = data.message;
        	$scope.loginError = true;
      	});

	}



	$scope.signup = function(){
		//return $location.path('/hey'); // path not hash

		var email = $("#signup-email").val()
		var username = $("#signup-username").val()
		var pass1 = $("#signup-password").val()
		var pass2 = $("#signup-password-conf").val()

		if(!email){
			$("#signup-error").html("Email required!")
			$("#signup-error").show()
			return
		}else if(!pass1){
			$("#signup-error").html("Password required!")
			$("#signup-error").show()
			return
		}else if(!username){
			$("#signup-error").html("Username required!")
			$("#signup-error").show()
			return
		}

		if(pass1 != pass2){
			$("#signup-error").html("Passwords do not match!")
			$("#signup-error").show()
			return
		}

		/*$.ajax({
			url: "/auth/local/signup",
			type: "POST",
			contentType: "application/x-www-form-urlencoded",
			data: {'email': email, 'password': pass1, 'username': username},
			success: function(data){
				// Successful login
				redirect();

			},
			error: function(data){
				$("#signup-error").html(data.responseJSON.message)
				$("#signup-error").show()
			}
		})*/
		var data = {
    		email: email,
    		password: pass1,
    		username: username
    	};
		$http.post('/auth/local/signup', data).success(function(response) {
    		console.log(response);
    	}).error(function (data, status, headers, config) {
    		console.log(data);
          $scope.register_error_msg = data.message;
        	$scope.registerError = true;
      });


	}



	$scope.github_signin = function(){

		$http.get('/auth/github').success(function(data, status, headers, config) {
            	console.log("back in success");
            }).
            error(function(data, status, headers, config) {
            	console.log('ERROR!');
            });

	}

	var redirect = function(){
		console.log('dwdwdfwf');
		$scope.showLogin = false;
 		$scope.showRegister = false;
		return $location.path('/'); // path not hash
	}

	$scope.logout = function(){
		$.ajax({
			url: "/auth/logout",
			type: "GET",
			success: function(data){
				location.href = "index.html"
			}
		})

		$http.get('/auth/logout').success(function(data, status, headers, config) {
        	redirect();
        });

	}



	$scope.login_form = function(){
 		$scope.showLogin = true;
 		$scope.showRegister = false;
 	}
 	$scope.register_form = function(){
 		$scope.showRegister = true;
 		$scope.showLogin = false;
 	}


 	$scope.login_hide = function(){
 		$scope.showLogin = false;
 		$scope.showRegister = false;
 	};



	var start = function(){
		$scope.showLogin = false;
		$scope.showRegister = false;
		//$("#signin_popup").appendTo("#hello") // Ensures modal shows up
		//$("#signup_popup").appendTo("#hello")

		/*$.ajax({
			url: "/auth/loggedInUser",
			type: "GET",
			success: function(data){

				if(data.user){
					$scope.username = data.user.username
				}
				//$scope.$apply()
			}
		})*/

		$http.get('/auth/loggedInUser').success(function(data, status, headers, config) {
        	$scope.logged = data.logged
        	if(data.user){
				$scope.username = data.user.username
			}
        });


	};

    start(); //Init

});


crudApp.controller('feedController', function($scope, $location, $http) {



 /*

1. Dashboard
		- populate the main feed (different methods)
		- populate the side bar for the user
		- populate interests, groups
		- populate name, admin/not admin

 */


 var populateInterests = function(){

 	/*$http.get('/users/profile', ).success(function(data, status, headers, config) {
        	console.log(data);
    });*/

    $http({
    		method: 'GET',
          url: '/users/profile', //get all user emails & displayname
          //params: {email: (sharedService.getData()).email}
      })
    	.then(function successCallback(response) {
    		$scope.data.email = response.data.email;
    		$scope.data.display_name = response.data.displayname;
    		$scope.data.description = response.data.description;
    		$scope.data.user_logo = response.data.imageurl;
    		if (response.data.accounttype < 2){
    			$scope.data.profile_is_admin = true;
    		}
    	},
    	function errorCallback(response) {
    		console.log("Failure");
    		console.log(response);
    	});
 };



 var start = function (){
 	//populateInterests();
 }

 /*var populateInterests = function(){
 	$http.get('/users/profile').success(function(data, status, headers, config) {
        	console.log(data);
    });
 };*/




  $scope.user = {
		interests : [{
			    "_id" : "5654b6c6e903c5aa96a19df2",
			    "name" : "Food"
			},
			{
			    "_id" : "5654b6c6e903c5aa96a19df3",
			    "name" : "Bars"
			},{
			    "_id" : "5654b6c6e903c5aa96a19df4",
			    "name" : "Condo"
			}],
			groups:[{
    "_id" : 13,
    "name" : "Toronto"
},
{
    "_id" : 14,
    "name" : "Etobicoke"
}]
	};
	$scope.showHero = true;

  $scope.feed = {
    type: 'group', /* types: dashboard, group, tag */
    group: {
      name: "myGroup"
    },
    tag: {
      name: "myTag"
    },
    posts:[
      {
        user:{
          username: "Chris",
          imageurl: "https://www.gravatar.com/avatar/89e0e971f58af7f776b880d41e2dde43?size=50"
        },
        html:"<p>This is my post!</p>"
      }
    ]
  }



  start();

});


//////////////////////////////////
//Added by Jim

crudApp.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/dashboard.html',
		controller: 'userController'
	});
	$routeProvider.when('/userList', {
		templateUrl: '/userList.html',
		controller: 'userController'
	});
	$routeProvider.when('/postList', {
		templateUrl: '/postList.html',
		controller: 'postController'
	});
	$routeProvider.when('/interestList', {
		templateUrl: '/interestList.html',
		controller: 'interestController'
	});
	$routeProvider.when('/groupList', {
		templateUrl: '/groupList.html',
		controller: 'groupController'
	});
	$routeProvider.otherwire({redirectTo: '/'});

	$locationProvider.html5Mode({enabled: true,requireBase: false});
});




crudApp.controller('groupController', function ($scope, $http, $location) {

	$scope.showMsg = false;

	$http({
		method:'GET',
		url: '/groups'
	}).then(function successCallback(res) {
		$scope.groupList = res.data.groups;

	}, function errorCallback(res) {
		console.log(res.data.error);
	});

	$scope.addGroup = function () {
		$location.path('/createGroup');
	};

	$scope.deleteGroup = function (id) {
		$http({
			method: 'DELETE',
			url: '/groups/group/' + id
		}).then(function successCallback(res) {
			for (var i = 0; i < $scope.groupList.length; i++) {
	 			if ($scope.groupList[i].name == name) {
	 				$scope.groupList.splice(i, 1);
	 			}
				$scope.showMsg = true;
				$scope.msg = res.data.message;
				$timeout(function() {
					$scope.showMsg = false;
				}, 3000);
			}
		}, function errorCallback(res) {
			$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
		});
	};
});


crudApp.controller('interestController', function ($scope, $http, $location) {

	$scope.showMsg = false;

	$http({
		method:'GET',
		url: '/interests'
	}).then(function successCallback(res) {
		$scope.interestList = res.data.interests;

	}, function errorCallback(res) {
		console.log(res.data.error);
	});

	$scope.submit = function () {
		if ($scope.interest == undefined) {
			$scope.showMsg = true;
			$scope.msg = "Please fill the blank";
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
		} else {
			$http({
				method: 'POST',
				url: '/interests/addnew'
			}).then(function successCallback(res) {
				$scope.showMsg = true;
				$scope.msg = res.data.message;
				$timeout(function() {
					$scope.showMsg = false;
				}, 3000);
			}, function errorCallback(res) {
				$scope.showMsg = true;
				$scope.msg = res.data.error;
				$timeout(function() {
					$scope.showMsg = false;
				}, 3000);
			});
		}
	};

	$scope.deleteInterest = function (name) {
		$http({
			method: 'DELETE',
			url: '/interests/interest/name'
		}).then(function successCallback(res) {
			for (var i = 0; i < $scope.interestList.length; i++) {
	 			if ($scope.interestList[i].name == name) {
	 				$scope.interestList.splice(i, 1);
	 			}
				$scope.showMsg = true;
				$scope.msg = res.data.message;
				$timeout(function() {
					$scope.showMsg = false;
				}, 3000);
			}
		}, function errorCallback(res) {
			$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
		});
	};

});


crudApp.controller('postController', function ($scope, $http, $location) {

	$scope.showMsg = false;

	$http({
		method:'GET',
		url: '/posts'
	}).then(function successCallback(res) {
		$scope.postList = res.data.posts;

	}, function errorCallback(res) {
		console.log(res.data.error);
	});

	$scope.getPost = function (id) {
		$location.path('/post/' + id);
	 };

	$scope.deletePost = function (id) {
		$http({
	 		method: 'DELETE',
	 		url: '/posts/posts/' + id
	 	}).then(function successCallback(res) {
 			for (var i = 0; i < $scope.postList.length; i++) {
	 			if ($scope.postList[i].id == id) {
	 				$scope.postList.splice(i, 1);
	 			}
 			};
 			$scope.showMsg = true;
			$scope.msg = res.data.message;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);


	 	}, function errorCallback(res) {
	 		$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
	 	});
	};

});


crudApp.controller('userController', function ($scope, $http, $location) {

		// $scope.userList =
	 // 			[{email: 'hello@fromtheotherside.com',
		// 		  password: 'dddd',
		// 		  accounttype: 2, //0 for Super Admin, 1 for Admin, 2 for user
		// 		  loggedin: 0,
		// 		  username: 'Adele',
		// 		  description: '25 now',
		// 		  //validation between 10 and 200 (vampires!)
		// 		  age: 25,
		// 		  gender: 'female', //for aliens!
		// 		  homeaddress: 'London',
		// 		  workplace: 'Some label',
		// 		  position: 'Songstress',
		// 		  contactinfo: 'Forget it',
		// 		  interests: [0, 2]},

		// 		  {email: 'borntodie@lana.com',
		// 		  password: 'dddd',
		// 		  accounttype: 1, //0 for Super Admin, 1 for Admin, 2 for user
		// 		  loggedin: 0,
		// 		  username: 'LanaDelRey',
		// 		  description: 'Off to the races!',
		// 		  //validation between 10 and 200 (vampires!)
		// 		  age: 25,
		// 		  gender: 'female', //for aliens!
		// 		  homeaddress: 'USA',
		// 		  workplace: 'Some label',
		// 		  position: 'Songstress',
		// 		  contactinfo: 'Forget it',
		// 		  interests: [0, 2]
		// 		}];

	$http({
		method:'GET',
		url: '/users'
	}).then(function successCallback(res) {
		$scope.userList = res.data.users;

	}, function errorCallback(res) {
		console.log(res.data.error);
	});

	 $scope.getUser = function (email) {
	 	$location.path('/userProfile/' + email);
	 };


	 $scope.delteUser = function (id) {
	 	$http({
	 		method: 'DELETE',
	 		url: '/users/profile/' + id
	 	}).then(function successCallback(res) {
 			for (var i = 0; i < $scope.userList.length; i++) {
	 			if ($scope.userList[i].id == id) {
	 				$scope.userList.splice(i, 1);
	 			}
 			};
 			$scope.showMsg = true;
			$scope.msg = res.data.message;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);


	 	}, function errorCallback(res) {
	 		$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
	 	});
	 };
});
