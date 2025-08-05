import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  setDoc,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { Resource, Comment, Rating, FilterOptions, User, ContributorApplication } from '../types';

// User operations
export const createUserProfile = async (uid: string, userData: Omit<User, 'uid'>) => {
  await setDoc(doc(db, 'users', uid), {
    ...userData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const data = userSnap.data();
    console.log(data);
    
    return {
      uid,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as User;
  }
  return null;
};

export const updateUserProfile = async (uid: string, userData: Partial<User>) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: Timestamp.now(),
  });
};

// Contributor application operations
export const submitContributorApplication = async (
  applicationData: Omit<ContributorApplication, 'id' | 'status' | 'appliedAt' | 'reviewedAt' | 'reviewedBy'>
) => {
  // Check if user already has a pending or approved application
  const q = query(
    collection(db, 'contributorApplications'),
    where('userId', '==', applicationData.userId),
    where('status', 'in', ['pending', 'approved'])
  );
  
  const existingApplications = await getDocs(q);
  
  if (!existingApplications.empty) {
    throw new Error('You already have a pending or approved application');
  }

  const applicationRef = await addDoc(collection(db, 'contributorApplications'), {
    ...applicationData,
    status: 'pending',
    appliedAt: Timestamp.now(),
  });

  return applicationRef.id;
};

export const getContributorApplications = async (): Promise<ContributorApplication[]> => {
  const q = query(collection(db, 'contributorApplications'), orderBy('appliedAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const applications: ContributorApplication[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    applications.push({
      id: doc.id,
      ...data,
      appliedAt: data.appliedAt.toDate(),
      reviewedAt: data.reviewedAt?.toDate(),
    } as ContributorApplication);
  });

  return applications;
};

export const getUserContributorApplication = async (userId: string): Promise<ContributorApplication | null> => {
  const q = query(
    collection(db, 'contributorApplications'),
    where('userId', '==', userId),
    orderBy('appliedAt', 'desc'),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      appliedAt: data.appliedAt.toDate(),
      reviewedAt: data.reviewedAt?.toDate(),
    } as ContributorApplication;
  }
  
  return null;
};

export const approveContributorApplication = async (applicationId: string, userId: string, reviewerId: string) => {
  // Update application status
  const applicationRef = doc(db, 'contributorApplications', applicationId);
  await updateDoc(applicationRef, {
    status: 'approved',
    reviewedAt: Timestamp.now(),
    reviewedBy: reviewerId,
  });

  // Update user role to contributor
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    role: 'contributor',
    updatedAt: Timestamp.now(),
  });
};

export const rejectContributorApplication = async (applicationId: string, reviewerId: string) => {
  const applicationRef = doc(db, 'contributorApplications', applicationId);
  await updateDoc(applicationRef, {
    status: 'rejected',
    reviewedAt: Timestamp.now(),
    reviewedBy: reviewerId,
  });
};

// Resource operations
export const uploadResource = async (
  file: File,
  resourceData: Omit<Resource, 'id' | 'fileURL' | 'fileName' | 'fileSize' | 'downloads' | 'averageRating' | 'totalRatings' | 'createdAt' | 'updatedAt'>
) => {
  // Upload file to storage
  const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const fileURL = await getDownloadURL(snapshot.ref);
console.log(resourceData, fileURL, file, storageRef, snapshot);

  // Create resource document
  const resourceRef = await addDoc(collection(db, 'resources'), {
    ...resourceData,
    fileURL,
    fileName: file.name,
    fileSize: file.size,
    downloads: 0,
    averageRating: 0,
    totalRatings: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return resourceRef.id;
};

export const getResources = async (filters: FilterOptions = {}, lastDoc?: DocumentSnapshot) => {
  let q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));

  // Apply Firestore filters
  if (filters.type) {
    q = query(q, where('type', '==', filters.type));
  }
  if (filters.subject) {
    q = query(q, where('subject', '==', filters.subject));
  }
  if (filters.semester) {
    q = query(q, where('semester', '==', filters.semester));
  }
  if (filters.year) {
    q = query(q, where('year', '==', filters.year));
  }
  if (filters.tags && filters.tags.length > 0) {
    q = query(q, where('tags', 'array-contains-any', filters.tags));
  }

  // Pagination
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  q = query(q, limit(20)); // Fetch 20 docs

  const querySnapshot = await getDocs(q);
  let resources: Resource[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    resources.push({
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Resource);
  });

  // Client-side search filtering
  if (filters.search && filters.search.trim() !== '') {
    const searchLower = filters.search.toLowerCase();

    resources = resources.filter((resource) =>
      JSON.stringify(resource).toLowerCase().includes(searchLower)
    );
  }

  return {
    resources,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    hasMore: querySnapshot.docs.length === 20,
  };
};

