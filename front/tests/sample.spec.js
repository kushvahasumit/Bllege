import { test, expect } from "@playwright/test";

// just for checking purpose
test("my first test", function () {
  console.log("chlgya re");
});

test("2nd test", function () {
  expect(200).toBe(200);
});

test.skip("3rd", function () {
  expect("raju").toContain("raj");
});

// test.only("check name", async function(){
//     expect("sumit".includes("sun")).toBeTruthy()
// })
