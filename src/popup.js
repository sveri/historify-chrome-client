/*jshint esversion: 6 */

function displayLoggedOutHtml() {
	$("#login-form").show();
	$("#loggedin").hide();
	chrome.browserAction.setIcon({
		path : {
			"19" : "img/icon19_disconnected.png",
			"38" : "img/icon38_disconnected.png"
		}
	});
}

function displayLoggedInHtml() {
	$("#login-form").hide();
	$("#loggedin").show();
	chrome.browserAction.setIcon({
		path : {
			"19" : "img/icon19.png",
			"38" : "img/icon38.png"
		}
	});
}

function storeToken(data) {
	chrome.storage.sync.set({
		"historify-token" : data.token
	}, function() {
		displayLoggedInHtml();
	});
}

function showError(e) {
	$("#error").text(JSON.stringify(e));
}

function isLoggedIn() {
	chrome.storage.sync.get("historify-token", function(items) {
		if (items["historify-token"] !== undefined) {
			displayLoggedInHtml();
		} else {
			displayLoggedOutHtml();
		}
	});
}

function defineEvents() {
	$(document).keypress(function(e) {
		if (e.which == 13) {
			$('#login-button').click();
			e.preventDefault();
		}
	});

	$("#login-button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if (username && password) {
			$.ajax({
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
				},
				type : "POST",
				url : "http://localhost:8080/apilogin",
				data : JSON.stringify({
					name : username,
					password : password
				}),
				dataType : 'json',
				contentType : "application/json; charset=utf-8",
				success : storeToken,
				error : showError
			});
		}
	});

	$("#logout-button").click(function() {
		chrome.storage.sync.remove("historify-token", function() {
			displayLoggedOutHtml();
		});
	});

}

function main() {
	isLoggedIn();

	defineEvents();
}

document.addEventListener('DOMContentLoaded', main);

chrome.browserAction.onClicked.addListener(isLoggedIn);
