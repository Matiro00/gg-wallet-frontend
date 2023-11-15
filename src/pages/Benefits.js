import { useEffect } from "react";
import { TitleStyledContainer, SubtitleStyledContainer, ButtonStyled, ButtonContainer, StyledContainer, BackButton, InformationContainer, ErrorMessage, SuccessMessage } from '../components/styles'
import { CardStyled, CardStyledContainer } from '../components/stylesBenefits'
import { useBenefit } from "../context/BenefitContext";
import { useAuth } from "../context/AuthContext";
import { NormalSumbitStyled } from "../components/stylesInputs";

const Benefits = () => {
    const { exchangeBenefits,getBenefits, benefits, errors: benefitErrors, response: benefitsResponse } = useBenefit();
    const { user } = useAuth();
    useEffect(() => {
        getBenefits();
    }, []);
    return (
        <div>
            <StyledContainer>
                <BackButton to={'/home'}>
                    Volver
                </BackButton>
                <TitleStyledContainer size={42}>
                    Beneficios
                </TitleStyledContainer>
                <SubtitleStyledContainer>Saldo disponible {user.credits}</SubtitleStyledContainer>
                <CardStyledContainer>
                    {benefits.length === 0 && (
                        <InformationContainer>
                            No hay informacion disponible
                        </InformationContainer>
                    )}
                    {benefits.map((benefit) => {
                        return(
                        <CardStyled key={benefit._id}>
                            <TitleStyledContainer size={24}>
                                {benefit.name}
                            </TitleStyledContainer>
                            <SubtitleStyledContainer size={16}>
                                {benefit.description}
                            </SubtitleStyledContainer>
                            <SubtitleStyledContainer size={12}>
                                Cantidad disponible: {benefit.ammountAvailable}
                            </SubtitleStyledContainer>
                            <TitleStyledContainer size={16}>
                                Coste: {benefit.price}
                            </TitleStyledContainer>
                            <ButtonContainer>
                         <NormalSumbitStyled onClick={() => {exchangeBenefits({dni:user.dni, idBenefit:benefit._id}); getBenefits();}}>
                             Canjear
                         </NormalSumbitStyled>
                     </ButtonContainer>
                        </CardStyled>)
                    }
                    )}
                </CardStyledContainer>
                {benefitsResponse ?
              <SuccessMessage>{benefitsResponse}</SuccessMessage> : null}
                {benefitErrors ?
              <ErrorMessage>{benefitErrors}</ErrorMessage> : null}
                <ButtonContainer>
                    <ButtonStyled to={'/benefitsRedeemed'}>
                        Historial de beneficios
                    </ButtonStyled>
                    <ButtonStyled to={'/home'}>
                        Cancelar
                    </ButtonStyled>
                </ButtonContainer>
            </StyledContainer>
        </div>
    )
}
export default Benefits;