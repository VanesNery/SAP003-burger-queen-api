import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";
chai.use(chatHttp);
const { expect } = chai;

describe("Testing the table endpoints:", () => {
  it("It should create a table", done => {
    const tables = {
      number: 2,
    };
    chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(tables)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          number: tables.number,
        });
        done();
      });
  });

  it("It should not create a table with incomplete parameters", done => {
    const tables = {
      number: false
    };
    chai
      .request(app)
      .post("/api/tables")
      .set("Accept", "application/json")
      .send(tables)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all tables", done => {
    chai
      .request(app)
      .get("/api/tables")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("number");
        done();
      });
  });

  it("It should get a particular table", done => {
    const id_tables = 5;
    chai
      .request(app)
      .get(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("number");
        done();
      });
  });

  it("It should not get a particular table with invalid id", done => {
    const id_tables = 8888;
    chai
      .request(app)
      .get(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find table with the id ${id_tables}`);
        done();
      });
  });

  it("It should not get a particular table with non-numeric id", done => {
    const id_tables = "aaa";
    chai
      .request(app)
      .get(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update a table", done => {
    const id_tables = 8;
    const updatedtable = {
      id: id_tables,
      number: 10,
    };
    chai
      .request(app)
      .put(`/api/tables/${tableId}`)
      .set("Accept", "application/json")
      .send(updatedtable)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedtable.id);
        expect(res.body.data.number).equal(updatedtable.number);
        done();
      });
  });

  it("It should not update a table with invalid id", done => {
    const id_tables = "9999";
    const updatedtable = {
      id: id_tables,
      number: "Updated Awesome table again",
    };
    chai
      .request(app)
      .put(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .send(updatedtable)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find table with the id: ${id_tables}`);
        done();
      });
  });

  it("It should not update a table with non-numeric id value", done => {
    const id_tables = "ggg";
    const updatedtable = {
      id: id_tables,
      number: "Updated Awesome table again",
    };
    chai
      .request(app)
      .put(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .send(updatedtable)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete a table", done => {
    const id_tables = 1;
    chai
      .request(app)
      .delete(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it("It should not delete a table with invalid id", done => {
    const id_tables = 777;
    chai
      .request(app)
      .delete(`/api/tables/${id_tables}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`table with the id ${id_tables} cannot be found`);
        done();
      });
  });

  it("It should not delete a table with non-numeric id", done => {
    const id_tables = "bbb";
    chai
      .request(app)
      .delete(`/api/tables/${id_tables}`)
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
