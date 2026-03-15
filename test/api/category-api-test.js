import { EventEmitter } from "events";
import { assert } from "chai";
import { trailtrackerService } from "./trailtracker-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, difficult, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {
  let user = null;

  setup(async () => {
    trailtrackerService.clearAuth();
    user = await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggieCredentials);
    await trailtrackerService.deleteAllCategories();
    await trailtrackerService.deleteAllUsers();
    user = await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggieCredentials);
    difficult.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await trailtrackerService.createCategory(difficult);
    assert.isNotNull(returnedCategory);
    assertSubset(difficult, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await trailtrackerService.createCategory(difficult);
    const response = await trailtrackerService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await trailtrackerService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await trailtrackerService.createCategory(testCategories[i]);
    }
    let returnedLists = await trailtrackerService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await trailtrackerService.deleteAllCategories();
    returnedLists = await trailtrackerService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await trailtrackerService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
