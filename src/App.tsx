import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './App.css';
import products from './products.json';
import { Checkout } from './checkout/Checkout';
import { getPricingRules } from './pricing/pricing.utils';
import { ProductId, IProduct } from './app.types';

class App extends Component<{}, {}> {
  public checkout: Checkout;

  constructor() {
    super({});
    this.checkout = new Checkout(getPricingRules('myer'));
  }
  public state: { value: string; total: string } = {
    value: 'myer',
    total: '0.00'
  };

  handleSubmit = () => {
    console.log('event', event);
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: event.target.value, total: '0.00' });
    this.checkout = new Checkout(getPricingRules(event.target.value));
    console.log('this.checkout', this.checkout);
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
      <div className="App">
        <header className="App-header">
          <h1>Seek Checkout</h1>
          <body className="App-body">
            <form onSubmit={this.handleSubmit}>
              <label>Company: </label>
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="Company"
                onChange={() => this.handleChange}
                data-id="company"
              >
                <Dropdown.Item href="#/action-1">Myer</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Second Bite</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Axil Coffee Roasters</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Target</Dropdown.Item>
              </DropdownButton> */}
              <select className="select-list" value={this.state.value} onChange={this.handleChange} data-id="company">
                <option value="myer">Myer</option>
                <option value="secondBite">Second Bite</option>
                <option value="axilCoffeeRoasters">Axil Coffee Roasters</option>
                <option value="target">Target</option>
              </select>
              <span className="sub-text">
                (This is just to replicate the logged in company and to apply the pricing rules)
              </span>

              <Table striped bordered hover>
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
                        <td>{product.price}</td>
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
                  <b>{this.state.total}</b>
                </label>
              </div>

              <Button type="button" value="Calculate total" onClick={() => that.total()}>
                Calculate total
              </Button>
            </form>
          </body>
        </header>
      </div>
    );
  }
}

export default App;
