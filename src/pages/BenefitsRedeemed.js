import { useEffect } from "react";
import { TitleStyledContainer, SubtitleStyledContainer, StyledContainer, BackButton, InformationContainer } from '../components/styles'
import { BenefitsRedeemedStyledContainer, CardStyled } from '../components/stylesBenefits'
import { useBenefit } from "../context/BenefitContext";
import { useAuth } from "../context/AuthContext";
import { ErrorMessage } from "formik";

const BenefitsRedeemed = () => {
    const { getBenefitsRedeemed, benefitsRedeemed, errors: benefitError } = useBenefit();
    const { user } = useAuth();
    useEffect(() => {
        getBenefitsRedeemed({dni:user.dni});
    }, []);
    return (
        <div>
            <StyledContainer>
                <BackButton to={'/benefits'}>
                    Volver
                </BackButton>
                <TitleStyledContainer size={42}>
                    Historial de beneficios
                </TitleStyledContainer>
                <BenefitsRedeemedStyledContainer>
                    {benefitsRedeemed.length === 0 && (
                        <InformationContainer>
                            No canjeaste ningun beneficio
                        </InformationContainer>
                    )}
                    {benefitsRedeemed.map((benefit) => {
                        return(
                        <CardStyled key={benefit._id}>
                            <TitleStyledContainer size={24}>
                                {benefit.title}
                            </TitleStyledContainer>
                            <TitleStyledContainer size={16}>
                                Coste: {benefit.price}
                            </TitleStyledContainer>
                            <SubtitleStyledContainer size={8}>
                                id: {benefit._id}
                            </SubtitleStyledContainer>
                        </CardStyled>)
                    }
                    )}
                </BenefitsRedeemedStyledContainer>
                {/* {benefitError ? benefitError.map((error, i) => (
              <ErrorMessage>{error}</ErrorMessage>
            )) : null} */}
            </StyledContainer>
        </div>
    )
}
export default BenefitsRedeemed;