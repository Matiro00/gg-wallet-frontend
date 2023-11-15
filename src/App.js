import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import Transfer from './pages/Transfer';
import Benefits from './pages/Benefits';
import Login from './pages/Login';
import Register from './pages/Register';
import Verification from './pages/Verification';
import BenefitsRedeemed from './pages/BenefitsRedeemed';
import { StyledBackground } from './components/styles';
import { AuthProvider } from './context/AuthContext';
import { TransferProvider } from './context/TransferContext';
import { CardProvider } from './context/CardContext';
import { BenefitProvider } from './context/BenefitContext';
import { ProtectedRoute } from "./protectedRoutes";
import { ProtectedRoutesVerification } from './protectedRoutesVerification'
import Cards from './pages/Cards';

const App = () => {
   return (
      <>
         <AuthProvider>
            <StyledBackground>
               <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<ProtectedRoutesVerification />}>
                     <Route path="/verification" element={<Verification />} />
                  </Route>
                  <Route element={<ProtectedRoute />}>
                     <Route path="/home" element={<Home />} />
                     <Route path="/card" element={<CardProvider><Cards /></CardProvider>} />
                     <Route path="/addCard" element={<CardProvider><AddCard /></CardProvider>} />
                     <Route path="/transfer" element={<TransferProvider><Transfer /></TransferProvider>} />
                     <Route path="/benefits" element={<BenefitProvider><Benefits /></BenefitProvider>} />
                     <Route path="/benefitsRedeemed" element={<BenefitProvider><BenefitsRedeemed /></BenefitProvider>} />
                  </Route>
               </Routes>
            </StyledBackground>
         </AuthProvider></>
   );
};

export default App;