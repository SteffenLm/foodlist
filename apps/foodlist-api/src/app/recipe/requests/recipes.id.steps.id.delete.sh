curl \
--location \
--request DELETE "localhost:3000/recipes/${1}/steps/${2}" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--silent
