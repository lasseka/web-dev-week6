const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});
describe("POST api/workouts", function(){
describe("create workouts from prebuilt data", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });
})

  it("Workouts are returned as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST /api/workouts", function(){
  describe("when adding a new workout", function(){
  it("New workout added successfully", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });
  describe("DELETE /api/workouts/:id", () => {
    it("Deletes a workout successfully", async () => {
      await api
        .delete(`/api/workouts/${workoutToBeUpdated._id}`)
        .set("Authorization", "bearer " + token)
        .expect(204);

      const workoutsAfterDelete = await api
        .get("/api/workouts")
        .set("Authorization", "bearer " + token);

      expect(workoutsAfterDelete.body).toHaveLength(0);
    });

    it("Returns 404 if the workout does not exist", async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      await api
        .delete(`/api/workouts/${nonExistentId}`)
        .set("Authorization", "bearer " + token)
        .expect(404);
    });
  });

  describe("PUT /api/workouts/:id", () => {
    it("Updates a workout successfully", async () => {
      const updatedWorkout = {
        title: "Updated Workout",
        reps: 15,
        load: 120,
      };

      const response = await api
        .put(`/api/workouts/${workoutToBeUpdated._id}`)
        .set("Authorization", "bearer " + token)
        .send(updatedWorkout)
        .expect(200);

      expect(response.body.title).toBe(updatedWorkout.title);
      expect(response.body.reps).toBe(updatedWorkout.reps);
      expect(response.body.load).toBe(updatedWorkout.load);
    });

    it("Returns 400 if the update data is invalid", async () => {
      const invalidUpdate = { reps: -10 }; // Invalid reps value
      await api
        .put(`/api/workouts/${workoutToBeUpdated._id}`)
        .set("Authorization", "bearer " + token)
        .send(invalidUpdate)
        .expect(400);
    });
  });

  describe("GET /api/workouts/:id", () => {
    it("Returns a workout by ID", async () => {
      const response = await api
        .get(`/api/workouts/${workoutToBeUpdated._id}`)
        .set("Authorization", "bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(workoutToBeUpdated.title);
    });

    it("Returns 404 if the workout does not exist", async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      await api
        .get(`/api/workouts/${nonExistentId}`)
        .set("Authorization", "bearer " + token)
        .expect(404);
    });
});
})
})

afterAll(() => {
  mongoose.connection.close();
});
