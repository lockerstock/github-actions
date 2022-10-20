#!/bin/bash

NAMESPACE=$1
VAR_NAME=$2

OUTPUT=$(kubectl get namespace $NAMESPACE -o json --ignore-not-found | jq -r tostring)

if [ -n "$VAR_NAME" ]; then
    echo "$VAR_NAME=$OUTPUT" >> $GITHUB_OUTPUT
else
    echo $OUTPUT
fi