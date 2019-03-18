import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './App.css';
import products from './products.json';
import { Checkout } from './checkout/Checkout';
import { getPricingRules } from './pricing/pricing.utils';
import { IProduct, IAppState, ProductId } from './app.types';

class App extends Component<{}, IAppState> {
  public checkout: Checkout;

  constructor() {
    super({});
    this.checkout = new Checkout(getPricingRules('myer'));
    this.state = {
      value: 'myer',
      total: '0.00'
    };
  }
  // public state: { value: string; total: string } = {

  // };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: event.target.value, total: '0.00' });
    this.checkout = new Checkout(getPricingRules(event.target.value));
  };

  addProduct = (product: IProduct): void => {
    this.checkout.add(product);
    this.setState({ ...this.state, [`${product.id}Qty`]: this.countProduct(product.id) });
  };

  total = (): void => {
    const total = this.checkout.total();
    this.setState({ total });
  };

  countProduct = (productId: string): number => {
    return this.checkout.items.filter(p => p.id === productId).length;
  };

  render() {
    const that = this;
    return (
      <Container className="App">
        <div>
          <h1>Seek Checkout</h1>
        </div>
        <div className="App-body">
          <form>
            <label>Company: </label>

            <select className="select-list" value={this.state.value} onChange={this.handleChange} data-id="company">
              <option value="myer">Myer</option>
              <option value="secondBite">Second Bite</option>
              <option value="axilCoffeeRoasters">Axil Coffee Roasters</option>
              <option value="target">Target</option>
              <option value="jora">Target</option>
            </select>
            <span className="sub-text">
              (This is just to replicate the logged in company and to apply the pricing rules)
            </span>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {products.map(function(product, index) {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{that.countProduct(product.id)}</td>
                      <td>
                        <Button variant="outline-primary" type="button" onClick={() => that.addProduct(product)}>
                          Add
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="total">
              <label className="totalLabel">Total: </label>
              <label>
                <b>${this.state.total}</b>
              </label>
            </div>

            <Button type="button" value="Calculate total" onClick={() => that.total()}>
              Calculate total
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default App;
