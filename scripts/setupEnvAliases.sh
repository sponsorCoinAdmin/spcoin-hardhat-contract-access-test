clear
echo ==== SETTING UP ENVIRONMENT VARIABLES ====
export ACTIVE_PROJECT_NAME=$(basename $PWD)

#echo "Configuring SponsorCoin Environment"
export ACTIVE_PROJECT_PATH=$PWD
export ACTIVE_ENV_PATH=$ACTIVE_PROJECT_PATH'/.e'
export LOGS_DIR=$ACTIVE_ENV_PATH/logs

echo ACTIVE_PROJECT_PATH=$ACTIVE_PROJECT_PATH
echo ACTIVE_ENV_PATH=$ACTIVE_ENV_PATH
echo LOGS_DIR=$LOGS_DIR

echo "Adding startup configuration Files to Sponsor Coin environment setup file $ACTIVE_ENV_PATH/.e"
echo "export ACTIVE_PROJECT_PATH=$ACTIVE_PROJECT_PATH" | tee -a $ACTIVE_ENV_PATH/.e
echo "export ACTIVE_ENV_PATH=$ACTIVE_ENV_PATH"         | tee -a $ACTIVE_ENV_PATH/.e
echo "export SPONSOR_COIN_LOG=$LOGS_DIR"               | tee -a $ACTIVE_ENV_PATH/.e
echo "export HH_SCRIPTS=$ACTIVE_PROJECT_PATH/scripts"  | tee -a $ACTIVE_ENV_PATH/.e
echo ". $ACTIVE_ENV_PATH/.a"                           | tee -a $ACTIVE_ENV_PATH/.e
# echo m                                                 | tee -a $ACTIVE_ENV_PATH/.e

echo "Adding sponsor coin startup configuration Files to bootstrap file ~/.baschrc"
sed -i '/ACTIVE_ENV_PATH/d' ~/.bashrc
echo "export ACTIVE_ENV_PATH=$ACTIVE_ENV_PATH/.e"                                        | tee -a ~/.bashrc
echo ". \$ACTIVE_ENV_PATH"                                                               | tee -a ~/.bashrc

#echo ". "$ACTIVE_ENV_PATH"/.e" | tee -a ~/.bashrc

echo "Starting The Project Environment"
. $ACTIVE_ENV_PATH/.e
cd $CURR_DIR
echo "***IMPORTANT *** Please ensure the '.env' file is configured for proper operations"
