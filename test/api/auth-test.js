import { assert } from "chai";
import { trailtrackerService } from "./trailtracker-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    trailtrackerService.clearAuth();
    await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggieCredentials);
    await trailtrackerService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await trailtrackerService.createUser(maggie);
    const response = await trailtrackerService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await trailtrackerService.createUser(maggie);
    const response = await trailtrackerService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    trailtrackerService.clearAuth();
    try {
      await trailtrackerService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
