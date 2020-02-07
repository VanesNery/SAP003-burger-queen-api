import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";
chai.use(chatHttp);
const { expect } = chai;

describe('Testing the order endpoints:', () => {

  it('It should create an order', (done) => {
    const table = {
      number: 7,
    }
    chai.request(app)
      .post('/api/tables')
      .send(table)
      .end(() => {
        const order = {
          tableId: 1,
          status: 'Pendente'
        }
        chai.request(app)
          .post('/api/orders')
          .set('Accept', 'application/json')
          .send(order)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.include({
              id: 1,
              tableId: orders.tableId,
              status: orders.status
            })
            done()
          })
      })

  });

  it('It should not create an order with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send({id: 1,
        productId: 1
      })
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });

  it('It should get all orders', (done) => {
    chai.request(app)
      .get('/api/orders')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('tableId')
        res.body.data[0].should.have.property('status')
        done()
      })
  });

  it('It should get a particular order', (done) => {
    const orderId = 1
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('tableId')
        res.body.data.should.have.property('status')
        done()
      })
  });

  it('It should not get a particular order with invalid id', (done) => {
    const orderId = 8888
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Order with the id ${orderId}`)
        done()
      })
  });

  it('It should not get a particular order with non-numeric id', (done) => {
    const orderId = 'aaa'
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should update an order', (done) => {
    const orderId = 1
    const updatedOrder = {
      id: orderId,
      status: 'Pronto'
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedOrder.id)
        expect(res.body.data.status).equal(updatedOrder.status)
        done()
      })
  });

  it('It should not update an order with invalid id', (done) => {
    const orderId = '9999'
    const updatedOrder = {
      id: orderId,
      status: 'Entregue',
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find order with the id: ${orderId}`)
        done()
      })
  });

  it('It should not update an order with non-numeric id value', (done) => {
    const orderId = 'ggg'
    const updatedOrder = {
      id: orderId,
      status: 'Pendente',
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should not delete an order with invalid id', (done) => {
    const orderId = 777
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Order with the id ${orderId} cannot be found`)
        done()
      })
  });

  it('It should not delete an order with non-numeric id', (done) => {
    const orderId = 'bbb'
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  });

  it('It should delete an order', (done) => {
    const table = {
      number: 24
    }
    const order = {
      tableId: 2,
      status: 'Pendente'
    }
    const orderId = 2;

    chai.request(app)
      .post('/api/tables')
      .send(table)
      .end((err, res) => {
        chai.request(app)
          .post('/api/orders')
          .send(order)
          .end((err, res) => {
            chai.request(app)
              .delete(`/api/orders/${orderId}`)
              .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data).to.include({})
              })
          })
        done()
      })
    chai.request(app)
      .get('/api/orders')
      .end()
  });
});

describe('Testing the order itens endpoints:', () => {
  it('Should create an order item', (done) => {
    const orderItem = {
      productId: 1,
      orderId: 3,
      status: 'Pronto'
    }
    const product = {
      name: "Suco Natural 500ml",
      price: 7,
      type: "Breakfast",
    }
    const table = {
      number: 25
    }
    const order = {
      tableId: 3,
      status: 'Pendente'
    }
    chai.request(app)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        chai.request(app)
          .post('/api/tables')
          .send(table)
          .end(() => {
            chai.request(app)
              .post('/api/orders')
              .send(order)
              .end(() => {
                chai.request(app)
                  .post('/api/orders/items')
                  .send(orderItem)
                  .end((err, res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body.data).to.include({
                      id: 1,
                      productId: 1,
                      orderId: 3,
                      status: 'Pronto'
                    })
                  })
              })
          })
        done()
      })
  })

  it('It should not create an order item with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/orders/items')
      .set('Accept', 'application/json')
      .send({id: 1,
        productId: 1,
        orderId: 3,})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });
});