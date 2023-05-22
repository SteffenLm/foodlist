/* eslint-disable */
export default {
  displayName: 'foodlist-api-typeorm-entities',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/foodlist-api/typeorm-entities',
  preset: '../../../jest.preset.js',
};
