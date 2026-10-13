export type Language = 'es' | 'he' | 'en';

export type RegistrationStatus = 'pending' | 'interview' | 'approved' | 'rejected' | 'waitlist';

export type ClassroomId = 'tinokiya' | 'paotot' | 'bogrim';

export type AdminRole = 'director' | 'teacher' | 'secretary';

export type SectionId =
  | 'home'
  | 'philosophy'
  | 'spaces'
  | 'multimedia'
  | 'teachers'
  | 'schedules'
  | 'nutrition'
  | 'enrollment'
  | 'faq'
  | 'admin';

export interface VideoClip {
  id: string;
  title: { es: string; he: string; en: string };
  category: { es: string; he: string; en: string };
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: { es: string; he: string; en: string };
  featured?: boolean;
}

export interface AttachedFile {
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface Registration {
  id: string;
  registrationNumber: string;
  createdAt: string;
  childFullName: string;
  childBirthDate: string;
  childGender: 'female' | 'male' | 'other';
  childIdNumber: string; // Teudat Zehut / Passport
  classroomId: ClassroomId;
  parentFullName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  parentCity: string;
  parentAddress: string;
  emergencyContact: string;
  emergencyContactRelation?: string;
  emergencyPhoneAlternative?: string;
  healthFund?: string; // Clalit, Maccabi, Meuhedet, Leumit
  allergies: string;
  medicalConditions: string;
  specialNeeds?: string;
  needsDiapers: boolean;
  scheduleType: 'regular' | 'extended'; // 16:30 or 17:00
  attendsFridays: boolean;
  desiredStartDate: string;
  notes?: string;
  status: RegistrationStatus;
  interviewDate?: string;
  adminNotes?: string;
  attachedFiles?: AttachedFile[];
}

export interface Teacher {
  id: string;
  name: {
    es: string;
    he: string;
    en: string;
  };
  role: {
    es: string;
    he: string;
    en: string;
  };
  certification: {
    es: string;
    he: string;
    en: string;
  };
  bio: {
    es: string;
    he: string;
    en: string;
  };
  experienceYears: number;
  avatarColor: string;
  initials: string;
  photoUrl: string;
  skills: string[];
  email: string;
  phone: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  childId: string;
  childName: string;
  classroomId: ClassroomId;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  notes?: string;
}

export interface DevelopmentNote {
  id: string;
  childId: string;
  childName: string;
  date: string;
  educatorName: string;
  area: 'social' | 'motor' | 'language' | 'emotional' | 'nature';
  title: string;
  content: string;
  tags?: string[];
}

export interface Classroom {
  id: ClassroomId;
  name: {
    es: string;
    he: string;
    en: string;
  };
  ageRange: {
    es: string;
    he: string;
    en: string;
  };
  ratio: string;
  maxCapacity: number;
  currentEnrolled: number;
  description: {
    es: string;
    he: string;
    en: string;
  };
  color: string;
}

export interface ScheduleItem {
  time: string;
  title: {
    es: string;
    he: string;
    en: string;
  };
  description: {
    es: string;
    he: string;
    en: string;
  };
  iconName: string;
}
