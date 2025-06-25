#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-58479-6ba0ec68/tic_tac_toe_frontend_workspace/tic_tac_toe_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

