import { useEffect } from "react";
import { TitleStyledContainer, SubtitleStyledContainer, ButtonStyled, ButtonContainer, StyledContainer, BackButton, InformationContainer, ErrorMessage, SuccessMessage } from '../components/styles'
import { CardStyled, CardStyledContainer } from '../components/stylesBenefits'
import { useCard } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";
import { NormalSumbitStyled } from "../components/stylesInputs";

const Cards = () => {
    const { showCards, cards, errors: cardsError, deleteCard, response: cardResponse } = useCard();
    const { user } = useAuth();
    useEffect(() => {
        showCards({ dni: user.dni });
    }, []);
    return (
        <div>
            <StyledContainer>
                <BackButton to={'/home'}>
                    Volver
                </BackButton>
                <TitleStyledContainer size={42}>
                    Tarjetas Asignadas
                </TitleStyledContainer>
                <CardStyledContainer>
                    {cards.length === 0 && (
                        <InformationContainer>
                            No hay informacion disponible
                        </InformationContainer>
                    )}
                    {cards.map((card) => {
                        return (
                            <CardStyled key={card._id}>
                                <TitleStyledContainer size={24}>
                                    Ultimos 4 digitos {card.lastFourNumbers}
                                </TitleStyledContainer>
                                <SubtitleStyledContainer size={16}>
                                    {card.goodTill} (MM/AA)
                                </SubtitleStyledContainer>
                                <ButtonContainer>
                                    <NormalSumbitStyled onClick={async() => { await deleteCard({ cardID: card._id, dni: user.dni }); showCards({ dni: user.dni }); }}>Desvincular </NormalSumbitStyled>
                                </ButtonContainer>
                            </CardStyled>)
                    }
                    )}
                </CardStyledContainer>
                {cardResponse ?
                    <SuccessMessage>{cardResponse}</SuccessMessage>
                    : null}
                {cardsError ? cardsError.map((error, i) => (
                    <ErrorMessage>{error}</ErrorMessage>
                )) : null}
                <ButtonContainer>
                    <ButtonStyled to={'/addCard'}>
                        Asignar Tarjeta
                    </ButtonStyled>
                    <ButtonStyled to={'/home'}>
                        Cancelar
                    </ButtonStyled>
                </ButtonContainer>
            </StyledContainer>
        </div>
    )
}
export default Cards;