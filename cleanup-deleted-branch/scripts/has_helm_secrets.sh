#!/bin/bash

NAMESPACE=$1
VAR_NAME=$2

OUTPUT="false"

if [[ $(kubectl get secrets --namespace $NAMESPACE -o name | grep sh.helm.release) ]]; then
    OUTPUT="true"
fi

if [ -n "$VAR_NAME" ]; then
    echo "$VAR_NAME=$OUTPUT" >> $GITHUB_OUTPUT
else
    echo $OUTPUT
fi
