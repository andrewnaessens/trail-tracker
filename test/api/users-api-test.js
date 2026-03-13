import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { trailtrackerService } from "./trailtracker-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    trailtrackerService.clearAuth();
    await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
    await trailtrackerService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await trailtrackerService.createUser(testUsers[i]);
    }
    await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await trailtrackerService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await trailtrackerService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await trailtrackerService.deleteAllUsers();
    await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
    returnedUsers = await trailtrackerService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await trailtrackerService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await trailtrackerService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await trailtrackerService.deleteAllUsers();
    await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
    try {
      const returnedUser = await trailtrackerService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
