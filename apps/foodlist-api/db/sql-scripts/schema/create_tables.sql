CREATE TABLE app_user (
  user_id uuid DEFAULT gen_random_uuid(),
  mail VARCHAR(255) UNIQUE NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE unit (
  unit_id uuid DEFAULT gen_random_uuid(),
  unit_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (unit_id)
);

CREATE TABLE substance_type (
  substance_type_id uuid DEFAULT gen_random_uuid(),
  substance_type_name VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (substance_type_id)
);

CREATE TABLE substance (
  substance_id uuid DEFAULT gen_random_uuid(),
  substance_name VARCHAR(255) NOT NULL,
  substance_type uuid NOT NULL,
  substance_creator uuid NOT NULL,
  substance_default_unit uuid NOT NULL,
  PRIMARY KEY (substance_id),
  FOREIGN KEY (substance_creator) REFERENCES app_user (user_id),
  FOREIGN KEY (substance_default_unit) REFERENCES unit (unit_id),
  FOREIGN KEY (substance_type) REFERENCES substance_type (substance_type_id)
);

CREATE TABLE recipe (
  recipe_id uuid DEFAULT gen_random_uuid(),
  recipe_name VARCHAR(255) NOT NULL,
  recipe_servings INT NOT NULL DEFAULT 2,
  recipe_creator uuid NOT NULL,
  PRIMARY KEY (recipe_id),
  FOREIGN KEY (recipe_creator) REFERENCES app_user (user_id)
);

CREATE TABLE recipe_substance (
  recipe_id uuid NOT NULL,
  substance_id uuid NOT NULL,
  substance_unit uuid NOT NULL,
  substance_amount DECIMAL(6,2),
  PRIMARY KEY (recipe_id,substance_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id),
  FOREIGN KEY (substance_id) REFERENCES substance (substance_id),
  FOREIGN KEY (substance_unit) REFERENCES unit (unit_id)
);

CREATE TABLE recipe_step (
  recipe_step_id uuid DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL,
  step_instruction TEXT NOT NULL,
  step_number INT NOT NULL,
  PRIMARY KEY (recipe_step_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id)
);

CREATE TABLE recipe_step_substance (
  recipe_step_id uuid NOT NULL,
  substance_id uuid NOT NULL,
  PRIMARY KEY (recipe_step_id, substance_id),
  FOREIGN KEY (recipe_step_id) REFERENCES recipe_step (recipe_step_id),
  FOREIGN KEY (substance_id) REFERENCES substance (substance_id)
);

CREATE TABLE shopping_list (
  shopping_list_id uuid DEFAULT gen_random_uuid(),
  shopping_list_name VARCHAR(255),
  shopping_list_creator uuid NOT NULL,
  PRIMARY KEY (shopping_list_id),
  FOREIGN KEY (shopping_list_creator) REFERENCES app_user (user_id)
);

CREATE TABLE shopping_list_substance_item (
  shopping_list_id uuid NOT NULL,
  substance_id uuid NOT NULL,
  substance_unit uuid NOT NULL,
  substance_amount DECIMAL(6,2),
  shopping_list_item_position INT NOT NULL,
  PRIMARY KEY (shopping_list_id, substance_id),
  FOREIGN KEY (shopping_list_id) REFERENCES shopping_list (shopping_list_id),
  FOREIGN KEY (substance_id) REFERENCES substance (substance_id),
  FOREIGN KEY (substance_unit) REFERENCES unit (unit_id)
);

CREATE TABLE shopping_list_text_item (
  shopping_list_id uuid NOT NULL,
  text_item_id uuid DEFAULT gen_random_uuid(),
  text_item_description VARCHAR(255),
  shopping_list_item_position INT NOT NULL,
  PRIMARY KEY (text_item_id),
  FOREIGN KEY (shopping_list_id) REFERENCES shopping_list (shopping_list_id)
);

