import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Banner from './components/template/banner.component';


it('shows banner', () => {
  const shallowDiv = shallow(<App />);
  expect(shallowDiv.find(Banner).length).toEqual(1);
});


/*
it('console logs innerHTML', () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/METAGENRE/i);
  // expect(linkElement).toBeInTheDocument();
  const div = document.createElement("div");

  ReactDOM.render(<App />, div)

  console.log(div.innerHTML)

  ReactDOM.unmountComponentAtNode(div);
});
*/