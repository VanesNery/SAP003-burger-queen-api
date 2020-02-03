import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
const app = require ("../index");
chai.use(chatHttp);
const { expect } = chai;

describe("Testing the order endpoints:", () => {
  it("It should create a order", done => {
    const orders = {
        productId: 1,
        orderId: 3,
        status: 'Pendente'
      }
      const table = {
        number: 5,
      }
      const products = {
        itens: 'Suco Natural 750ml',
        price: 10,
        type: "Breakfast",
       isExtras: false,
      hasOptions: "",
      }
      const order = {
        tableId: 3,
        status: 'Pendente'
      }
  
      chai.request(app)
        .post('/api/products')
        .send(products)
        .end(() => {
          chai.request(app)
            .post('/api/tables')
            .send(table)
            .end(() => {
              chai.request(app)
                .post('/api/orders')
                .send(order)
                .end(() => {
                  chai.request(app)
                    .post('/api/orders')
                    .send(orders)
                    .end((err, res) => {
                      expect(res.status).to.equal(201)
                      expect(res.body.data).to.include({
                        id: 1,
                        productId: 1,
                        orderId: 3,
                        status: 'Pendente'
                      })
                    })
                })
            })
          done()
        })
  });

  it('Should not create a order item with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/orders')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please provide complete details')
        done()
      })
  })

  it("It should create a order", done => {
    const table = {
      number: 66
    };
    chai
      .request(app)
      .post("/api/tables")
      .send(table)
      .end(() => {
        const orders = {
            TableId: 1,
            status: 'Em preparo'
          }

          chai.request(app)
          .post('/api/orders')
          .send(orders)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.include({
              id: 1,
              tableId: 1,
              status: 'Em preparo'
            })
            done();
      });
  });
})

  it("It should get all orders", done => {
    chai
      .request(app)
      .get("/api/orders")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Orders retrieved')
        res.body.data[0].should.have.property('tableId');
        res.body.data[0].should.have.property('clientName');
        res.body.data[0].should.have.property('time');
        res.body.data[0].should.have.property('finalTime');
        res.body.data[0].should.have.property('total');
        res.body.data[0].should.have.property('itemsId');
        res.body.data[0].should.have.property('status');
        done();
      });
  });

  it("It should get a particular orders", done => {
    const ordersId = 5;
    chai
      .request(app)
      .get(`/api/orderss/${ordersId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.message).to.equal('Found order')
        res.body.data[0].should.have.property('tableId');
        res.body.data[0].should.have.property('clientName');
        res.body.data[0].should.have.property('time');
        res.body.data[0].should.have.property('finalTime');
        res.body.data[0].should.have.property('total');
        res.body.data[0].should.have.property('itemsId');
        res.body.data[0].should.have.property('status');
        done();
      });
  });

  it("It should not get a particular orders with invalid id", done => {
    const ordersId = 999;
    chai
      .request(app)
      .get(`/api/orders/${ordersId}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
          .eql(`Cannot find order with the id ${orderId}`)
        done();
      });
  });

  it("It should not get a particular order with non-numeric id", done => {
    const ordersId = "aaa";
    chai
      .request(app)
      .get(`/api/orders/${ordersId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update a orders", done => {
    const ordersId = 1;
    const updatedOrders = {
      id: ordersId,
      finalTime: new Date(),
      status: 'Pronto'
    };
    chai
      .request(app)
      .put(`/api/orders/${ordersId}`)
      .send(updatedOrders)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedOrders.id);
        expect(res.body.data.name).equal(updatedOrders.clientName);
        expect(res.body.data.price).equal(updatedOrders.time);
        expect(res.body.data.price).equal(updatedOrders.finalTime);
        expect(res.body.data.type).equal(updatedOrders.total);
        expect(res.body.data.isextras).equal(updatedOrders.itemsId);
        expect(res.body.data.isextras).equal(updatedOrders.status);
        done();
      });
  });

  it("It should not update a orders with invalid id", done => {
    const ordersId = "9999";
    const updatedOrders = {
        id: ordersId,
        status: 'Pronto'
      };
      chai
        .request(app)
        .put(`/api/orders/${ordersId}`)
        .send(updatedOrders)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          res.body.should.have.property('message')
          .eql(`Cannot find order with the id: ${orderId}`)
        done();
      });
  });

  it("It should not update a orders with non-numeric id value", done => {
    const ordersId = "ggg";
    const updatedOrders = {
      id: ordersId,
      hasoptions: ""
    };
    chai
      .request(app)
      .put(`/api/orders/${ordersId}`)
      .send(updatedOrders)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete a order", done => {
    const tables = {
        number: 99,
      }
      const orders = {
        tableId: 2,
        status: 'Pronto'
      }
      const ordersId = 2;
      chai.request(app)
        .post('/api/tables')
        .send(tables)
        .end((err, res) => {
          chai.request(app)
            .post('/api/orders')
            .send(orders)
            .end((err, res) => {
              chai.request(app)
                .delete(`/api/orders/${ordersId}`)
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  expect(res.body.data).to.include({})
                })
            })
          done()
        })
        chai.request(app)
        .get('/api/orders')
        .end((err, res) => {
          console.log(res.body, '------------------------------')
        })
  });

  it("It should not delete a orders with invalid id", done => {
    const ordersId = 777;
    chai
      .request(app)
      .delete(`/api/orders/${ordersId}`)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Order with the id ${orderId} cannot be found`)
        done();
      });
  });

  it("It should not delete a order with non-numeric id", done => {
    const ordersId = "bbb";
    chai
      .request(app)
      .delete(`/api/orders/${ordersId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please provide a numeric value')
        done();
      });
  });
});
