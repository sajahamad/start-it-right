import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Compare from './pages/Compare.jsx';
import Guide from './pages/Guide.jsx';
import Home from './pages/Home.jsx';
import MajorDetail from './pages/MajorDetail.jsx';
import Majors from './pages/Majors.jsx';
import NotFound from './pages/NotFound.jsx';
import Resources from './pages/Resources.jsx';

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-amber-50 font-['Tajawal'] text-stone-700">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/majors/:id" element={<MajorDetail />} />
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
