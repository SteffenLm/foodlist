curl \
--location \
--request POST "localhost:3000/recipes/${1}/steps" \
--header "${FOODLIST_API_AUTHORIZATION_HEADER}" \
--header "Content-Type: application/json" \
--data-raw '{
    "stepInstruction": "Essen!",
    "stepNumber": 3
}' \
--silent
