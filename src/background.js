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
		url : "http://historify.sveri.de/api/browserlink",
		data : JSON.stringify({
			uri : tab.url.substr(0, 250),
			title : tab.title.substr(0, 250),
			visitedAt : Date.now(),
			clientId : "CHROME"
		}),
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		error : cannotPost
	});
}

function navigationCompleted(tab) {
	chrome.storage.sync.get("historify-token", function(items) {
		if (items["historify-token"] !== undefined) {
			postBrowserLink(tab, items["historify-token"]);
		} else {
			displayLoggedOutIcon();
		}
	});
}

var google_search_regex = new RegExp('http.*\/\/.*google.*url\?', 'i');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url !== undefined && !tab.url.startsWith("chrome://") && !tab.url.match(google_search_regex)) {
		navigationCompleted(tab);
	}
});
