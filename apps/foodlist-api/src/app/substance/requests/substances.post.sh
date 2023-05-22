curl \
--location \
--request POST "localhost:3000/substances" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "substanceName": "Test1211",
    "substanceTypeId": 1,
    "substanceDefaultUnit": 2
}' \
--silent
