import chai from "chai";
import mongoose from "mongoose";
import UsersDAO from "../src/dao/Users.dao.js";

const connection = await mongoose.connect(
  "mongodb://127.0.0.1:27017/c72830test"
);
const dao = new UsersDAO();
const expect = chai.expect;
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
    expect(result).to.be.an("array");
  });

  it("save() debe retornar un objeto con los datos del nuevo usuario", async function () {
    const result = await dao.save(testUser);

    expect(result).to.be.an("object");
    expect(result._id).to.be.not.null;
    expect(result.pets).to.be.deep.equal([]);
  });

  it("getBy() debe retornar un objeto coincidente con el criterio indicado", async function () {
    const result = await dao.getBy({ email: testUser.email });

    testUser._id = result._id;

    expect(result).to.be.an("object");
    expect(result._id).to.be.not.null;
    expect(result.email).to.be.equal(testUser.email);
  });

  it("update() debe retornar un objeto con los datos modificados", async function () {
    const modifiedMail = "pepe@pepe.com";
    const result = await dao.update(testUser._id, { email: modifiedMail });

    expect(result).to.be.an("object");
    expect(result._id).to.be.not.null;
    expect(result.email).to.be.equal(modifiedMail);
  });

  it("delete() debe borrar definitivamente el documento indicado", async function () {
    const result = await dao.delete(testUser._id);

    expect(result).to.be.an("object");
    expect(result._id).to.be.deep.equal(testUser._id);
  });
});
