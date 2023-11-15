import {StyledTextInput,TextInputContainer, ButtonContainer, NormalSumbitStyled} from '../components/stylesInputs'
import {StyledContainer,TitleStyledContainer, SubtitleStyledContainer, BackButton,ButtonStyled, ErrorMessage, SuccessMessage}  from '../components/styles'
import { Formik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";
import { ONLYNUMBERS } from '../utils/Patterns';
const CreditCard = () => {
    const {user} = useAuth();
    const {addCard, errors: addCardError, response :cardResponse, cleanAlerts} = useCard();
    return (
    <StyledContainer>
     <BackButton onClick={() => cleanAlerts()} to={'/card'}>
      Volver 
     </BackButton>
     <TitleStyledContainer>Agregar tarjeta</TitleStyledContainer>
     <SubtitleStyledContainer>Completa con los datos de tu tarjeta de debito para sumar puntos en GG-Wallet</SubtitleStyledContainer>
     <Formik
       initialValues={{ cardNumber: '', goodTill: '', securityCode: ''}}
       validate={values => {
         const errors = {};
         if (!values.cardNumber) {
           errors.cardNumber = 'Ingrese los digitos de la tarjeta ha vincular';
         }
         else if(!ONLYNUMBERS.test(values.cardNumber)) {
          errors.cardNumber = 'Ingrese únicamente números';
         }
         if(!values.goodTill){
            errors.goodTill = 'Ingrese fecha de caducidad';
         }
         else if(!ONLYNUMBERS.test(values.goodTill)) {
          errors.goodTill = 'Ingrese únicamente números';
         }
         if(!values.securityCode){
            errors.securityCode = 'Ingrese el codigo de seguridad';
         }
         else if(!ONLYNUMBERS.test(values.securityCode)) {
          errors.securityCode = 'Ingrese únicamente números';
         }
         return errors;
       }}
       onSubmit={async (values, { resetForm }) => {
         await addCard(
          { cardNumber: values.cardNumber, goodTill: values.goodTill, secretCode:  values.securityCode, dni: user.dni }
         )
         resetForm();
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
       }) => (
         <form onSubmit={handleSubmit}>
            <TextInputContainer>
                <StyledTextInput
                    placeholder="Numero de tarjeta" 
                    type="text"
                    name="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardNumber}
                />
                {errors.cardNumber && touched.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
                <StyledTextInput
                    placeholder="Fecha de caducidad (MMAA)" 
                    type="text"
                    name="goodTill"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.goodTill}
                    maxLength={4}
                />
                {errors.goodTill && touched.goodTill && <ErrorMessage>{errors.goodTill}</ErrorMessage>}
                <StyledTextInput
                    placeholder="Codigo de seguridad" 
                    type="text"
                    name="securityCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.securityCode}
                />
                {errors.securityCode && touched.securityCode && <ErrorMessage>{errors.securityCode}</ErrorMessage>}
           </TextInputContainer>
           {cardResponse ? 
              <SuccessMessage>{cardResponse}</SuccessMessage>
            : null}
           {addCardError ? <ErrorMessage>{addCardError}</ErrorMessage> : null}
           <ButtonContainer>
                <NormalSumbitStyled type="submit" >
                    Registrar tarjeta
                </NormalSumbitStyled>
                <ButtonStyled to={'/card'}>
                    Cancelar
                </ButtonStyled>
            </ButtonContainer>
         </form>
       )}
     </Formik>
   </StyledContainer>
    )
}
export default CreditCard;