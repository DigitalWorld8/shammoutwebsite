import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white px-6">
            <div className="text-center max-w-md">
                <h1 className="text-7xl font-bold text-blue-600 drop-shadow-md">404</h1>
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-2 text-gray-500">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
