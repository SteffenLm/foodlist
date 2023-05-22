curl \
--location \
 --request POST "localhost:3000/auth/login" \
--header "Content-Type: application/json" \
--data-raw '{
    "username": "dev",
    "password": "Hello123!"
}' \
--silent \

