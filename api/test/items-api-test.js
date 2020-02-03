import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";
import { updateItems } from "../server/services/itemsService";
chai.use(chatHttp);
const { expect } = chai;

describe("Testing the order endpoints:", () => {
  it("It should create a items", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    const res = await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({ id: 1, ordersId: 1, productId: 1 });
  });

  it("It should not create a items with incomplete parameters", done => {
    const items = {};
    chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all items", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const res = await chai
      .request(app)
      .get("/api/items")
      .set("Accept", "application/json");

    expect(res.status).to.equal(200);
    res.body.data.forEach(element => {
      element.should.have.property("ordersId");
      element.should.have.property("productId");
    });
  });

  it("It should get a particular items", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const ordersId = 1;
    const res = await chai
      .request(app)
      .get(`/api/items/${ordersId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(200);
    res.body.data.should.have.property("ordersId");
    res.body.data.should.have.property("productId");
  });

  it("It should not get a particular items with invalid id", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const ordersId = 8888;

    const res = await chai
      .request(app)
      .get(`/api/items/${ordersId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(404);
    res.body.should.have
      .property("message")
      .eql(`Cannot find items with the id ${ordersId}`);
  });

  it("It should not get a particular items with non-numeric id", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const ordersId = "aaa";

    const res = await chai
      .request(app)
      .get(`/api/items/${ordersId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(400);
    res.body.should.have
      .property("message")
      .eql("Please input a valid numeric value");
  });

  it("It should update a items", async () => {
    const productOne = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productOne);

    const productTwo = {
      name: "Cafe",
      price: 10,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productTwo);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const updateItem = {
      id: itemsId,
      productId: 2
    };
    const itemsId = 1;

    const res = await chai
      .request(app)
      .put(`/api/items/${itemsId}`)
      .set("Accept", "application/json")
      .send(updateItem);

    expect(res.status).to.equal(200);
    expect(res.body.data.ordersId).equal(updateItem.ordersId);
    expect(res.body.data.productId).equal(updateItem.productId);
  });

  it("It should not update a items with invalid id", async () => {
    const productOne = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productOne);

    const productTwo = {
      name: "Cafe",
      price: 10,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productTwo);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const updateItem = {
      id: itemsId,
      productId: 2
    };

    const itemsId = 9999;
    const res = await chai
      .request(app)
      .put(`/api/items/${itemsId}`)
      .set("Accept", "application/json")
      .send(updateItem);

    expect(res.status).to.equal(404);
    res.body.should.have
      .property("message")
      .eql(`Cannot find items with the id: ${itemsId}`);
  });

  it("It should not update a items with non-numeric id value", async () => {
    const productOne = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productOne);

    const productTwo = {
      name: "Cafe",
      price: 10,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(productTwo);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const updateItem = {
      id: itemsId,
      productId: 2
    };

    const itemsId = "ggg";
    const res = await chai
      .request(app)
      .put(`/api/items/${itemsId}`)
      .set("Accept", "application/json")
      .send(updateItem);

    expect(res.status).to.equal(400);
    res.body.should.have
      .property("message")
      .eql("Please input a valid numeric value");
  });

  it("It should delete a items", async () => {
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(product);

    const table = {
      number: "1"
    };

    await chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(table);

    const order = {
      tableId: 1
    };

    await chai
      .request(app)
      .post("/api/orders")
      .set("Accept", "application/json")
      .send(order);

    const items = {
      ordersId: 1,
      productId: 1
    };

    const itemsResponse = await chai
      .request(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .send(items);

    const itemsId = itemsResponse.body.data.id;

    const res = await chai
      .request(app)
      .delete(`/api/items/${itemsId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(200);

    const getOrderResponse = await chai
      .request(app)
      .get("/api/items/" + itemsId)
      .set("Accept", "application/json")
      .send(items);

    expect(getOrderResponse.status).to.equal(404);
  });

  it("It should not delete a items with invalid id", async () => {
    const itemsId = 777;

    const res = await chai
      .request(app)
      .delete(`/api/items/${itemsId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(404);
    res.body.should.have
      .property("message")
      .eql(`items with the id ${itemsId} cannot be found`);
  });

  it("It should not delete a order with non-numeric id", async () => {
    const itemsId = "bbb";
    const res = await chai
      .request(app)
      .delete(`/api/items/${itemsId}`)
      .set("Accept", "application/json");

    expect(res.status).to.equal(400);
    res.body.should.have
      .property("message")
      .eql("Please provide a numeric value");
  });
});
