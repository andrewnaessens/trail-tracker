import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { trailtrackerService } from "./trailtracker-service.js";
import { maggie, difficult, testCategories, testTrails, coumshingaunLough } from "../fixtures.js";

suite("Trail API tests", () => {
  let user = null;
  let difficultyDifficult = null;

  setup(async () => {
    trailtrackerService.clearAuth();
    user = await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
    await trailtrackerService.deleteAllCategories();
    await trailtrackerService.deleteAllTrails();
    await trailtrackerService.deleteAllUsers();
    user = await trailtrackerService.createUser(maggie);
    await trailtrackerService.authenticate(maggie);
    difficult.userid = user._id;
    difficultyDifficult = await trailtrackerService.createCategory(difficult);
  });

  teardown(async () => {});

  test("create trail", async () => {
    const returnedTrail = await trailtrackerService.createTrail(difficultyDifficult._id, coumshingaunLough);
    assertSubset(coumshingaunLough, returnedTrail);
  });

  test("create Multiple trails", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await trailtrackerService.createTrail(difficultyDifficult._id, testTrails[i]);
    }
    const returnedTrails = await trailtrackerService.getAllTrails();
    assert.equal(returnedTrails.length, testTrails.length);
    for (let i = 0; i < returnedTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const trail = await trailtrackerService.getTrail(returnedTrails[i]._id);
      assertSubset(trail, returnedTrails[i]);
    }
  });

  test("Delete TrailApi", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await trailtrackerService.createTrail(difficultyDifficult._id, testTrails[i]);
    }
    let returnedTrails = await trailtrackerService.getAllTrails();
    assert.equal(returnedTrails.length, testTrails.length);
    for (let i = 0; i < returnedTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const trail = await trailtrackerService.deleteTrail(returnedTrails[i]._id);
    }
    returnedTrails = await trailtrackerService.getAllTrails();
    assert.equal(returnedTrails.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await trailtrackerService.createTrail(difficultyDifficult._id, testTrails[i]);
    }
    const returnedCategory = await trailtrackerService.getCategory(difficultyDifficult._id);
    assert.equal(returnedCategory.trails.length, testTrails.length);
    for (let i = 0; i < testTrails.length; i += 1) {
      assertSubset(testTrails[i], returnedCategory.trails[i]);
    }
  });
});
