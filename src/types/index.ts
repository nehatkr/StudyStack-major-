export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
  role: 'viewer' | 'contributor' | 'admin';
  showContactInfo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContributorApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  name: string;
  collegeRollNumber: string;
  universityRollNumber: string;
  batch: string;
  semester?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'notes' | 'pyq' | 'syllabus';
  subject: string;
  semester: string;
  tags: string[];
  year?: number;
  fileURL: string;
  fileName: string;
  fileSize: number;
  uploaderUID: string;
  uploaderName: string;
  uploaderEmail?: string;
  uploaderPhone?: string;
  showUploaderContact: boolean;
  downloads: number;
  averageRating: number;
  totalRatings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  rating: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  createdAt: Date;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

export interface FilterOptions {
  type?: string;
  subject?: string;
  semester?: string;
  year?: string;
  tags?: string[];
  search?: string;
}