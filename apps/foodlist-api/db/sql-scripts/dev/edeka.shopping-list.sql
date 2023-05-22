INSERT INTO shopping_list
(
  shopping_list_id,
  shopping_list_name,
  shopping_list_creator
)
VALUES
(
  '00000000-0000-0000-0006-000000000004',
  'Edeka',
  '00000000-0000-0000-0000-000000000002'
);


INSERT INTO shopping_list_substance_item
(
  shopping_list_id,
  substance_id,
  substance_unit,
  substance_amount,
  shopping_list_item_position
)
VALUES
(
  '00000000-0000-0000-0006-000000000004',
  '00000000-0000-0000-0003-000000000008',
  '00000000-0000-0000-0002-000000000002',
  500,
  1
);

INSERT INTO shopping_list_substance_item
(
  shopping_list_id,
  substance_id,
  substance_unit,
  substance_amount,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000004',
  '00000000-0000-0000-0003-000000000009',
  '00000000-0000-0000-0002-000000000003',
  2,
  2
);

INSERT INTO shopping_list_substance_item
(
  shopping_list_id,
  substance_id,
  substance_unit,
  substance_amount,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000004',
  '00000000-0000-0000-0003-000000000010',
  '00000000-0000-0000-0002-000000000002',
  250,
  3
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000004',
  '00000000-0000-0000-0007-000000000004',
  'Bouquet of flowers',
  4
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000004',
  '00000000-0000-0000-0007-000000000005',
  'Handkerchiefs',
  5
);
