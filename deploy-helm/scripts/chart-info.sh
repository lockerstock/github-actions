CHART_PATH=$1

if [[ ! $CHART_PATH == *"Chart.yaml" ]]; then
    CHART_PATH="$CHART_PATH/Chart.yaml"
fi

OCI_SOURCE="$(yq e '.annotations.oci // .annotations.source // ""' $CHART_PATH)"

if [[ $OCI_SOURCE == oci://* ]]; then
    OCI_SOURCE="${OCI_SOURCE#oci://}"
fi

echo "oci=$OCI_SOURCE" >> $GITHUB_OUTPUT

if [ -n "$OCI_SOURCE" ]; then
    OCI_SOURCE_OWNER=$(substring=${OCI_SOURCE#*/}; echo ${substring%%/*})
    echo "oci_source_owner=$OCI_SOURCE_OWNER" >> $GITHUB_OUTPUT

    OCI_SOURCE_PACKAGE=$(substring=${OCI_SOURCE#*/}; echo ${substring#*/})
    echo "oci_source_package=$OCI_SOURCE_PACKAGE" >> $GITHUB_OUTPUT

    echo "has_oci=true" >> $GITHUB_OUTPUT
fi

VERSION_CONSTRAINT=$(yq e '.version' $CHART_PATH)

echo "oci_version_constraint=$VERSION_CONSTRAINT" >> $GITHUB_OUTPUT

if [[ $VERSION_CONSTRAINT == "latest" ]]; then 
    VERSION_CONSTRAINT=">=v0.0.0"
fi

echo "version_constraint=$VERSION_CONSTRAINT" >> $GITHUB_OUTPUT

REPOSITORY=$(yq e '.annotations.repository // ""' $CHART_PATH)
CHART=$(yq e '.annotations.chart // ""' $CHART_PATH)

echo "repository=$REPOSITORY" >> $GITHUB_OUTPUT 
echo "chart=$CHART" >> $GITHUB_OUTPUT 

if [[ -n $REPOSITORY && -n $CHART ]]; then
    echo "has_repo=true" >> $GITHUB_OUTPUT
fi
