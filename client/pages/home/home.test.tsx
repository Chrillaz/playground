import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.'

describe('<Home />', () => {

    it('Renders with hellow world', () => {

        render(<Home />);

        expect(screen.getByText('Hello World')).toBeInTheDocument
    })
})