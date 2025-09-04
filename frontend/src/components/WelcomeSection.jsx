import { useAuth } from '../store/AuthContext'; // ✅ import auth

const WelcomeSection = () => {
  const { user } = useAuth(); // ✅ get user from context

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome back, {user?.name || 'User'} 👋
      </h2>
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2 overflow-hidden">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="https://placehold.co/32x32/E0E0E0/white?text=JD"
            alt="User 1"
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="https://placehold.co/32x32/E0E0E0/white?text=MS"
            alt="User 2"
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="https://placehold.co/32x32/E0E0E0/white?text=LK"
            alt="User 3"
          />
        </div>
        <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Invite
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
