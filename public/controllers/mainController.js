var crudApp = angular.module('crudApp');


 crudApp.controller('mainController', function($scope, $location, $http, $route, sharedService) {

 	$scope.showNavBar = false;
 	$scope.$on("update_nav_bar", function(event, show){
			$scope.showNavBar = show;
			console.log('I am triggered!');
			populateNavBar();


			/* Trigger the fill in methods */
	});

	$scope.$on("update_test", function(event){
			console.log('update_test I am triggered! ' + $scope.state.is_group_page);


			/* Trigger the fill in methods */
	});


 	/*
		1. Dashboard
		- populate the main feed (different methods)
		- populate the side bar for the user
		- populate interests, groups
		- populate name, admin/not admin
	 */

 	$scope.state = {
        username: 'Chris',
         admin: true,
         super_admin: true,
         profile_is_admin: true,
         main_dashboard: true,
         admin_dashboard : false,
         is_logged : true,
         is_searching: false,
         is_group_page: false,
         is_showing_interest: false,

         //The search bar is in the scope of the feedController
         //Question: if we overwrite is_showing_interest in feedContrl, will it be
      };

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
			    "name" : "Hello"
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



$scope.logOut = function() {
 alert('logOut');
}


 $scope.getPostByInterest = function(interest_id) {
 	 resetStateVariables();
	 $scope.state.is_showing_interest = true;
	 sharedService.setData({interestid : interest_id});
	 $location.path("/feed");
  	 $route.reload();

 };

$scope.getPostByGroup = function(group_id){
	console.log('getPostByGroup: ' + group_id);
	resetStateVariables();
	$scope.state.is_group_page = true;
	sharedService.setData({groupid : group_id});
  	$location.path("/feed");
  	$route.reload();
};

 $scope.getAdminDashBoard = function() {
 	alert('Admin Dash!');

};

$scope.getMainDashBoard = function() {
	resetStateVariables();
 	$scope.state.main_dashboard = true;
 	$location.path("/feed");
  	$route.reload();
};


var resetStateVariables = function () {
	$scope.state.main_dashboard = false;
	$scope.state.is_showing_interest = false;
	$scope.state.is_group_page = false;
	$scope.state.main_dashboard = false;
	$scope.state.admin_dashboard = false;
	$scope.state.admin_dashboard = false;
	$scope.state.is_searching = false;
};

 $scope.getUserProfile = function(user_name) {
 alert(user_name);
 /* Navigate to User Profile page with this username. */
};

 var populateNavBar = function(){
	$http.get('/auth/loggedInUser').success(function(data, status, headers, config) {
    	var account = data.user.accounttype;
    	if (account == 0){
    		$scope.state.admin = true;
         	$scope.state.super_admin = true;
    	} else if (account == 1){
    		$scope.state.admin = true;
         	$scope.state.super_admin = false;
         } else {
         	$scope.state.admin = false;
         	$scope.state.super_admin = false;
         }
   		//var username = data.user.username; //Should be a JSON object
   		$scope.state.username = data.user.username;
    	//var id = data.user._id;
		populateInterests(data.user.username);
		populateUserGroups();
    });
 };

 var populateUserGroups = function(){
  	$http.get('/users/user/groups').success(function(data, status, headers, config) {
        $scope.user.groups = data;

    });
 };

 var populateInterests = function(username){
 	$http({
  		method: 'GET',
        url: '/users/profile', //get all user emails & displayname
        params: {username: username}
    })
  	.then(function successCallback(response) {
  		$scope.user.interests = response.data.interests;

    },
    function errorCallback(response) {
    	console.log(response);

    });
 };

 });
