import styled from "styled-components";
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import colors from './colors'

export const StyledBackground = styled.div`
    margin: 0;
    min-height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
`;

export const TitleStyledContainer = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color:  ${(props) => props.color ? props.color : colors.primary};
    margin: 2rem 0;
`;

export const SubtitleStyledContainer = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color:  ${(props) => props.color ? props.color : colors.primary};
    margin-bottom: 0.5rem;
`
export const InformationContainer = styled.div`
    font-size: 24px;
    text-align: center;
    color:  ${(props) => props.color ? props.color : colors.primary};
    margin-bottom: 0.5rem;
`
export const Avatar = styled.div`
    width: 85px;
    height: 85px;
    border-radius: 50px;
    background-image: url(${Logo});
    padding-bottom: 1.5rem;
    background-size: cover;
    background-position: center;
    margin: auto;
`

export const ButtonStyled = styled(Link)`
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

    &:hover {
        background-color: #a8d7d4;
      }
      &:active {
        background-color: #799f9d;
      }
    @media (max-width: 750px) {
        width: 100%;
        width: inherit;
    }
      
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
export const ButtonContainerHome = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 3rem;
    @media (max-width: 750px) {
        flex-direction: column;
    }
`

export const StyledContainer = styled.div`
    background: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);
    padding: 5rem;
    min-width: 25rem;
    max-width: 60rem;
    @media (min-width: 750px) {
        width: 60rem;
    }
    @media (max-width: 750px) {
        width: 100%;
    }
`;

export const SwitchMessage = styled.div`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color:  ${(props) => props.color ? props.color : colors.primary};
    margin-bottom: 0.5rem;
    &:hover a {
        color: #a8d7d4;
    }
    &:active a{
        color: #799f9d;
    }
    &:visited a{
        color: #7cdfda;
    }
    a{
        color:  #7cdfda;
    }
`

export const BackButton = styled(Link)`
    width: 10%;
    background-color: transparent;
    font-size: 16px;
    color: ${colors.primary};
    text-decoration: none;
    transition: ease-in-out 0.3s;
    justify-content: left;
    &:hover {
        color: #a8d7d4;
      }
      &:active {
        color: #799f9d;
      }
`

export const ErrorMessage = styled.div`
    font-size: 16px;
    color: red;
    text-decoration: none;
    transition: ease-in-out 0.3s;
    display: flex;
    justify-content: center;
    text-align: center;
`
export const SuccessMessage = styled.div`
    font-size: 16px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: green;
    text-decoration: none;
    transition: ease-in-out 0.3s;
    display: flex;
    justify-content: center;
    text-align: center;
`
