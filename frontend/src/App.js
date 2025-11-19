// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Common from './Common';
import Loginpage from './components/Loginpage';
import Register from './components/Register';
import Firstnextpage from './components/Firstnextpage';
import ProcessSteps from './components/ProcessSteps';
import EarningsPage from './components/EarningsPage';
import SkyFunded from './components/SkyFunded';
import ChallengePage from './components/ChallengePage';
import FeedbackSlider from './components/FeedbackSlider';
import TradersFeedback from './components/TradersFeedback';
import ContactUs from './components/ContactUs';
import SkyfundedChallenge from './components/SkyfundedChallenge';
import Express from './components/Express';
import Evaluation from './components/Evaluation';
import HowItWorks from './components/HowItWorks';
import Faq from './components/Faq';
import ExpertBanner from './components/ExpertBanner';

import AdminPanel from './pages/AdminPanel';
import Homepage from './components/Homepage';
import Tablesteps from './components/Tablesteps';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile';
// import AdminChallengePage from './pages/AdminChallengePage';
import AdminWithdrawlsPage from './pages/AdminWithdrawlsPage';
import Transaction from './pages/Transactions';
import Settings from './pages/Settings';
import Deposit from './pages/Deposit';

import Layout from './components/Layout';

import HeadAdminpanel from './HeadAdminpanel/HeadAdminpanel';
import Adminlogin from './HeadAdminpanel/Adminlogin';
import UsersPage from './HeadAdminpanel/UsersPage';
// import ReferEarn from "./pages/ReferEarn"; 
import Certificates from "./pages/Certificates";
import SupportTickets from './pages/SupportTickets';
import Kyc from './pages/Kyc';
// import Comparision from './components/Comparision';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import RiskDisclosure from './components/RiskDisclosure';
import TermsAndConditions from './components/TermsAndConditions';
import ComplaintHandling from './components/ComplaintHandling';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Common />}>
          <Route index element={<Homepage />} />
          <Route path="/firstnextpage" element={<Firstnextpage />} />
          <Route path="/process-steps" element={<ProcessSteps />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/skyfunded-challenge" element={<SkyfundedChallenge />} />
          <Route path="/express" element={<Express />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/challenge-page" element={<ChallengePage />} />
          <Route path="/Tablesteps" element={<Tablesteps />} />
          <Route path="/sky-funded" element={<SkyFunded />} />
          <Route path="/earnings-page" element={<EarningsPage />} />
          <Route path="/feedback-slider" element={<FeedbackSlider />} />
          <Route path="/traders-feedback" element={<TradersFeedback />} />
          <Route path="/expert-banner" element={<ExpertBanner/>}/>
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          <Route path="/cookie" element={<CookiePolicy/>}/>
          <Route path="/risk-disclosure" element={<RiskDisclosure/>}/>
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
          <Route path="/complaint-handling" element={<ComplaintHandling/>}/>
        </Route>

        {/* Admin Login */}
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kyc"
          element={
            <ProtectedRoute>
              <Layout>
                <Kyc />
              </Layout>
            </ProtectedRoute>
          }
        />
           <Route
          path="/withdrawls"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminWithdrawlsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/refer-earn"
          element={
            <ProtectedRoute>
              <Layout>
                <ReferEarn />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Layout>
                <SupportTickets />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Certificates"
          element={
            <ProtectedRoute>
              <Layout>
                <Certificates />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/challenge-page"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminChallengePage />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Layout>
                <Transaction />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <Layout>
                <Deposit />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Head Admin Panel */}
        <Route
          path="/headadmin"
          element={
            <ProtectedRoute>
              <HeadAdminpanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/headadmin/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        {/* Default route for /admin/* */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
