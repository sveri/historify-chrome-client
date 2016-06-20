#!/bin/bash
sed -i -e 's/localhost\:8080/historify\.sveri\.de/g' ../src/popup.js
sed -i -e 's/localhost\:8080/historify\.sveri\.de/g' ../src/background.js