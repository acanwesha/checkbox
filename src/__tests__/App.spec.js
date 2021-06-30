import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import "@testing-library/jest-dom"
import axiosMock from "axios"
import { Patient } from "./components/Patient/index"
afterEach(cleanup)

describe("CardHead", () => {
    it("should render my component", () => {
      const wrapper = shallow(<Patient />);
      expect(wrapper).toMatchSnapshot();
    });
  });

describe("App Testing", ()=>{
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<App />).toJSON()
    })
});

it("fetches and displays data", () => {

});
