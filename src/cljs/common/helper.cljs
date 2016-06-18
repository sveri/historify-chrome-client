(ns common.helper)

(defn by-id [id]
  (.getElementById js/document id))