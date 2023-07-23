import {encodePassword, decodePassword, passwordCompare, SECRET} from '../jwt'

describe("jwt", () => {

  const rawPassword = 'myStrongPassword';
  let encodedPassword: string = "";

  beforeAll(() => {
    // Encode the password before running tests
    encodedPassword = encodePassword(rawPassword);
  });
  
  it("encode function should existed", () => {
    expect(encodePassword).toBeDefined();
  });

  it("decode function should existed", () => {
    expect(decodePassword).toBeDefined();
  });

  it("passwordCompare function should existed", () => {
    expect(passwordCompare).toBeDefined();
  });

  it("secret should be defined", () => {
    expect(process.env.SECRET).toBeDefined();
  });

  test('decodePassword should return the original password', () => {
    const decodedPassword = decodePassword(encodedPassword);
    expect(decodedPassword).toBe(rawPassword);
  });

  test('passwordCompare should return true for correct password', async () => {
    const result = await passwordCompare(encodedPassword, rawPassword);
    expect(result).toBe(true);
  });

  test('passwordCompare should return false for incorrect password', async () => {
    const incorrectPassword = 'wrongPassword';
    const result = await passwordCompare(encodedPassword, incorrectPassword);
    expect(result).toBe(false);
  });
});