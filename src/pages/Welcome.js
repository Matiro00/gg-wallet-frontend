import { useEffect } from "react";
import { TitleStyledContainer, SubtitleStyledContainer, Avatar, ButtonStyled, ButtonContainer, StyledContainer } from '../components/styles'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    useEffect(() => {
        if (isAuthenticated && user) { navigate('/home') }
    }, [isAuthenticated, user, navigate]);
    return (
        <div>
            <StyledContainer>
                <Avatar></Avatar>
                <TitleStyledContainer size={42}>
                    Bienvenido a GG-Wallet
                </TitleStyledContainer>
                <SubtitleStyledContainer size={21}>
                    La billetera para los gamers
                </SubtitleStyledContainer>
                <ButtonContainer>
                    <ButtonStyled to='./login'>
                        Login
                    </ButtonStyled>
                    <ButtonStyled to='./register'>
                        Registrarse
                    </ButtonStyled>
                </ButtonContainer>
            </StyledContainer>
        </div>
    )
}
export default Welcome;