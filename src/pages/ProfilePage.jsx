import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, useSession } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {session.user.name || 'User'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{session.user.email}</p>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {session.user.name || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <p className="text-gray-900 dark:text-white">{session.user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Verified
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {session.user.emailVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Not Verified
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account Created
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {session.user.createdAt
                        ? new Date(session.user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
