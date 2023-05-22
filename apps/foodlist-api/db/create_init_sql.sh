if [ -f ./init.sql ]; then
  rm ./init.sql
fi

cat ./schema/create_schema.sql  >> ./init.sql
cat ./schema/create_tables.sql  >> ./init.sql
cat ./static/substance_type.sql  >> ./init.sql
cat ./static/unit.sql  >> ./init.sql

cat ./admin/app_user.sql  >> ./init.sql
cat ./admin/substance.sql  >> ./init.sql

cat ./dev/app_user.sql  >> ./init.sql
cat ./dev/substance.sql  >> ./init.sql

cat ./dev/apfel-porridge.recipe.sql  >> ./init.sql
cat ./dev/butterzopf.recipe.sql  >> ./init.sql
cat ./dev/wiener-schnitzel.recipe.sql  >> ./init.sql

cat ./dev/lidl.shopping-list.sql  >> ./init.sql
cat ./dev/dm.shopping-list.sql  >> ./init.sql
cat ./dev/markt.shopping-list.sql  >> ./init.sql
cat ./dev/edeka.shopping-list.sql  >> ./init.sql
