import { Route, Routes } from 'react-router-dom';
import watermarkTile from './assets/watermark-tile.png';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Compare from './pages/Compare.jsx';
import Guide from './pages/Guide.jsx';
import Home from './pages/Home.jsx';
import MajorDetail from './pages/MajorDetail.jsx';
import Majors from './pages/Majors.jsx';
import NotFound from './pages/NotFound.jsx';
import Resources from './pages/Resources.jsx';
import UniversityDetail from './pages/UniversityDetail.jsx';
import Universities from './pages/Universities.jsx';

function App() {
  return (
    <div className="relative z-0 flex min-h-svh flex-col bg-surface font-sans text-ink">
      <img
        src={watermarkTile}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 left-1/2 -z-10 w-105 max-w-[75vw] -translate-x-1/2 -translate-y-1/2 select-none"
      />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/majors/:id" element={<MajorDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:universityId" element={<UniversityDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
