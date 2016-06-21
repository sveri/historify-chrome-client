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

function logInToHistorify() {
	var username = $("#username").val();
	var password = $("#password").val();
	if (username && password) {
		$.ajax({
			type : "POST",
			url : "http://historify.sveri.de/apilogin",
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
}

function main() {
	isLoggedIn();

	$("#login-button").click(function() {
		logInToHistorify();
	});

	$(document).keypress(function(e) {
		if (e.which == 13) {
			logInToHistorify();
		}
	});

	$("#logout-button").click(function() {
		chrome.storage.sync.remove("historify-token", function() {
			displayLoggedOutHtml();
		});
	});
}

document.addEventListener('DOMContentLoaded', main);

chrome.browserAction.onClicked.addListener(isLoggedIn);
