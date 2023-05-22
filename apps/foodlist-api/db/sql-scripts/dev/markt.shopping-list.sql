INSERT INTO shopping_list
(
  shopping_list_id,
  shopping_list_name,
  shopping_list_creator
)
VALUES
(
  '00000000-0000-0000-0006-000000000002',
  'Market',
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
  '00000000-0000-0000-0006-000000000002',
  '00000000-0000-0000-0003-000000000017',
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
  '00000000-0000-0000-0006-000000000002',
  '00000000-0000-0000-0003-000000000020',
  '00000000-0000-0000-0002-000000000008',
  10,
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
  '00000000-0000-0000-0006-000000000002',
  '00000000-0000-0000-0003-000000000018',
  '00000000-0000-0000-0002-000000000005',
  100,
  3
);
