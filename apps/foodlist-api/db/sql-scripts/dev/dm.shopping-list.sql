INSERT INTO shopping_list
(
  shopping_list_id,
  shopping_list_name,
  shopping_list_creator
)
VALUES
(
  '00000000-0000-0000-0006-000000000003',
  'dm',
  '00000000-0000-0000-0000-000000000002'
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000003',
  '00000000-0000-0000-0007-000000000003',
  'Mascara',
  1
);
