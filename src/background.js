function displayLoggedOutIcon() {
	chrome.browserAction.setIcon({
		path : {
			"19" : "img/icon19_disconnected.png",
			"38" : "img/icon38_disconnected.png"
		}
	});
}

function displayLoggedInIcon() {
	chrome.browserAction.setIcon({
		path : {
			"19" : "img/icon19.png",
			"38" : "img/icon38.png"
		}
	});
}

function cannotPost(e) {
	displayLoggedOutIcon();
	chrome.storage.sync.remove("historify-token");
}

function postBrowserLink(tab, token) {
	$.ajax({
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + token);
		},
		type : "POST",
		url : "http://localhost:8080/api/browserlink",
		data : JSON.stringify({
			uri : tab.url,
			title : tab.title,
			visitedAt : Date.now(),
			clientId : "CHROME"
		}),
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		error : cannotPost
	});
}

function navigationCompleted(tab) {
	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		var tab = tabs[0];
		if (!tab.url.startsWith("chrome://")) {

			chrome.storage.sync.get("historify-token", function(items) {
				if (items["historify-token"] !== undefined) {
					postBrowserLink(tab, items["historify-token"]);
				} else {
					displayLoggedOuIcon();
				}
			});

		}

	});
}

// chrome.webNavigation.onCompleted.addListener(navigationCompleted);
chrome.webNavigation.onCommitted.addListener(navigationCompleted);