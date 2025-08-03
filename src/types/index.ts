export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phone?: string;
  isContributor?: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  uploadedBy: string;
  uploaderName: string;
  uploaderEmail?: string;
  uploaderPhone?: string;
  showContact: boolean;
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
  downloadCount: number;
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
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  loading: boolean;
}