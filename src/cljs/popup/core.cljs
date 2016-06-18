(ns popup.core
  (:require
    [dommy.core :as dommy :refer-macros [sel1]]
    [goog.dom.forms :as gforms]
    [goog.dom :as gdom]))

(defn main [content-loaded-event]
  (js/alert (gdom/getElement "#login-button"))
  (let [login-button (gdom/getElement "#login-button")]
    (set! (.-onclick login-button) #(js/alert "clicked that thing"))))

  ;(js/alert "a"))



;(defn get-value [elem]
;  (gforms/getValue (gdom/getElement elem)))

;(js/alert "popup")
(.addListener js/chrome.webNavigation.onCompleted main)


;(dommy/listen! (sel1 :#login-button) :click #(.log js/alert "uiaertn"))
;
;(let [signinLink (gdom/getElement "#login-button")]
;  (set! (.-onclick signinLink) #(js/alert "clicked that thing")))

(.addEventListener js/document "DOMContentLoaded" main)


;document.addEventListener('DOMContentLoaded', function() {})
 ;var link = document.getElementById('link');
 ;    // onClick's logic below:
 ;    link.addEventListener('click', function() {
 ;                                               hellYeah('xxx')});
 ;                                               ;
 ;;