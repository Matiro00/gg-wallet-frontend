import { TextInputContainer, ButtonContainer, NormalSumbitStyled, StyledTransferCodeInput } from '../components/stylesInputs'
import { StyledContainer, TitleStyledContainer, SubtitleStyledContainer, BackButton, ButtonStyled, ErrorMessage, SuccessMessage } from '../components/styles'
import { Formik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { useTransfer } from "../context/TransferContext";
import { ONLYNUMBERS } from '../utils/Patterns';

const Transfer = () => {
  const { user } = useAuth();
  const { doTransfer, errors: transferErrors, response: transferResponse } = useTransfer();
  return (
    <StyledContainer>
      <BackButton to={'/home'}>
        Volver
      </BackButton>
      <TitleStyledContainer>Transferencia</TitleStyledContainer>
      <SubtitleStyledContainer>Saldo disponible {user.credits}</SubtitleStyledContainer>
      <Formik
        initialValues={{ credit: '', ggwcbu: '' }}
        validate={values => {
          const errors = {};
          if (!values.credit) {
            errors.credit = 'Ingrese un monto para transferir';
          }
          else if (!ONLYNUMBERS.test(values.credit)) {
            errors.credit = 'Ingrese únicamente números';
          }
          else if (values.credit > user.credits) {
            errors.credit = 'Créditos insuficientes';
          }
          if (!values.ggwcbu) {
            errors.ggwcbu = 'Ingrese el ggwcbu del usuario destinatario';
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          await doTransfer({
            userIDReceiver: values.ggwcbu, userIDSender: user.ggwcbu, credit: parseInt(values.credit)
          });
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
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInputContainer>
              <StyledTransferCodeInput
                placeholder="Credito a transferir"
                type="text"
                name="credit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.credit}
              />
              {errors.credit && touched.credit && <ErrorMessage>{errors.credit}</ErrorMessage>}
              <StyledTransferCodeInput
                placeholder="GGWCBU Destino"
                type="text"
                name="ggwcbu"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ggwcbu}
              />
              {errors.ggwcbu && touched.ggwcbu && <ErrorMessage>{errors.ggwcbu}</ErrorMessage>}
            </TextInputContainer>
            {transferResponse ? 
              <SuccessMessage>{transferResponse}</SuccessMessage>
            : null}
            {transferErrors ? transferErrors.map((error, i) => (
              <ErrorMessage key={i}>{error}</ErrorMessage>
            )) : null}
            <ButtonContainer>
              <NormalSumbitStyled type="submit">
                Transferir
              </NormalSumbitStyled>
              <ButtonStyled to={'/home'}>
                Cancelar
              </ButtonStyled>
            </ButtonContainer>
          </form>
        )}
      </Formik>
    </StyledContainer>
  )
}
export default Transfer;