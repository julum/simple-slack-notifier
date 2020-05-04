
const index = require("../lib/index");

describe("Test", () => {
  it("should be true", () => {
    expect(index.test()).toEqual("Test");
    expect(true).toBeTruthy();
  });
})
