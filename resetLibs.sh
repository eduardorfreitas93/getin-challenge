#!/bin/bash

FILE_PACKAGE_LOCK=./package-lock.json
DIR_NODE_MODULES=./node_modules

FILE_IOS_PODFILE=./ios/Podfile.lock
DIR_IOS_PODS=./ios/Pods

if [[ -f "$FILE_PACKAGE_LOCK" ]]; then
    rm "$FILE_PACKAGE_LOCK"
fi

if [[ -d "$DIR_NODE_MODULES" ]]; then
  rm -rf "$DIR_NODE_MODULES"
fi

if [[ -f "$FILE_IOS_PODFILE" ]]; then
  rm "$FILE_IOS_PODFILE"
fi

if [[ -d "$DIR_IOS_PODS" ]]; then
  rm -rf "$DIR_IOS_PODS"
fi

npm install
(cd ios; pod install)
