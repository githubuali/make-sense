import React from 'react'
import { Container } from './styles'

interface Props {
    text: string;
    disabled?: boolean;
}

export const SubmitButton: React.FC<Props> = ({ text, disabled }) => {
    return (
        <Container type='submit' disabled={disabled}>
            {text}
        </Container>
    )
}
