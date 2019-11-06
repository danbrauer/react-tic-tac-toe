import * as React from 'react';
import { shallow } from 'enzyme';
import {
    Square
} from '../game';


describe('square component', () => {

    it('should set its value to X, O, or null', () => {

        const mockOnClick = jest.fn( (i: number) => {} );

        const component = shallow(
            <Square value='X' onClick={mockOnClick} />
        );

        component.simulate('click');
        expect(component.getElement().props.children[0]).toEqual('X');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
