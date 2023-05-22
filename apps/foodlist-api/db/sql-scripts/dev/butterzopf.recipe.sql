INSERT INTO recipe
(
  recipe_id,
  recipe_name,
  recipe_servings,
  recipe_creator
)
VALUES
(
  '00000000-0000-0000-0004-000000000002',
  'Butter plait',
  12,
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000008',
  '00000000-0000-0000-0002-000000000002',
  600
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000009',
  '00000000-0000-0000-0002-000000000003',
  200
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000010',
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000014',
  '00000000-0000-0000-0002-000000000002',
  45
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000005',
  '00000000-0000-0000-0002-000000000002',
  100
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000011',
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000012',
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
  '00000000-0000-0000-0004-000000000002',
  '00000000-0000-0000-0003-000000000013',
  '00000000-0000-0000-0002-000000000002',
  50
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
  '00000000-0000-0000-0005-000000000003',
  '00000000-0000-0000-0004-000000000002',
  'Sieve the flour into a bowl and make a well. Crumble room-warm yeast into the well. Add 100 ml lukewarm milk and 2 tablespoons sugar and stir with your fingers in the well to form a pre-dough. Add some of the flour. Leave to rise in a warm place for about a quarter of an hour until the pre-dough has doubled in size. Cover the bowl.',
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
  '00000000-0000-0000-0005-000000000004',
  '00000000-0000-0000-0004-000000000002',
  'Add the butter in flakes to the bowl. Add the rest of the ingredients (except the egg yolk and almonds) and knead into a smooth, shiny dough. Cover again and leave to rise again. This time at least 1 hour.',
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
  '00000000-0000-0000-0005-000000000005',
  '00000000-0000-0000-0004-000000000002',
  'Preheat the oven to 180 degrees Celsius top and bottom heat. Knead the dough again and divide into three equal parts. Form these parts into rolls 50 cm long and 4 cm thick. Braid the dough into a plait and place on a baking tray lined with baking paper. Cover with a clean tea towel and leave to rise for another 15 minutes.',
  3
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
  '00000000-0000-0000-0005-000000000006',
  '00000000-0000-0000-0004-000000000002',
  'Whisk the egg yolk and brush over the plait. Sprinkle with hail sugar. Bake in the oven on the Bake in the oven on the middle shelf for approx. 25-30 minutes.',
  4
);
