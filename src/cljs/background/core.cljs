(ns background.core)

(defn main [tab])

  ;(js/alert "foooooooooooooooddoooodoobarr"))



(.addListener js/chrome.webNavigation.onCompleted main)