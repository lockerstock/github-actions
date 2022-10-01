#!/bin/bash

INPUT=$1
VAR_NAME=$2

# removes all content before and including last forward slash
SHORT_INPUT=${INPUT##*/}
# echo $SHORT_INPUT

# converts all alphabetical characters to lowercase
LOWERCASE=${SHORT_INPUT,,}
# echo $LOWERCASE

# replaces all non-alphanumeric characters with dashes
ALPHANUMERIC=$(echo $LOWERCASE | tr -cs '[:alnum:]' '-')
# echo $ALPHANUMERIC

# removes all leading and trailing dashes
NO_LEAD_TRAIL_DASHES=$(echo $ALPHANUMERIC | sed 's/^-\+//' | sed 's/-\+$//')
# echo $NO_LEAD_TRAIL_DASHES

# truncates string to 63 for subdomain maximum
OUTPUT=${NO_LEAD_TRAIL_DASHES:0:63}

if [ -n "$VAR_NAME" ]; then
    echo "::set-output name=$VAR_NAME::$OUTPUT"
else
    echo $OUTPUT
fi