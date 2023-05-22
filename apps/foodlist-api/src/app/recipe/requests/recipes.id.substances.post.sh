curl \
--location \
--request POST "localhost:3000/recipes/${1}/substances" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header "Content-Type: application/json" \
--data-raw '{
    "substanceId": "1",
    "substanceUnit": "1",
    "substanceAmount": 100
}' \
--silent
