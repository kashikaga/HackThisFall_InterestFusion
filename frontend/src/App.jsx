import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/Landingpage/Landingpage";
import Login2 from "./components/LoginComp/Login2";
import PageNotFound from "./components/PageNotFound";
import { ONESIGNAL_APP_ID } from "./utils/constants";
import OneSignal from "react-onesignal";
import Chat from "./components/Chat/Chat";
import About from "./components/About"; // Import About component
import Contact from "./components/Contact"
import StudyGroup from "./components/StudyGroup";
import InterestMatching from "./components/InterestMatching"
import SupportPage from "./components/SupportPage";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import CursorTrail from "./components/CursorTrail";
import Community from "./components/Community";
import CommunityEvents from "./components/Events/CommunityEvents";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/Terms";

function App() {
  try {
    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      notifyButton: {
        enable: true,
      },
    }).then(() => {
      OneSignal.Notifications.requestPermission();
    });
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <ScrollToTop />
          <Routes>
            {/* Separate layout for LandingPage */}
            <Route path="/" element={<LandingPage />} />

            {/* About Page */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/groups" element={<StudyGroup />} />
            <Route path="/services/events" element={<CommunityEvents/>} />
            <Route path="/services/matching" element={<InterestMatching />} /> 
            <Route path="/support" element={<SupportPage />} /> 
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
            <Route path="/terms" element={<TermsOfService/>}></Route>


            {/* Parent Route with NavBar and Footer */}
            <Route element={<Body />}>
              <Route path="home" element={<Feed />} />
              <Route path="login" element={<Login2 />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/community" element= {<Community/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <CursorTrail/>

    </>
  );
}

export default App;
