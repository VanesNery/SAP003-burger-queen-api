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
          TableId: 1,
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
              TableId: orders.TableId,
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
      .send({})
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
        res.body.data[0].should.have.property('TableId')
        res.body.data[0].should.have.property('status')
        done()
      })
  });

  it('It should get a particular order', (done) => {
    const ordersId = 1
    chai.request(app)
      .get(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('TableId')
        res.body.data.should.have.property('status')
        done()
      })
  });

  it('It should not get a particular order with invalid id', (done) => {
    const ordersId = 8888
    chai.request(app)
      .get(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Order with the id ${ordersId}`)
        done()
      })
  });

  it('It should not get a particular order with non-numeric id', (done) => {
    const ordersId = 'aaa'
    chai.request(app)
      .get(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should update an order', (done) => {
    const ordersId = 1
    const updatedOrder = {
      id: ordersId,
      status: 'Pronto'
    }
    chai.request(app)
      .put(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedOrder.id)
        expect(res.body.data.statusOrder).equal(updatedOrder.status)
        done()
      })
  });

  it('It should not update an order with invalid id', (done) => {
    const ordersId = '9999'
    const updatedOrder = {
      id: ordersId,
      status: 'Entregue',
    }
    chai.request(app)
      .put(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find order with the id: ${ordersId}`)
        done()
      })
  });

  it('It should not update an order with non-numeric id value', (done) => {
    const ordersId = 'ggg'
    const updatedOrder = {
      id: ordersId,
      status: 'Pendente',
    }
    chai.request(app)
      .put(`/api/orders/${ordersId}`)
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
    const ordersId = 777
    chai.request(app)
      .delete(`/api/orders/${ordersId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Order with the id ${orderId} cannot be found`)
        done()
      })
  });

  it('It should not delete an order with non-numeric id', (done) => {
    const ordersId = 'bbb'
    chai.request(app)
      .delete(`/api/orders/${ordersId}`)
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
      TableId: 2,
      status: 'Pendente'
    }
    const ordersId = 2;

    chai.request(app)
      .post('/api/tables')
      .send(table)
      .end((err, res) => {
        chai.request(app)
          .post('/api/orders')
          .send(order)
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
      .end()
  });
});

describe('Testing the order itens endpoints:', () => {
  it('Should create an order item', (done) => {
    const orderItem = {
      ProductId: 1,
      OrderId: 3,
      quantity: 1
    }
    const product = {
      name: 'Misto Quente',
      price: 10,
      isExtra: false
    }
    const table = {
      number: 25
    }
    const order = {
      TableId: 3,
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
                      ProductId: 1,
                      OrderId: 3,
                      quantity: 1
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
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });
});