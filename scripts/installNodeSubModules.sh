clear
echo "======================spcoin-hardhat-contract-access-test================================="
pwd
ls
CURR_DIR=$PWD
cd ./node_modules-dev/spcoin-common/spcoin-lib
pwd
npm i
cd $CURR_DIR
cd ./node_modules-dev/spcoin-back-end/spcoin-access-modules
npm i
cd $CURR_DIR
cd ./node_modules-dev/spcoin-back-end/spcoin-weth-module-cjs
npm i
cd $CURR_DIR
