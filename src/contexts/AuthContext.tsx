import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { AuthContextType, User } from '../types';
import { createUserProfile, getUserProfile, updateUserProfile as updateUserProfileService } from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user profile exists in Firestore
        const userProfile = await getUserProfile(firebaseUser.uid);
        
        if (userProfile) {
          setUser(userProfile);
        } else {
          // Create user profile if it doesn't exist
          const newUserProfile: Omit<User, 'uid'> = {
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            bio: '',
            role: 'viewer',
            showContactInfo: false,
            phoneNumber: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          await createUserProfile(firebaseUser.uid, newUserProfile);
          setUser({ uid: firebaseUser.uid, ...newUserProfile });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update Firebase Auth profile
    await updateProfile(firebaseUser, { displayName });
    
    // Create Firestore user profile
    const userProfile: Omit<User, 'uid'> = {
      email,
      displayName,
      photoURL: '',
      bio: '',
      role: 'viewer',
      showContactInfo: false,
      phoneNumber: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await createUserProfile(firebaseUser.uid, userProfile);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const { user: firebaseUser } = await signInWithPopup(auth, googleProvider);
    
    // Check if user profile exists, create if not
    const existingProfile = await getUserProfile(firebaseUser.uid);
    
    if (!existingProfile) {
      const userProfile: Omit<User, 'uid'> = {
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || undefined,
        bio: '',
        role: 'viewer',
        showContactInfo: false,
        phoneNumber: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await createUserProfile(firebaseUser.uid, userProfile);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    await updateUserProfileService(user.uid, data);
    setUser({ ...user, ...data, updatedAt: new Date() });
    
    // Update Firebase Auth profile if displayName or photoURL changed
    if (data.displayName || data.photoURL) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL || user.photoURL,
      });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};