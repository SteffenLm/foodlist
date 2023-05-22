INSERT INTO recipe
(
  recipe_id,
  recipe_name,
  recipe_servings,
  recipe_creator
)
VALUES (
  '00000000-0000-0000-0004-000000000003',
  'Wiener Schnitzel',
  4,
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000015',
  '00000000-0000-0000-0002-000000000008',
  4
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000019',
  '00000000-0000-0000-0002-000000000002',
  150
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000020',
  '00000000-0000-0000-0002-000000000008',
  2
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000016',
  '00000000-0000-0000-0002-000000000002',
  300
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000017',
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000021',
  '00000000-0000-0000-0002-000000000009',
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
  '00000000-0000-0000-0004-000000000003',
  '00000000-0000-0000-0003-000000000018',
  '00000000-0000-0000-0002-000000000005',
  2
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
  '00000000-0000-0000-0005-000000000007',
  '00000000-0000-0000-0004-000000000003',
  'Gently pound the cutlets between cling film. Salt the meat on both sides, turn in flour, pat down, drag through the eggs and turn in the breadcrumbs.',
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
  '00000000-0000-0000-0005-000000000008',
  '00000000-0000-0000-0004-000000000003',
  'Bake the cutlets about 2 fingers high in shortening until golden brown. While baking, shake the pan a little so that the cutlets are evenly golden brown. Lift out the escalopes and drain on kitchen paper.',
  2
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
  '00000000-0000-0000-0005-000000000009',
  '00000000-0000-0000-0004-000000000003',
  'Cut the lemon into wedges and garnish the finished Wiener Schnitzel with lemon wedges.',
  3
);
