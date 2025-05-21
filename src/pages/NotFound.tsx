import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex  flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div className="text-[#cc1f41] text-7xl font-extrabold mb-2">404</div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#cc1f41] text-white font-semibold hover:bg-[#a31a35] transition shadow-md"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
