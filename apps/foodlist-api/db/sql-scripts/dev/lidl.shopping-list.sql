INSERT INTO shopping_list
(
  shopping_list_id,
  shopping_list_name,
  shopping_list_creator
)
VALUES
(
  '00000000-0000-0000-0006-000000000001',
  'Lidl',
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000015',
  '00000000-0000-0000-0002-000000000008',
  2,
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000016',
  '00000000-0000-0000-0002-000000000002',
  500,
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000017',
  '00000000-0000-0000-0002-000000000008',
  3,
  3
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000011',
  '00000000-0000-0000-0002-000000000001',
  1,
  4
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000012',
  '00000000-0000-0000-0002-000000000008',
  10,
  5
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
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0003-000000000013',
  '00000000-0000-0000-0002-000000000002',
  100,
  6
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0007-000000000001',
  'Toilet paper',
  7
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0007-000000000002',
  'Handkerchiefs',
  8
);

INSERT INTO shopping_list_text_item
(
  shopping_list_id,
  text_item_id,
  text_item_description,
  shopping_list_item_position
)
VALUES (
  '00000000-0000-0000-0006-000000000001',
  '00000000-0000-0000-0007-000000000006',
  'Soap',
  9
);
