curl \
--location \
--request POST "localhost:3000/recipes" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "recipeName": "Geiles Penne mal 3 oder mehr",
    "recipeServings": 1
}' \
--silent
