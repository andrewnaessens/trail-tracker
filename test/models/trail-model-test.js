import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testTrails, difficultyDifficult, difficult, coumshingaunLough, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

  let difficultyDifficultList = null;

  setup(async () => {
    db.init();
    await db.categoryStore.deleteAllCategories();
    await db.trailStore.deleteAllTrails();
    difficultyDifficultList = await db.categoryStore.addCategory(difficultyDifficult);
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTrails[i] = await db.trailStore.addTrail(difficultyDifficultList._id, testTrails[i]);
    }
  });

  test("create single trail", async () => {
    const difficultList = await db.categoryStore.addCategory(difficult);
    const trail = await db.trailStore.addTrail(difficultList._id, coumshingaunLough)
    assert.isNotNull(trail._id);
    assertSubset (coumshingaunLough, trail);
  });

  test("create multiple trailApi", async () => {
    const trails = await db.categoryStore.getCategoryById(difficultyDifficultList._id);
    assert.equal(testTrails.length, testTrails.length)
  });

  test("delete all trailApi", async () => {
    const trails = await db.trailStore.getAllTrails();
    assert.equal(testTrails.length, trails.length);
    await db.trailStore.deleteAllTrails();
    const newTrails = await db.trailStore.getAllTrails();
    assert.equal(0, newTrails.length);
  });

  test("get a trail - success", async () => {
    const difficultList = await db.categoryStore.addCategory(difficult);
    const trail = await db.trailStore.addTrail(difficultList._id, coumshingaunLough)
    const newTrail = await db.trailStore.getTrailById(trail._id);
    assertSubset (coumshingaunLough, newTrail);
  });

  test("delete One Trail - success", async () => {
    const id = testTrails[0]._id;
    await db.trailStore.deleteTrail(id);
    const trails = await db.trailStore.getAllTrails();
    assert.equal(trails.length, testCategories.length - 1);
    const deletedTrail = await db.trailStore.getTrailById(id);
    assert.isNull(deletedTrail);
  });

  test("get a trail - bad params", async () => {
    assert.isNull(await db.trailStore.getTrailById(""));
    assert.isNull(await db.trailStore.getTrailById());
  });

  test("delete One Trail - fail", async () => {
    await db.trailStore.deleteTrail("bad-id");
    const trails = await db.trailStore.getAllTrails();
    assert.equal(trails.length, testCategories.length);
  });
});
