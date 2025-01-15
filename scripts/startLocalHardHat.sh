#INITIALIZE SCRIPT STARTUP
clear
CURR_DIR=$PWD
cd $ACTIVE_PROJECT_HOME
SINGLE_LINE="-----------------------------------------------------------------------"
DOUBLE_LINE="======================================================================="
echo $DOUBLE_LINE
echo CHANGING DIRECTORY
echo from: $CURR_DIR 
echo to  : $ACTIVE_PROJECT_HOME/scripts

#START HARDHAT
echo $SINGLE_LINE
echo STARTING HARDHAT
echo $SINGLE_LINE
npx hardhat node;
echo $SINGLE_LINE
echo HARDHAT STARTED
echo $DOUBLE_LINEecho $DOUBLE_LINE

# START TOKEN DEPLOYMENTS
#cd $HH_SCRIPTS

#echo DEPLOYING TOKENS
#echo $SINGLE_LINE
#deploytokens
#echo $SINGLE_LINE
#echo TOKEN DEPLOYMENTS COMPLETE
#echo $DOUBLE_LINE
cd $CURR_DIR