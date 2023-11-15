import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {StyledTextInput,SumbitStyled,TextInputContainer, ButtonContainer} from '../components/stylesInputs'
import {StyledContainer,TitleStyledContainer, SubtitleStyledContainer, SwitchMessage, BackButton, ErrorMessage}  from '../components/styles'
import { Formik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { ONLYALPHANUMERICHARACTERS } from '../utils/Patterns'
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated,user, errors : loginErrors} = useAuth();
  useEffect(() => {
    if (isAuthenticated) { navigate('/home') }
    else if(user){navigate('/verification')}
  }, [isAuthenticated,user,navigate]);
    return (
    <StyledContainer>
     <BackButton to={'/'}>
      Volver al inicio
     </BackButton>
     <TitleStyledContainer>Login</TitleStyledContainer>
     <SubtitleStyledContainer>Ingrese los datos para poder continuar</SubtitleStyledContainer>
     <Formik
       initialValues={{ username: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.username) {
          errors.username = 'Ingrese un nombre de usuario';
        }
        else if(!ONLYALPHANUMERICHARACTERS.test(values.username)){
          errors.username = 'Ingrese letras y numeros';
        }
         if(!values.password){
            errors.password = 'Ingrese una contraseña';
         }
         return errors;
       }}
       onSubmit={async (values) => {
        await login(values.username, values.password);          
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
                    placeholder="Nombre de usuario" 
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                />
                {errors.username && touched.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                <StyledTextInput
                    placeholder="Contraseña" 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
           </TextInputContainer>
           {loginErrors ? loginErrors.map((error, i) => (
              <ErrorMessage key={i}>{error}</ErrorMessage>
            )) : null}
           <ButtonContainer>
                <SumbitStyled type="submit" disabled={isSubmitting}>
                    Ingresar
                </SumbitStyled>
            </ButtonContainer>
            <ButtonContainer>
                <SwitchMessage>
                    No tenes cuenta? Registrate <Link to='/register'>aqui</Link>
                </SwitchMessage>
            </ButtonContainer>
         </form>
       )}
     </Formik>
   </StyledContainer>
    )
}
export default Login;