import chai from "chai";
import supertest from "supertest";

const { expect } = chai;
const requester = supertest("http://localhost:8000");

const testUser = {
  first_name: "Pablo",
  last_name: "Perez",
  email: "pperez@gmail.com",
  password: "abc123",
};
const testPet = { name: "Milo", species: "Dog", adopted: false };
let userId = "";
let petId = "";
let adoptionId = "";

describe("Test de Integración Adoption", function () {
  before(function () {});

  beforeEach(function () {});

  after(function () {});

  afterEach(function () {});

  it("POST /api/users debe registrar un nuevo usuario", async function () {
    const { statusCode, _body } = await requester
      .post("/api/users")
      .send(testUser);

    expect(statusCode).to.be.equals(200);
    expect(_body.status).to.be.equals("success");
    expect(_body.payload).to.have.property("_id");
    userId = _body.payload._id;
  });

  it("POST /api/pets debe registrar una nueva mascota", async function () {
    const { statusCode, _body } = await requester
      .post("/api/pets")
      .send(testPet);

    expect(statusCode).to.be.equals(200);
    expect(_body.status).to.be.equals("success");
    expect(_body.payload).to.have.property("_id");
    petId = _body.payload._id;
  });

  it("POST /api/adoptions/:uid/:pid debe crear una adopción correctamente", async function () {
    const { statusCode, _body } = await requester
      .post(`/api/adoptions/${userId}/${petId}`)
      .send();

    expect(statusCode).to.be.equals(200);
    expect(_body.status).to.be.equals("success");
    expect(_body.message).to.be.equals("Pet adopted");
    adoptionId = _body.payload._id;
  });

  it("POST /api/adoptions/:uid/:pid NO debe permitir adoptar una mascota ya adoptada", async function () {
    const { statusCode, _body } = await requester
      .post(`/api/adoptions/${userId}/${petId}`)
      .send();

    expect(statusCode).to.be.equals(400);
    expect(_body.status).to.be.equals("error");
    expect(_body.error).to.be.equals("Pet is already adopted");
  });

  it("GET /api/adoptions/:aid debe retornar una adopción por ID", async function () {
    const { statusCode, _body } = await requester.get(
      `/api/adoptions/${adoptionId}`
    );

    expect(statusCode).to.be.equals(200);
    expect(_body.status).to.be.equals("success");
    expect(_body.payload).to.have.property("_id").and.to.be.eql(adoptionId);
  });

  it("GET /api/adoptions/:aid debe retornar 404 si no se encuentra la adopción", async function () {
    const { statusCode, _body } = await requester.get(
      "/api/adoptions/invalidAdoptionId"
    );

    expect(statusCode).to.be.equals(404);
    expect(_body.status).to.be.equals("error");
    expect(_body.error).to.be.equals("Adoption not found");
  });
});
