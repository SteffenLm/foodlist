curl \
--location \
--request PUT "localhost:3000/substances/${1}" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "substanceName": "Penne",
    "substanceDefaultUnit": "1"
}' \
--silent
