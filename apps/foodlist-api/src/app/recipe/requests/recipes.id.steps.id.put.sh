curl \
--location \
--request PUT "localhost:3000/recipes/${1}/steps/${2}" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "stepInstruction": "Mehr davon Essen!",
    "stepNumber": 3
}' \
--silent
