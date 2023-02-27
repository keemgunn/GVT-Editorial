#!/bin/bash

# functions ======================
function ask(){
    if [ "$bool" == "y" -o "$bool" == "Y" ]; then
        echo "YOU TYPED YES"
        # connect
    elif [ "$bool" == "n" -o "$bool" == "N" ]; then
        read -p "YOU TYPED NO"
    else
        echo -n "choose between [Y/N]: "
        read bool
        ask
    fi
}
function connect(){
    ssh -i /Users/gunn/aws-keemgunn-web.pem ec2-user@52.78.122.124
}


# # Build Client App Modifications
# cd /Users/gunn/codespaces/keemgunn-web-v2-frontend
# npm run build

# # Stage All changes and Make Commitment
# cd /Users/gunn/codespaces/keemgunn-web-v2-backend
# echo -n "Commit Message: "
# read message
# git add .
# git commit -a -m "$message"

# # Push All Commitments to Remote Repository
# git push --all

# Push All Commitments to Remote Repository
echo -n "TEST COMMAND FILE [Y/N] "
read bool

# Ask user to connect to Server
ask