export const getResourceById = async (id: string): Promise<Resource | null> => {
  const resourceRef = doc(db, 'resources', id);
  const resourceSnap = await getDoc(resourceRef);
  
  if (resourceSnap.exists()) {
    const data = resourceSnap.data();
    return {
      id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Resource;
  }
  return null;
};

export const updateResourceDownloads = async (resourceId: string) => {
  const resourceRef = doc(db, 'resources', resourceId);
  await updateDoc(resourceRef, {
    downloads: increment(1),
  });
};

export const deleteResource = async (resourceId: string, fileURL: string) => {
  // Delete file from storage
  const fileRef = ref(storage, fileURL);
  await deleteObject(fileRef);

  // Delete resource document
  await deleteDoc(doc(db, 'resources', resourceId));
};

// Comment operations
export const addComment = async (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
  const commentRef = await addDoc(collection(db, 'comments'), {
    ...commentData,
    createdAt: Timestamp.now(),
  });
  return commentRef.id;
};

export const getComments = async (resourceId: string) => {
  const q = query(
    collection(db, 'comments'),
    where('resourceId', '==', resourceId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const comments: Comment[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    comments.push({
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Comment);
  });

  return comments;
};

export const deleteComment = async (commentId: string) => {
  await deleteDoc(doc(db, 'comments', commentId));
};

// Rating operations
export const addOrUpdateRating = async (ratingData: Omit<Rating, 'id' | 'createdAt'>) => {
  // Check if user already rated this resource
  const q = query(
    collection(db, 'ratings'),
    where('resourceId', '==', ratingData.resourceId),
    where('userId', '==', ratingData.userId)
  );
  
  const existingRatings = await getDocs(q);
  
  if (existingRatings.empty) {
    // Add new rating
    await addDoc(collection(db, 'ratings'), {
      ...ratingData,
      createdAt: Timestamp.now(),
    });
  } else {
    // Update existing rating
    const existingRating = existingRatings.docs[0];
    await updateDoc(existingRating.ref, {
      rating: ratingData.rating,
    });
  }

  // Update resource average rating
  await updateResourceRating(ratingData.resourceId);
};

export const getUserRating = async (resourceId: string, userId: string): Promise<number | null> => {
  const q = query(
    collection(db, 'ratings'),
    where('resourceId', '==', resourceId),
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data().rating;
  }
  
  return null;
};

const updateResourceRating = async (resourceId: string) => {
  const q = query(collection(db, 'ratings'), where('resourceId', '==', resourceId));
  const ratingsSnapshot = await getDocs(q);
  
  let totalRating = 0;
  let count = 0;
  
  ratingsSnapshot.forEach((doc) => {
    totalRating += doc.data().rating;
    count++;
  });
  
  const averageRating = count > 0 ? totalRating / count : 0;
  
  const resourceRef = doc(db, 'resources', resourceId);
  await updateDoc(resourceRef, {
    averageRating,
    totalRatings: count,
  });
};

// Search and filter helpers
export const getSubjects = async (): Promise<string[]> => {
  const resourcesSnapshot = await getDocs(collection(db, 'resources'));
  const subjects = new Set<string>();
  
  resourcesSnapshot.forEach((doc) => {
    subjects.add(doc.data().subject);
  });
  
  return Array.from(subjects).sort();
};

export const getSemesters = async (): Promise<string[]> => {
  const resourcesSnapshot = await getDocs(collection(db, 'resources'));
  const semesters = new Set<string>();
  
  resourcesSnapshot.forEach((doc) => {
    semesters.add(doc.data().semester);
  });
  
  return Array.from(semesters).sort();
};

export const getAllTags = async (): Promise<string[]> => {
  const resourcesSnapshot = await getDocs(collection(db, 'resources'));
  const tags = new Set<string>();
  
  resourcesSnapshot.forEach((doc) => {
    const resourceTags = doc.data().tags || [];
    resourceTags.forEach((tag: string) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
};