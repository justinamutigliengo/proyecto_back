import Assert from "assert";
import mongoose from "mongoose";
import UsersDAO from "../src/dao/Users.dao.js";

const connection = await mongoose.connect(
  "mongodb://127.0.0.1:27017/c72830test"
);
const dao = new UsersDAO();
const assert = Assert.strict;
const testUser = {
  first_name: "Juan",
  last_name: "Perez",
  email: "jperez@gmail.com",
  password: "abc445",
};

describe("Test DAO Users", function () {
  before(function () {
    mongoose.connection.collections.adopme_users.drop();
  });
  beforeEach(function () {
    this.timeout = 3000;
  });
  after(function () {});
  afterEach(function () {});

  it("get() debe retornar un array de usuarios", async function () {
    const result = await dao.get();
    assert.strictEqual(Array.isArray(result), true);
  });

  it("save() debe retornar un objeto con los datos del nuevo usuario", async function () {
    const result = await dao.save(testUser);
    assert.strictEqual(typeof result, "object");
    assert.ok(result._id);
    assert.deepStrictEqual(result.pets, []);
  });

  it("getBy() debe retornar un objeto coincidente con el criterio indicado", async function () {
    const result = await dao.getBy({ email: testUser.email });

    testUser._id = result._id;

    assert.strictEqual(typeof result, "object");
    assert.ok(result._id);
    assert.deepStrictEqual(result.email, testUser.email);
  });

  it("update() debe retornar un objeto con los datos modificados", async function () {
    const modifiedMail = "pepe@pepe.com";
    const result = await dao.update(testUser._id, { email: modifiedMail });

    assert.strictEqual(typeof result, "object");
    assert.ok(result._id);
    assert.strictEqual(result.email, modifiedMail);
  });

  it("delete() debe borrar definitivamente el documento indicado", async function () {
    const result = await dao.delete(testUser._id);

    assert.strictEqual(typeof result, "object");
    assert.deepStrictEqual(result._id, testUser._id);
  });
});
