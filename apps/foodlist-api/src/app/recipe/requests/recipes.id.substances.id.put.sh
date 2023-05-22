curl \
--location \
--request PUT "localhost:3000/recipes/${1}/substances/${2}" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "substanceUnit": "1",
    "substanceAmount": 100
}' \
--silent
