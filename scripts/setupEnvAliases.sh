export CURR_DIR=$PWD
#cd ..

#echo "Configuring SponsorCoin Environment"
export PROJECT_HOME=$PWD
export ENV_DIR=$PROJECT_HOME'/.e'
export LOGS_DIR=$ENV_DIR/logs

echo PROJECT_HOME=$PROJECT_HOME
echo ENV_DIR=$ENV_DIR
echo LOGS_DIR=$LOGS_DIR

echo "Adding startup configuration Files to Sponsor Coin environment setup file $ENV_DIR/.e"
echo "set -o vi" | tee $ENV_DIR/.e
echo "export PROJECT_HOME=$PROJECT_HOME" | tee -a $ENV_DIR/.e
echo "export ENV_DIR=$ENV_DIR" | tee -a $ENV_DIR/.e
echo "export SPONSOR_COIN_LOG=$LOGS_DIR" | tee -a $ENV_DIR/.e
echo "export HH_SCRIPTS=$PROJECT_HOME/scripts" | tee -a $ENV_DIR/.e
echo ". $ENV_DIR/.a" | tee -a $ENV_DIR/.e
echo m | tee -a $ENV_DIR/.e

echo "Adding sponsor coin startup configuration Files to bootstrap file ~/.baschrc"
echo ". "$ENV_DIR"/.e" | tee -a ~/.bashrc

echo "Starting The Project Environment"
. $ENV_DIR/.e
cd $CURR_DIR
echo "***IMPORTANT *** Please ensure the '.env' file is configured for proper operations"

#echo "Adding sponsor coin startup configuration Files to bootstrap file ~/.baschrc"
#echo ". "$ENV_DIR"/.e" | tee -a ~/.bashrc
#. $ENV_DIR/.e
#echo "***IMPORTANT *** Please ensure the '.env' file is configured for proper operations"


# echo "Adding startup configuration Files to bootstrap file ~/.baschrc"
# echo "export PROJECT_HOME=$PROJECT_HOME" | tee -a ~/.bashrc
# echo "export ENV_DIR=$ENV_DIR" | tee -a ~/.bashrc
# echo "export LOGS_DIR=$LOGS_DIR" | tee -a ~/.bashrc

