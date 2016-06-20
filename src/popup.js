/*jshint esversion: 6 */

//const
//history_token_key = "historify-token";

function displayLoggedOutHtml(){
	
}

function displayLoggedInHtml(){
	
}

function storeToken(data) {
	chrome.storage.sync.set({
		"historify-token" : data.token
	}, function() {
		$("#login-form").hide();
		$("#loggedin").show();
	});
}

function showError(e) {
	$("#error").text(JSON.stringify(e));
}

function main() {
	
	chrome.storage.sync.get("historify-token", function(items){
		if(items["historify-token"] !== undefined){
			$("#login-form").hide();
			$("#loggedin").show();			
		} else  {
			$("#login-form").show();
			$("#loggedin").hide();			
		}
	});
	
	
	$("#login-button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		// if (username && password) {
		$.ajax({
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			type : "POST",
			url : "http://localhost:8080/apilogin",
			data : JSON.stringify({
				name : "admin",
				password : "admin"
			}),
			dataType : 'json',
			contentType : "application/json; charset=utf-8",
			success : storeToken,
			error : showError
		});
		// }
	});

	$("#logout-button").click(function() {
		chrome.storage.sync.remove("historify-token", function() {
			$("#login-form").show();
			$("#loggedin").hide();
		});
	});
}

document.addEventListener('DOMContentLoaded', main);
