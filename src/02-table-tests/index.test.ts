// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { input: { a: 2, b: 3, action: Action.Add }, expected: 5 },
  { input: { a: 5, b: 3, action: Action.Subtract }, expected: 2 },
  { input: { a: 4, b: 5, action: Action.Multiply }, expected: 20 },
  { input: { a: 10, b: 2, action: Action.Divide }, expected: 5 },
  { input: { a: 2, b: 3, action: Action.Exponentiate }, expected: 8 },
  { input: { a: '2', b: 3, action: Action.Add }, expected: null },
  { input: { a: 2, b: '3', action: Action.Subtract }, expected: null },
  { input: { a: 2, b: 3, action: '%' }, expected: null },
  { input: { a: null, b: 3, action: Action.Multiply }, expected: null },
  { input: { a: 2, b: undefined, action: Action.Divide }, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('returns expected results', ({ input, expected }) => {
    expect(simpleCalculator(input)).toBe(expected);
  });
});
