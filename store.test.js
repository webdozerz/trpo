function sum(a, b) {
  return a + b;
}
module.exports = sum;

test('is store created', () => {
  expect(sum(1, 2)).toBe(3);
});
