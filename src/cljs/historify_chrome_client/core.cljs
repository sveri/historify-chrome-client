(ns historify-chrome-client.core)

(defn main [tab]

  (js/alert "foooooooooooooooddoooodoobarr"))



(.addListener js/chrome.webNavigation.onCompleted main)