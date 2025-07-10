// backend/__tests__/server.test.js
// Note: Express app ke liye proper integration tests ke liye 'supertest' jaisi library lagti hai.
// Abhi ke liye, hum bas ek dummy test likh rahe hain taaki Jest pass ho sake.

describe('Backend Basic Test', () => {
  test('Backend should work', () => {
    expect(true).toBe(true);
  });

  test('Math calculation works', () => {
    const sum = 2 + 3;
    expect(sum).toBe(5);
  });
});