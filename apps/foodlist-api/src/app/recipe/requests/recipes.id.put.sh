curl \
--location \
--request PUT "localhost:3000/recipes/${1}" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "recipeServings": 1000
}' \
--silent
