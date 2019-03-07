import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { getPricingRules } from './pricing/pricing.utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getProduct } from './checkout/checkout.utils';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let container: HTMLDivElement | Element;
  beforeEach(() => {
    container = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('should render without crashing', () => {
    const component: any = ReactDOM.render(<App />, container);
    expect(component).toBeDefined();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it("handleChange,should initiate checkout with selected company's  pricing rule", () => {
    const component: any = ReactDOM.render(<App />, container);
    const company = 'secondBite';
    const event = {
      target: { value: company }
    };
    component.handleChange(event);
    expect(component.checkout).toBeDefined();
    expect(component.checkout.pricingRules).toEqual(getPricingRules(company));
  });

  it('addProduct: should add product to the checkout', () => {
    const component: any = ReactDOM.render(<App />, container);

    component.addProduct(getProduct('classic'));

    expect(component.checkout.items.length).toEqual(1);
    expect(component.checkout.items[0]).toEqual(getProduct('classic'));
  });

  // it('total, should call checkout total', () => {
  //   const component: any = ReactDOM.render(<App />, container);
  //   const company = 'secondBite';
  //   const totalSpy = jest.spyOn(checkout);
  //   component.total();
  //   expect();
  // });

  it('countProduct, should return number of products of a given ProductId added', () => {
    const component: any = ReactDOM.render(<App />, container);

    component.checkout.items = [
      getProduct('classic'),
      getProduct('classic'),
      getProduct('classic'),
      getProduct('standout')
    ];

    expect(component.countProduct('classic')).toEqual(3);
  });
});
