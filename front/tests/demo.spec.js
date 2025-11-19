import { test,expect } from "@playwright/test" ;

// just for checking purpose
test("my first test", function () {
  console.log("This is demo test");
});

test("2nd test", function () {
  expect(200).toBe(200);
}); 