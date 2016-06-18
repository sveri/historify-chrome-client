(ns popup.core)

(defn main [tab]

  (js/alert "foooooooooooooooddoooodoobarr"))



(.addListener js/chrome.webNavigation.onCompleted main)