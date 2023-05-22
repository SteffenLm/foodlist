/* eslint-disable */
export default {
  displayName: 'foodlist-dto-model',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/foodlist/dto-model',
  preset: '../../../jest.preset.js',
};
