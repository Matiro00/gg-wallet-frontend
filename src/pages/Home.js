import {TitleStyledContainer,SubtitleStyledContainer, ButtonStyled,ButtonContainerHome,StyledContainer,BackButton} from '../components/styles'
import { useAuth } from "../context/AuthContext";


const Welcome = () => {
    const { logout,user } = useAuth();
    return(
        <div>
            <StyledContainer>
                <BackButton onClick={logout}to={'/'}>
                    Desconectarse
                </BackButton>
                <TitleStyledContainer size={42}> 
                    Bienvenido {user.username}
                </TitleStyledContainer>
                <SubtitleStyledContainer size={21}>
                    Tiene {user.credits} creditos disponibles
                </SubtitleStyledContainer>
                <ButtonContainerHome>
                    <ButtonStyled to={'/transfer'}>
                        Transferencia
                    </ButtonStyled>
                    <ButtonStyled to={'/benefits'}>
                        Beneficios
                    </ButtonStyled>
                    <ButtonStyled to={'/card'}>
                        Tarjetas 
                    </ButtonStyled>
                </ButtonContainerHome>
            </StyledContainer>
        </div>
    )
}
export default Welcome;