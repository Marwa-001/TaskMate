import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F5F8FF] p-8 font-inter">
      <Header />
      <div className="flex flex-1 mt-8">
        <Sidebar />
        <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
};
  

export default App;
