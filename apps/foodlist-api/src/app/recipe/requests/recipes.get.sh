curl \
--location \
--request GET "localhost:3000/recipes" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--silent \
