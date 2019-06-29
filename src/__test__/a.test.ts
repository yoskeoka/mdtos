it("adds 1 + 2 to equal 3 in TScript", async () => {
  const { sum } = await import("../sum");
  expect(sum(1, 2)).toBe(3);
});
