#!/bin/bash

NAMESPACE=$1
VAR_NAME=$2

OUTPUT=$(kubectl get namespace $NAMESPACE -o json --ignore-not-found | jq -r tostring)

if [ -n "$VAR_NAME" ]; then
    echo "::set-output name=$VAR_NAME::$OUTPUT"
else
    echo $OUTPUT
fi