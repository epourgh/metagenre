import React from 'react';
import { mount } from 'enzyme';
import Mail from '../components/mail.component'


let wrapped;

beforeEach(() => {
    wrapped = mount(<Mail />)
});

afterEach(() => {
    wrapped.unmount();
});


it('count number of content type', () => {

    console.log(
                `textarea count: ${wrapped.find("textarea").length}` 
                + `\nbutton count: ${wrapped.find("button").length}`
    );
    
    expect(wrapped.find("button").length).toEqual(1);
})

describe('the textarea', () => {

    beforeEach(() => {
        wrapped.find("textarea").simulate('change', {
            target: {
                value: 'new content'
            }
        });
    
        wrapped.update();
    });

    it('simulate form change', () => {
        expect(wrapped.find("textarea").prop('value')).toEqual('new content');    
    });
    
    
    it('simulate form emptying', () => {
    
        wrapped.find("textarea").simulate('submit');
    
        wrapped.update();
    
        expect(wrapped.find("textarea").prop('value')).toEqual('');
    
    });
});
