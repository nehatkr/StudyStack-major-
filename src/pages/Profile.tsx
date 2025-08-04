import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Save, Upload, Download, Star, Calendar, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getResources } from '../services/firebase';
import { Resource } from '../types';
import ResourceCard from '../components/UI/ResourceCard';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Profile: React.FC = () => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'uploads' | 'settings'>('overview');
  const [userResources, setUserResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    phoneNumber: user?.phoneNumber || '',
    showContactInfo: user?.showContactInfo || false,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        bio: user.bio || '',
        phoneNumber: user.phoneNumber || '',
        showContactInfo: user.showContactInfo || false,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'contributor') {
      loadUserResources();
    }
  }, [user]);

  const loadUserResources = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get all resources uploaded by this user
      const result = await getResources({}, undefined);
      const filteredResources = result.resources.filter(
        resource => resource.uploaderUID === user.uid
      );
      setUserResources(filteredResources);
    } catch (error) {
      console.error('Error loading user resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProfileData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateUserProfile(profileData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (newRole: 'viewer' | 'contributor') => {
    if (!user) return;

    setSaving(true);
    try {
      await updateUserProfile({ role: newRole });
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    ...(user.role === 'contributor' ? [{ id: 'uploads' as const, label: 'My Uploads', icon: Upload }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = user.role === 'contributor' ? [
    { label: 'Resources Uploaded', value: userResources.length, icon: Upload },
    { label: 'Total Downloads', value: userResources.reduce((sum, r) => sum + r.downloads, 0), icon: Download },
    { label: 'Average Rating', value: userResources.length > 0 ? (userResources.reduce((sum, r) => sum + r.averageRating, 0) / userResources.length).toFixed(1) : '0.0', icon: Star },
  ] : [
    { label: 'Member Since', value: user.createdAt.getFullYear().toString(), icon: Calendar },
    { label: 'Account Type', value: user.role === 'viewer' ? 'Viewer' : 'Contributor', icon: User },
  ];

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setLoading(true);
    if (!user || !user.uid) return;
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // Update user profile URL in Firestore or Clerk
    await updateDoc(doc(db, 'users', user.uid), {
      photoURL: downloadURL,
    });

    // Optional: refresh user state if needed
    window.location.reload(); // or use a state to update it in-place
  } catch (err) {
    console.error('Error uploading image:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-24 w-24 rounded-full"
                />
              ) : (
                <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <span className="text-xs">Uploading...</span>
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>

            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.displayName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'contributor'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                  {user.role === 'contributor' ? 'Contributor' : 'Viewer'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Joined {user.createdAt.toLocaleDateString()}
                </span>
              </div>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 mt-2">{user.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Profile Information
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.displayName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                        <dd className="text-sm text-gray-900 dark:text-white capitalize">{user.role}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</dt>
                        <dd className="text-sm text-gray-900 dark:text-white">{user.createdAt.toLocaleDateString()}</dd>
                      </div>
                      {user.phoneNumber && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{user.phoneNumber}</dd>
                        </div>
                      )}
                      {user.bio && (
                        <div className="md:col-span-2">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{user.bio}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {/* Uploads Tab */}
            {activeTab === 'uploads' && user.role === 'contributor' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    My Uploads ({userResources.length})
                  </h3>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : userResources.length === 0 ? (
                  <div className="text-center py-12">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No uploads yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start sharing resources with the community!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userResources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onViewDetails={() => { }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Profile Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        rows={3}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="showContactInfo"
                        name="showContactInfo"
                        type="checkbox"
                        checked={profileData.showContactInfo}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <label htmlFor="showContactInfo" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Show contact information by default on uploads
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      {editMode ? (
                        <>
                          <button
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {saving ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditMode(true)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role Management */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Account Type
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Choose your account type. Contributors can upload resources, while viewers can only browse and download.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value="viewer"
                          checked={user.role === 'viewer'}
                          onChange={() => handleRoleChange('viewer')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Viewer - Browse and download resources
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value="contributor"
                          checked={user.role === 'contributor'}
                          onChange={() => handleRoleChange('contributor')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Contributor - Upload and share resources
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;