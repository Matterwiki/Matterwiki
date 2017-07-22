describe("Articles API tests", () => {
  describe("GET api/articles", () => {
    test("200 any - VALID - returns expected articles");
  });

  describe("GET api/articles/:id", () => {
    test("403 user - INVALID - only admin allowed to fetch a");
    test("200 admin - VALID - returns expected data");
  });

  describe("GET api/:topicId/:articleId", () => {
    test("200 any - VALID - should fetch articles of topic with provided ID");
  });

  describe("POST api/topics", () => {
    test("403 - INVALID - only admin allowed to create topic");
    test("201 - VALID - should create new topic");
  });
  describe("PUT api/topics:id", () => {
    test("403 - INVALID - only admin allowed to update topic");
    test("200 - VALID - should update topic with provided ID");
  });
  describe("DELETE api/topics/:id", () => {
    test("403 - VALID - only admin allowed to delete topic");
    test("200 - VALID - should delete topic with provided ID");
  });
});
