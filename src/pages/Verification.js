import { SumbitStyled, TextInputContainer, ButtonContainer, StyledCodeInput } from '../components/stylesInputs'
import { StyledContainer, TitleStyledContainer, SubtitleStyledContainer, BackButton, ErrorMessage } from '../components/styles'
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';
import { ONLYNUMBERS } from '../utils/Patterns';
const Verification = () => {
    const { user, verificationCode,isAuthenticated, logout, errors: verificationErrors, checkLogin } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated) navigate('/home');
    },[isAuthenticated,navigate])
    return (
        <StyledContainer>
            <BackButton onClick={logout} to={'/'}>
                Volver al inicio
            </BackButton>
            <TitleStyledContainer>Enviamos a su correo de mail un codigo de verificacion</TitleStyledContainer>
            <SubtitleStyledContainer>Ingreselo para poder continuar con la creacion de su cuenta</SubtitleStyledContainer>
            <Formik
                initialValues={{ code: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.code) {
                        errors.code = 'Ingrese el codigo de verificacion';
                    }
                    else if (!ONLYNUMBERS.test(values.code)) {
                        errors.code = 'Ingrese únicamente números';
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    verificationCode(user.dni, parseInt(values.code))
                    checkLogin();
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
                            <StyledCodeInput
                                placeholder="codigo"
                                type="text"
                                name="code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.code}
                                maxLength={4}
                            />
                            {errors.code && touched.code && <ErrorMessage> {errors.code}</ErrorMessage>}

                        </TextInputContainer>
                        {verificationErrors ? <ErrorMessage>{verificationErrors}</ErrorMessage>: null}
                        <ButtonContainer>
                            <SumbitStyled type="submit" disabled={isSubmitting}>
                                Enviar
                            </SumbitStyled>
                        </ButtonContainer>
                    </form>
                )}
            </Formik>
        </StyledContainer>

    )

};

export default Verification;