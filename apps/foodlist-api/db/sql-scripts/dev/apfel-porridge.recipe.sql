INSERT INTO recipe
(
  recipe_id,
  recipe_name,
  recipe_servings,
  recipe_creator
)
VALUES
(
  '00000000-0000-0000-0004-000000000001',
  'Apple porridge',
  2,
  '00000000-0000-0000-0000-000000000002'
);


INSERT INTO recipe_substance
(
  recipe_id,
  substance_id,
  substance_unit,
  substance_amount
)
VALUES
(
  '00000000-0000-0000-0004-000000000001',
  '00000000-0000-0000-0003-000000000003',
  '00000000-0000-0000-0002-000000000008',
  1
);

INSERT INTO recipe_substance
(
  recipe_id,
  substance_id,
  substance_unit,
  substance_amount
)
VALUES
(
  '00000000-0000-0000-0004-000000000001',
  '00000000-0000-0000-0003-000000000006',
  '00000000-0000-0000-0002-000000000002',
  120
);

INSERT INTO recipe_substance
(
  recipe_id,
  substance_id,
  substance_unit,
  substance_amount
)
VALUES
(
  '00000000-0000-0000-0004-000000000001',
  '00000000-0000-0000-0003-000000000007',
  '00000000-0000-0000-0002-000000000003',
  360
);


INSERT INTO recipe_step
(
  recipe_step_id,
  recipe_id,
  step_instruction,
  step_number
)
VALUES
(
  '00000000-0000-0000-0005-000000000001',
  '00000000-0000-0000-0004-000000000001',
  'Warm the oat flakes with the oat milk in a saucepan and stir.',
  1
);

INSERT INTO recipe_step
(
  recipe_step_id,
  recipe_id,
  step_instruction,
  step_number
)
VALUES
(
  '00000000-0000-0000-0005-000000000002',
  '00000000-0000-0000-0004-000000000001',
  'Add the grated apple.',
  2
);


INSERT INTO recipe_step_substance
(
  recipe_step_id,
  substance_id
)
VALUES
(
  '00000000-0000-0000-0005-000000000001',
  '00000000-0000-0000-0003-000000000006'
);

INSERT INTO recipe_step_substance
(
  recipe_step_id,
  substance_id
)
VALUES
(
  '00000000-0000-0000-0005-000000000001',
  '00000000-0000-0000-0003-000000000007'
);

INSERT INTO recipe_step_substance
(
  recipe_step_id,
  substance_id
)
VALUES
(
  '00000000-0000-0000-0005-000000000002',
  '00000000-0000-0000-0003-000000000003'
);
