#!/bin/bash

NAMESPACE=$1
VAR_NAME=$2

OUTPUT="false"

if [[ $(kubectl get secrets --namespace $NAMESPACE -o name | grep sh.helm.release) ]]; then
    OUTPUT="true"
fi

if [ -n "$VAR_NAME" ]; then
    echo "::set-output name=$VAR_NAME::$OUTPUT"
else
    echo $OUTPUT
fi
