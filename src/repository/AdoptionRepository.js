import GenericRepository from "./GenericRepository.js";

export default class MockRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
