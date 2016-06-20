#!/bin/bash
sed -i -e 's/historify\.sveri\.de/localhost\:8080/g' ../src/popup.js
sed -i -e 's/historify\.sveri\.de/localhost\:8080/g' ../src/background.js