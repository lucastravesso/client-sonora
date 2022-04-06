import { render } from '@testing-library/react'
import React from 'react'
import LandPage from '.'

const Button = ({ label}) =>{
    return <button aria-label="btn-1" type="submit">{label}</button>
}

describe('Land Page', () =>{
    test("Should be add in document", () =>{
        const { getByText, getByLabelText } = render(<Button label="botao"/>);

        const btnElement = getByText('botao')
        expect(btnElement).toBeInTheDocument
        expect(btnElement).toHaveTextContent
        expect(btnElement).toHaveAttribute
    })
})