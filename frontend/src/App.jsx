import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import TodayPage from './pages/TodayPage';
import TimelinePage from './pages/TimelinePage';
import InnerSupportPage from './pages/InnerSupportPage';
import AccountPage from './pages/Account';
import EditGratitudePage from './pages/EditGratitudePage';
import EditDiaryPage from './pages/EditDiaryPage';
import PageMain from './components/PageMain';
import PageSub from './components/PageSub';
import IsPrivate from './components/IsPrivate';
import IsPublic from './components/IsPublic';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IsPublic>
              <LandingPage />
            </IsPublic>
          }
        />
        <Route
          path="/signup"
          element={
            <IsPublic>
              <SignupPage />
            </IsPublic>
          }
        />
        <Route
          path="/login"
          element={
            <IsPublic>
              <LoginPage />
            </IsPublic>
          }
        />
        <Route
          path="/today"
          element={
            <IsPrivate>
              <TodayPage />
            </IsPrivate>
          }
        />
        <Route
          path="/edit-gratitude"
          element={
            <IsPrivate>
              <EditGratitudePage />
            </IsPrivate>
          }
        />
        <Route
          path="/edit-gratitude/:entryID"
          element={
            <IsPrivate>
              <EditGratitudePage />
            </IsPrivate>
          }
        />

        <Route
          path="/edit-diary"
          element={
            <IsPrivate>
              <EditDiaryPage />
            </IsPrivate>
          }
        />

        <Route
          path="/edit-diary/:entryID"
          element={
            <IsPrivate>
              <EditDiaryPage />
            </IsPrivate>
          }
        />

        <Route
          path="/timeline"
          element={
            <IsPrivate>
              <TimelinePage />
            </IsPrivate>
          }
        />
        <Route
          path="/inner-support"
          element={
            <IsPrivate>
              <InnerSupportPage />
            </IsPrivate>
          }
        />
        <Route
          path="/account"
          element={
            <IsPrivate>
              <AccountPage />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
