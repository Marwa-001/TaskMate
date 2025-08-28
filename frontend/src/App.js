import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="flex bg-[#F5F8FF] min-h-screen font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
