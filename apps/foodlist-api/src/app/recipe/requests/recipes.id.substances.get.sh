curl \
--location \
--request GET "localhost:3000/recipes/${1}/substances" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--silent \
