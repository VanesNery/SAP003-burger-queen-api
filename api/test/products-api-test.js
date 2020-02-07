import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";
chai.use(chatHttp);
const { expect } = chai;

describe("Testing the product endpoints:", () => {
  it("It should create a product", done => {
    const products = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(products)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          name: products.name,
          price: products.price,
          type: products.type,
          isExtras: products.isExtras,
          hasOptions: products.hasOptions,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt
        });
        done();
      });
  });

  it("It should not create a product with incomplete parameters", done => {
    const products = {
      isExtras: false
    };
    chai
      .request(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .send(products)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all products", done => {
    chai
      .request(app)
      .get("/api/products")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("name");
        res.body.data[0].should.have.property("price");
        res.body.data[0].should.have.property("type");
        res.body.data[0].should.have.property("isExtras");
        res.body.data[0].should.have.property("hasOptions");
        res.body.data[0].should.have.property("createdAt");
        res.body.data[0].should.have.property("updatedAt");
        done();
      });
  });

  it("It should get a particular product", done => {
    const productId = 1;
    chai
      .request(app)
      .get(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("name");
        res.body.data[0].should.have.property("price");
        res.body.data[0].should.have.property("type");
        res.body.data[0].should.have.property("isExtras");
        res.body.data[0].should.have.property("hasOptions");
        res.body.data[0].should.have.property("createdAt");
        res.body.data[0].should.have.property("updatedAt");
        done();
      });
  });

  it("It should not get a particular product with invalid id", done => {
    const productId = 8888;
    chai
      .request(app)
      .get(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find product with the id ${productId}`);
        done();
      });
  });

  it("It should not get a particular product with non-numeric id", done => {
    const productId = "aaa";
    chai
      .request(app)
      .get(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update a product", done => {
    const productId = 4;
    const updateProduct = {
      id: productId,
      name: "Suco Natural 750ml",
      price: 10,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      updatedAt: new Date()
    };
    chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updateProduct.id);
        expect(res.body.data.name).equal(updateProduct.name);
        expect(res.body.data.price).equal(updateProduct.price);
        expect(res.body.data.type).equal(updateProduct.type);
        expect(res.body.data.isExtras).equal(updateProduct.isExtras);
        expect(res.body.data.hasOptions).equal(updateProduct.hasOptions);
        expect(res.body.data.createdAt).equal(updateProduct.createdAt);
        expect(res.body.data.updatedAt).equal(updateProduct.updatedAt);
        done();
      });
  });

  it("It should not update a product with invalid id", done => {
    const productId = "9999";
    const updateProduct = {
      id: productId,
      name: "Updated Awesome product again",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: ""
    };
    chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find product with the id: ${productId}`);
        done();
      });
  });

  it("It should not update a product with non-numeric id value", done => {
    const productId = "ggg";
    const updateProduct = {
      id: productId,
      name: "Updated Awesome product again",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: ""
    };
    chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete a product", done => {
    const productId = 1;
    chai
      .request(app)
      .delete(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it("It should not delete a product with invalid id", done => {
    const productId = 777;
    chai
      .request(app)
      .delete(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`product with the id ${productId} cannot be found`);
        done();
      });
  });

  it("It should not delete a product with non-numeric id", done => {
    const productId = "bbb";
    chai
      .request(app)
      .delete(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please provide a numeric value");
        done();
      });
  });
});
