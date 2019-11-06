import * as React from 'react';
import { shallow } from 'enzyme';
import {
    Square
} from '../index';


describe('square component', () => {

    it('should set its value to X, O, or null', () => {

        const mockOnClick = jest.fn( (i: number) => {} );

        const component = shallow(
            <Square value={'X'} onClick={mockOnClick} />
        );

        expect(component.prop('value')).toEqual('O');
    });
});
