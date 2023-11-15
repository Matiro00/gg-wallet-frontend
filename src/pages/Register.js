import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledTextInput, SumbitStyled, TextInputContainer, ButtonContainer } from '../components/stylesInputs'
import { StyledContainer, TitleStyledContainer, SubtitleStyledContainer, SwitchMessage, BackButton, ErrorMessage } from '../components/styles'
import { Formik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { ONLYALPHANUMERICHARACTERS, ONLYNUMBERS } from "../utils/Patterns";

const Register = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, user, errors: registerErrors } = useAuth();
  useEffect(() => {
    if (isAuthenticated) { navigate('/home') }
    else if (user) { navigate('/verification') }
  }, [isAuthenticated, user, navigate]);
  return (
    <StyledContainer>
      <BackButton to={'/'}>
        Volver al inicio
      </BackButton>
      <TitleStyledContainer>Registrarse</TitleStyledContainer>
      <SubtitleStyledContainer>Ingrese los datos para crear su cuenta de GG-Wallet</SubtitleStyledContainer>
      <Formik
        initialValues={{ email: '', dni: '', password: '', passwordRepit: '', username: '' }}
        validate={values => {
          const errors = {};
          if (!values.dni) {
            errors.dni = 'Ingrese un DNI';
          }
          else if(!ONLYNUMBERS.test(values.dni)){
            errors.dni = 'Ingrese únicamente números';
          }
          if (!values.username) {
            errors.username = 'Ingrese un nombre de usuario';
          }
          else if (!ONLYALPHANUMERICHARACTERS.test(values.username)) {
            errors.username = 'Ingrese letras y números';
          }
          if (!values.email) {
            errors.email = 'Ingrese un mail';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Email invalido';
          }
          if (!values.password) {
            errors.password = 'Ingrese una contraseña';
          }
          if (!values.passwordRepit) {
            errors.passwordRepit = 'Ingrese nuevamente su contraseña';
          } else if (values.passwordRepit !== values.password) {
            errors.passwordRepit = 'Las contraseñas no coinciden';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const user = {
            dni: parseInt(values.dni),
            username: values.username,
            password: values.password,
            email: values.email
          }
          await signup(user);
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
              <StyledTextInput
                placeholder="DNI"
                type="text"
                name="dni"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dni}
              />
              {errors.dni && touched.dni && <ErrorMessage>{errors.dni}</ErrorMessage>}
              <StyledTextInput
                placeholder="Nombre de usuario"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              <StyledTextInput
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <StyledTextInput
                placeholder="Contraseña"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              <StyledTextInput
                placeholder="Repetir Contraseña"
                type="password"
                name="passwordRepit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordRepit}
              />
              {errors.passwordRepit && touched.passwordRepit && <ErrorMessage>{errors.passwordRepit}</ErrorMessage>}
            </TextInputContainer>
            {registerErrors ? registerErrors.map((error, i) => (
              <ErrorMessage key={i}>{error}</ErrorMessage>
            )) : null}
            <ButtonContainer>
              <SumbitStyled type="submit" disabled={isSubmitting}>
                Registrarse
              </SumbitStyled>
            </ButtonContainer>
            <ButtonContainer>
              <SwitchMessage>
                Ya tenes cuenta? Logeate <Link to='/login'>aqui</Link>
              </SwitchMessage>
            </ButtonContainer>
          </form>
        )}
      </Formik>
    </StyledContainer>
  )
}
export default Register;