jwt_token=$(./auth.post.login.sh | jq .token -r)
rm ~/.foodlist_api_token
echo export FOODLIST_API_TOKEN="${jwt_token}" >> ~/.foodlist_api_token
echo export FOODLIST_API_AUTHORIZATION_HEADER="\"Authorization: Bearer ${jwt_token}\"" >> ~/.foodlist_api_token
