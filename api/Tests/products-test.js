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
    const id_products = 5;
    chai
      .request(app)
      .get(`/api/products/${id_products}`)
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
    const id_products = 8888;
    chai
      .request(app)
      .get(`/api/products/${id_products}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find product with the id ${id_products}`);
        done();
      });
  });

  it("It should not get a particular product with non-numeric id", done => {
    const id_products = "aaa";
    chai
      .request(app)
      .get(`/api/products/${id_products}`)
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
    const id_products = 8;
    const updatedproduct = {
      id: id_products,
      name: " Suco Natural 750ml",
      price: 10,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    chai
      .request(app)
      .put(`/api/products/${productId}`)
      .set("Accept", "application/json")
      .send(updatedproduct)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedproduct.id);
        expect(res.body.data.name).equal(updatedproduct.name);
        expect(res.body.data.is_alive).equal(updatedproduct.price);
        expect(res.body.data.is_alive).equal(updatedproduct.type);
        expect(res.body.data.is_alive).equal(updatedproduct.isExtras);
        expect(res.body.data.is_alive).equal(updatedproduct.hasOptions);
        expect(res.body.data.is_alive).equal(updatedproduct.createdAt);
        expect(res.body.data.is_alive).equal(updatedproduct.updatedAt);
        done();
      });
  });

  it("It should not update a product with invalid id", done => {
    const id_products = "9999";
    const updatedproduct = {
      id: id_products,
      name: "Updated Awesome product again",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    chai
      .request(app)
      .put(`/api/products/${id_products}`)
      .set("Accept", "application/json")
      .send(updatedproduct)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find product with the id: ${id_products}`);
        done();
      });
  });

  it("It should not update a product with non-numeric id value", done => {
    const id_products = "ggg";
    const updatedproduct = {
      id: id_products,
      name: "Updated Awesome product again",
      price: 7,
      type: "Breakfast",
      isExtras: false,
      hasOptions: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    chai
      .request(app)
      .put(`/api/products/${id_products}`)
      .set("Accept", "application/json")
      .send(updatedproduct)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete a product", done => {
    const id_products = 1;
    chai
      .request(app)
      .delete(`/api/products/${id_products}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it("It should not delete a product with invalid id", done => {
    const id_products = 777;
    chai
      .request(app)
      .delete(`/api/products/${id_products}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`product with the id ${id_products} cannot be found`);
        done();
      });
  });

  it("It should not delete a product with non-numeric id", done => {
    const id_products = "bbb";
    chai
      .request(app)
      .delete(`/api/products/${id_products}`)
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
