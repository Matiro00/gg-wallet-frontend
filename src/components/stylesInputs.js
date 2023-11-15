import colors from './colors'
import styled from "styled-components";
import {Field} from 'formik'

export const StyledTextInput = styled(Field)`
    width: 100%;
    border: 1px solid ${colors.primary};
    display: block;
    margin: 2rem auto 0.25rem auto;
`
export const StyledCodeInput = styled(Field)`
    width: 30%;
    height: 2rem;
    text-align: center;
    font-size: 20px;
    border: 1px solid ${colors.primary};
    display: block;
    margin: 2rem auto 0.25rem auto;
`
export const StyledTransferCodeInput = styled(Field)`
    width: 30%;
    height: 2rem;
    text-align: center;
    font-size: 16px;
    border: 1px solid ${colors.primary};
    display: block;
    margin: 2rem auto 0.25rem auto;
    min-width: fit-content;
}
`
export const TextInputContainer = styled.div`
    margin: 1rem 0;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 1rem;
    @media (max-width: 750px) {
        flex-direction: column;
    }
`
export const SumbitStyled = styled.button`
    padding: 10px;
    width: 50%;
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${colors.primary};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    margin-top: 1rem;
    align-items: center;
    font-family: inherit;
    @media (max-width: 750px) {
        width: inherit;
    }
    &:hover {
        background-color: #a8d7d4;
      }
      &:active {
        background-color: #799f9d;
      }
`

export const NormalSumbitStyled = styled.button`
    padding: 10px;
    width: 50%;
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${colors.primary};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    margin: 1rem;
    align-items: center;
    display: grid;
    font-family: inherit;
    &:hover {
        background-color: #a8d7d4;
      }
      &:active {
        background-color: #799f9d;
      }
    @media (max-width: 750px) {
        width: inherit;
    }
`