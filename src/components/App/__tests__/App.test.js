import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';
// import AppContainer from '../AppContainer';


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App store={} />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders App without crashing', () => {
  const store = { subscribe: () => {}, dispatch: () => {}, getState: () => {} }
  const wrapper = shallow(<App status={1} />);
  expect(wrapper).toMatchSnapshot();
});
