exeIfDirExists() {
    local CURR_DIR=$PWD
    DIRECTORY=$1
    COMMAND=$2
    echo "FROM ROOT DIR        : $PWD"
    if [ -d "$DIRECTORY" ]; then
        echo "INSTALLING MODULES IN: $DIRECTORY"
        echo "EXECUTING            : $COMMAND"
    else 
        echo "***ERROR: DIRECTORY $DIRECTORY not found"
        echo "***ERROR: COMMAND $COMMAND NOT EXECUTED" 
    fi
    cd $CURR_DIR
}

clear
echo "======================spcoin-hardhat-contract-access-test================================="
pwd
exeIfDirExists "cd ./node_modules-dev/spcoin-common/spcoin-lib" npm i
exeIfDirExists ./node_modules-dev/spcoin-back-end/spcoin-access-modules npm i
exeIfDirExists ./node_modules-dev/spcoin-back-end/spcoin-weth-module-cjs npm i
