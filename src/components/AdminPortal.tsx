import React, { useState } from 'react';
import {
  Language,
  Registration,
  RegistrationStatus,
  ClassroomId,
  AdminRole,
  Teacher,
  AttendanceRecord,
  DevelopmentNote,
} from '../types';
import { translations } from '../i18n/translations';
import { mockClassrooms } from '../data/mockData';
import {
  Shield,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertTriangle,
  XCircle,
  FileText,
  X,
  Lock,
  Unlock,
  Building,
  Save,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Edit,
  ClipboardList,
  GraduationCap,
  Heart,
  UserPlus,
  FileCheck,
  Check,
  AlertCircle,
  Eye,
  MapPin,
} from 'lucide-react';

interface AdminPortalProps {
  currentLang: Language;
  registrations: Registration[];
  teachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
  developmentNotes: DevelopmentNote[];
  onUpdateRegistration: (updated: Registration) => void;
  onDeleteRegistration: (id: string) => void;
  onAddManualRegistration: (newReg: Registration) => void;
  onUpdateTeacher: (updated: Teacher) => void;
  onAddTeacher: (newTeacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  onAddDevelopmentNote: (note: DevelopmentNote) => void;
  onCloseAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentLang,
  registrations,
  teachers,
  attendanceRecords,
  developmentNotes,
  onUpdateRegistration,
  onDeleteRegistration,
  onAddManualRegistration,
  onUpdateTeacher,
  onAddTeacher,
  onDeleteTeacher,
  onUpdateAttendance,
  onAddDevelopmentNote,
  onCloseAdmin,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  // Auth & Role
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole>('director');

  // Navigation Tab inside Admin ERP
  const [activeTab, setActiveTab] = useState<'registrations' | 'attendance' | 'evaluations' | 'teachers' | 'capacity'>('registrations');

  // Registrations state & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classroomFilter, setClassroomFilter] = useState<string>('all');

  // Modals for Registrations
  const [dossierReg, setDossierReg] = useState<Registration | null>(null);
  const [editReg, setEditReg] = useState<Registration | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Manual Registration Modal
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualChildName, setManualChildName] = useState('');
  const [manualParentName, setManualParentName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [manualClassroom, setManualClassroom] = useState<ClassroomId>('paotot');

  // Teacher Modal state (Add / Edit)
  const [teacherModalMode, setTeacherModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherFormName, setTeacherFormName] = useState('');
  const [teacherFormRole, setTeacherFormRole] = useState('');
  const [teacherFormCert, setTeacherFormCert] = useState('');
  const [teacherFormBio, setTeacherFormBio] = useState('');
  const [teacherFormExp, setTeacherFormExp] = useState(5);
  const [teacherFormEmail, setTeacherFormEmail] = useState('');
  const [teacherFormPhoto, setTeacherFormPhoto] = useState('');
  const [teacherFormSkills, setTeacherFormSkills] = useState('');

  // Attendance state
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState('2026-10-13');
  const [localAttendance, setLocalAttendance] = useState<AttendanceRecord[]>(attendanceRecords);

  // Development Note Modal state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteChildId, setNoteChildId] = useState(registrations[0]?.id || '');
  const [noteArea, setNoteArea] = useState<'social' | 'motor' | 'language' | 'emotional' | 'nature'>('nature');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteEducator, setNoteEducator] = useState('Noa Shapira');

  // Role permissions helpers
  const canDelete = currentRole === 'director';
  const canManageStaff = currentRole === 'director';
  const canEditEnrollment = currentRole === 'director' || currentRole === 'secretary';
  const canManageAcademics = currentRole === 'director' || currentRole === 'teacher';

  // Filtered registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.childFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.parentFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.parentPhone.includes(searchQuery) ||
      (reg.childIdNumber && reg.childIdNumber.includes(searchQuery));

    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesClass = classroomFilter === 'all' || reg.classroomId === classroomFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  // KPI Calculations
  const totalCount = registrations.length;
  const pendingCount = registrations.filter((r) => r.status === 'pending').length;
  const interviewCount = registrations.filter((r) => r.status === 'interview').length;
  const approvedCount = registrations.filter((r) => r.status === 'approved').length;
  const waitlistCount = registrations.filter((r) => r.status === 'waitlist').length;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Status badge styling
  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.admin.statusApproved}</span>
          </span>
        );
      case 'interview':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.admin.statusInterview}</span>
          </span>
        );
      case 'waitlist':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.admin.statusWaitlist}</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700">
            <XCircle className="w-3.5 h-3.5 text-stone-500" />
            <span>{t.admin.statusRejected}</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-100 text-purple-800">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.admin.statusPending}</span>
          </span>
        );
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      'ID_Registro',
      'Codigo_Matricula',
      'Fecha_Creacion',
      'Nombre_Nino',
      'Fecha_Nacimiento',
      'Teudat_Zehut',
      'Sala',
      'Nombre_Padre',
      'Telefono',
      'Email',
      'Direccion',
      'Ciudad',
      'Contacto_Emergencia',
      'Kupat_Jolim',
      'Alergias',
      'Necesidades_Especiales',
      'Estado',
      'Fecha_Entrevista',
      'Notas_Direccion',
    ];

    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.registrationNumber}"`,
      `"${r.createdAt}"`,
      `"${r.childFullName}"`,
      `"${r.childBirthDate}"`,
      `"${r.childIdNumber}"`,
      `"${r.classroomId}"`,
      `"${r.parentFullName}"`,
      `"${r.parentPhone}"`,
      `"${r.parentEmail}"`,
      `"${r.parentAddress || ''}"`,
      `"${r.parentCity}"`,
      `"${r.emergencyContact || ''}"`,
      `"${r.healthFund || ''}"`,
      `"${r.allergies}"`,
      `"${r.specialNeeds || ''}"`,
      `"${r.status}"`,
      `"${r.interviewDate || ''}"`,
      `"${(r.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gan_Alon_Matriculas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Attendance Toggle
  const handleSetAttendanceStatus = (childId: string, childName: string, classroomId: ClassroomId, status: 'present' | 'absent' | 'late' | 'excused') => {
    const existingIndex = localAttendance.findIndex((a) => a.childId === childId && a.date === selectedAttendanceDate);
    let updatedList = [...localAttendance];

    if (existingIndex >= 0) {
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        status,
        arrivalTime: status === 'present' ? '08:00' : status === 'late' ? '08:45' : undefined,
      };
    } else {
      updatedList.push({
        id: `att-${Date.now()}-${childId}`,
        date: selectedAttendanceDate,
        childId,
        childName,
        classroomId,
        status,
        arrivalTime: status === 'present' ? '08:00' : status === 'late' ? '08:45' : undefined,
      });
    }

    setLocalAttendance(updatedList);
    onUpdateAttendance(updatedList);
  };

  // Open Edit Registration
  const handleOpenEditReg = (reg: Registration) => {
    setEditReg({ ...reg });
  };

  const handleSaveEditReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editReg) return;
    onUpdateRegistration(editReg);
    setEditReg(null);
  };

  // Confirm Delete Registration
  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      onDeleteRegistration(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Teachers Management Handlers
  const handleOpenAddTeacher = () => {
    setTeacherFormName('');
    setTeacherFormRole('');
    setTeacherFormCert('');
    setTeacherFormBio('');
    setTeacherFormExp(6);
    setTeacherFormEmail('docente@ganalon-israel.org');
    setTeacherFormPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80');
    setTeacherFormSkills('Educación Infantil, Naturaleza, Primeros Auxilios');
    setEditingTeacher(null);
    setTeacherModalMode('create');
  };

  const handleOpenEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherFormName(teacher.name.es);
    setTeacherFormRole(teacher.role.es);
    setTeacherFormCert(teacher.certification.es);
    setTeacherFormBio(teacher.bio.es);
    setTeacherFormExp(teacher.experienceYears);
    setTeacherFormEmail(teacher.email);
    setTeacherFormPhoto(teacher.photoUrl);
    setTeacherFormSkills(teacher.skills.join(', '));
    setTeacherModalMode('edit');
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherFormName.trim()) return;

    const skillsArray = teacherFormSkills.split(',').map((s) => s.trim()).filter(Boolean);

    if (teacherModalMode === 'create') {
      const newTeacher: Teacher = {
        id: `t-${Date.now()}`,
        name: { es: teacherFormName, he: teacherFormName, en: teacherFormName },
        role: { es: teacherFormRole, he: teacherFormRole, en: teacherFormRole },
        certification: { es: teacherFormCert, he: teacherFormCert, en: teacherFormCert },
        bio: { es: teacherFormBio, he: teacherFormBio, en: teacherFormBio },
        experienceYears: Number(teacherFormExp),
        avatarColor: 'bg-emerald-700',
        initials: teacherFormName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'ED',
        photoUrl: teacherFormPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        skills: skillsArray.length > 0 ? skillsArray : ['Educación Temprana'],
        email: teacherFormEmail,
        phone: '054-0000000',
        isActive: true,
      };
      onAddTeacher(newTeacher);
    } else if (editingTeacher) {
      const updated: Teacher = {
        ...editingTeacher,
        name: { ...editingTeacher.name, es: teacherFormName, en: teacherFormName },
        role: { ...editingTeacher.role, es: teacherFormRole, en: teacherFormRole },
        certification: { ...editingTeacher.certification, es: teacherFormCert, en: teacherFormCert },
        bio: { ...editingTeacher.bio, es: teacherFormBio, en: teacherFormBio },
        experienceYears: Number(teacherFormExp),
        email: teacherFormEmail,
        photoUrl: teacherFormPhoto,
        skills: skillsArray,
      };
      onUpdateTeacher(updated);
    }
    setTeacherModalMode(null);
  };

  // Add Development Note
  const handleSaveDevelopmentNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const targetChild = registrations.find((r) => r.id === noteChildId);
    const newNote: DevelopmentNote = {
      id: `dev-${Date.now()}`,
      childId: noteChildId,
      childName: targetChild ? targetChild.childFullName : 'Alumno/a',
      date: new Date().toISOString().split('T')[0],
      educatorName: noteEducator,
      area: noteArea,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: [noteArea, 'Observación'],
    };

    onAddDevelopmentNote(newNote);
    setIsNoteModalOpen(false);
    setNoteTitle('');
    setNoteContent('');
  };

  // Authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-stone-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-stone-900">{t.admin.title}</h2>
            <p className="text-xs text-stone-500">
              {isRTL
                ? 'גישה מוגנת לצוות הנהלת גן אלון. קוד כניסה: 2026'
                : 'Acceso administrativo protegido para Gan Alon. PIN demo: 2026'}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN (2026)"
              className="w-full text-center tracking-widest text-lg font-mono py-3 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {pinError && (
              <p className="text-xs text-red-600 font-medium">
                {isRTL ? 'קוד שגוי, נסו 2026' : 'PIN incorrecto, utilice 2026'}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 text-white font-bold rounded-xl text-sm hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              {isRTL ? 'כניסה למערכת' : 'Ingresar al Portal'}
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={() => setIsAuthenticated(true)}
              className="text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer"
            >
              {isRTL ? 'כניסה מהירה כמנהלת (דמו)' : 'Acceso Rápido Directora (Demo)'}
            </button>
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              {t.admin.exitAdmin}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Top Header with Role Switcher */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Shield className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                  {t.admin.title}
                </h1>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  ERP v2.4
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-none mt-0.5">
                Gan Alon · {isRTL ? 'ניהול חינוכי, רישום וצוות' : 'Sistema Integral de Gestión y Control'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Role Switcher */}
            <div className="hidden md:flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs border border-stone-200">
              <span className="text-stone-500 px-2 font-medium">{isRTL ? 'תפקיד:' : 'Rol:'}</span>
              <button
                onClick={() => setCurrentRole('director')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  currentRole === 'director' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isRTL ? 'מנהלת כללית' : 'Directora'}
              </button>
              <button
                onClick={() => setCurrentRole('teacher')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  currentRole === 'teacher' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isRTL ? 'גננת מובילה' : 'Docente'}
              </button>
              <button
                onClick={() => setCurrentRole('secretary')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  currentRole === 'secretary' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isRTL ? 'מזכירות' : 'Secretaría'}
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>{t.admin.exportCsv}</span>
            </button>

            <button
              onClick={onCloseAdmin}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{t.admin.exitAdmin}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Module Tabs Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'registrations'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>{isRTL ? 'ניהול הרשמות' : 'Inscripciones & Alumnos'}</span>
            <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px] tabular-nums">
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'attendance'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isRTL ? 'נוכחות יומית' : 'Asistencia Diaria'}</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluations')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'evaluations'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{isRTL ? 'הערכות התפתחות' : 'Notas de Desarrollo'}</span>
            <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px] tabular-nums">
              {developmentNotes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'teachers'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{isRTL ? 'ניהול צוות גננות' : 'Perfiles Docentes'}</span>
            <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px] tabular-nums">
              {teachers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('capacity')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'capacity'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>{isRTL ? 'תפוסת קבוצות' : 'Aforo de Salas'}</span>
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Role Notice */}
        <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isRTL
                ? `מחובר בתפקיד: ${currentRole === 'director' ? 'מנהלת כללית (הרשאות מלאות)' : currentRole === 'teacher' ? 'גננת (נוכחות והערכות)' : 'מזכירות (ניהול פניות)'}`
                : `Sesión iniciada con rol: ${currentRole === 'director' ? 'Directora (Permisos Totales: Ver, Editar, Eliminar, Docentes)' : currentRole === 'teacher' ? 'Docente (Asistencia Diaria y Notas Pedagógicas)' : 'Secretaría (Recepción, Entrevistas y Exportación)'}`}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-700">
            {canDelete ? (isRTL ? 'הרשאת מחיקה פעילה' : 'Eliminación Habilitada') : (isRTL ? 'מחיקה חסומה' : 'Eliminación Restringida a Dirección')}
          </div>
        </div>

        {/* ================= TAB 1: REGISTRATIONS MANAGEMENT ================= */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
                <div className="text-xs font-semibold text-stone-500 uppercase">{t.admin.kpiTotal}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums mt-1">{totalCount}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
                <div className="text-xs font-semibold text-purple-700 uppercase">{t.admin.kpiPending}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-800 tabular-nums mt-1">{pendingCount}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
                <div className="text-xs font-semibold text-blue-700 uppercase">{t.admin.kpiInterview}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-800 tabular-nums mt-1">{interviewCount}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
                <div className="text-xs font-semibold text-emerald-700 uppercase">{t.admin.kpiApproved}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mt-1">{approvedCount}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-xs font-semibold text-amber-700 uppercase">{t.admin.kpiWaitlist}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 tabular-nums mt-1">{waitlistCount}</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.admin.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={classroomFilter}
                  onChange={(e) => setClassroomFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="all">{t.admin.filterAllClassrooms}</option>
                  <option value="tinokiya">Tinokiyá (Bebés)</option>
                  <option value="paotot">Paotot (Párvulos)</option>
                  <option value="bogrim">Bogrim (Mayores)</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="all">{t.admin.filterAllStatuses}</option>
                  <option value="pending">{t.admin.statusPending}</option>
                  <option value="interview">{t.admin.statusInterview}</option>
                  <option value="approved">{t.admin.statusApproved}</option>
                  <option value="waitlist">{t.admin.statusWaitlist}</option>
                  <option value="rejected">{t.admin.statusRejected}</option>
                </select>

                {canEditEnrollment && (
                  <button
                    onClick={() => setIsManualModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.addManualRegistration}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4">{t.admin.colCode}</th>
                      <th className="py-3.5 px-4">{t.admin.colChild}</th>
                      <th className="py-3.5 px-4">{t.admin.colAgeClass}</th>
                      <th className="py-3.5 px-4">{t.admin.colParent}</th>
                      <th className="py-3.5 px-4">{t.admin.colHealth}</th>
                      <th className="py-3.5 px-4">{t.admin.colStatus}</th>
                      <th className="py-3.5 px-4 text-right">{t.admin.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-500 text-sm">
                          {t.admin.noResults}
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-amber-50/30 transition-colors">
                          {/* Code */}
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-800 whitespace-nowrap">
                            {reg.registrationNumber}
                          </td>

                          {/* Child */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-stone-900">{reg.childFullName}</div>
                            <div className="text-[11px] text-stone-500">
                              {reg.childBirthDate} · {reg.childGender} · ID: {reg.childIdNumber}
                            </div>
                          </td>

                          {/* Classroom */}
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-stone-800 capitalize">{reg.classroomId}</span>
                            <div className="text-[11px] text-stone-500">
                              {reg.scheduleType === 'extended' ? '17:00' : '16:30'} · {reg.attendsFridays ? 'Vie Sí' : 'Vie No'}
                            </div>
                          </td>

                          {/* Parent Contact */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-stone-900">{reg.parentFullName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`tel:${reg.parentPhone}`}
                                className="text-stone-600 hover:text-emerald-700 font-mono text-xs flex items-center gap-1"
                                title="Llamar"
                              >
                                <Phone className="w-3 h-3 text-emerald-700" />
                                <span>{reg.parentPhone}</span>
                              </a>
                              <a
                                href={`https://wa.me/${reg.parentPhone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-600 hover:text-emerald-800"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          {/* Health / Allergies */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                reg.allergies.toLowerCase() !== 'ninguna' && reg.allergies.toLowerCase() !== 'אין'
                                  ? 'bg-amber-100 text-amber-900 font-semibold'
                                  : 'text-stone-500'
                              }`}
                            >
                              {reg.allergies}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {getStatusBadge(reg.status)}
                          </td>

                          {/* Actions: View, Edit, Delete */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Dossier */}
                              <button
                                onClick={() => setDossierReg(reg)}
                                className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                                title="Ver Ficha y Documentos"
                              >
                                <Eye className="w-4 h-4 text-stone-700" />
                              </button>

                              {/* Edit Registration */}
                              {canEditEnrollment && (
                                <button
                                  onClick={() => handleOpenEditReg(reg)}
                                  className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                                  title="Editar Registro"
                                >
                                  <Edit className="w-4 h-4 text-blue-700" />
                                </button>
                              )}

                              {/* Delete Registration (Director Only) */}
                              {canDelete && (
                                <button
                                  onClick={() => setDeleteConfirmId(reg.id)}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                                  title="Eliminar Registro"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: DAILY ATTENDANCE ================= */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-700" />
                  <span>{isRTL ? 'יומן נוכחות יומי של ילדי הגן' : 'Control de Asistencia Diaria de Estudiantes'}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {isRTL ? 'רישום בזמן אמת של נוכחות, איחורים וחיסורים לכל קבוצה' : 'Registro de asistencia, ausencias y justificaciones por sala'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-stone-700">{isRTL ? 'תאריך:' : 'Fecha:'}</label>
                <input
                  type="date"
                  value={selectedAttendanceDate}
                  onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                />
              </div>
            </div>

            {/* Attendance Cards by Classroom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockClassrooms.map((cls) => {
                const studentsInClass = registrations.filter((r) => r.classroomId === cls.id);

                return (
                  <div key={cls.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                    <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{cls.name[currentLang]}</h4>
                        <span className="text-[11px] text-stone-500">{studentsInClass.length} {isRTL ? 'ילדים ברשימה' : 'alumnos registrados'}</span>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {cls.ageRange[currentLang]}
                      </span>
                    </div>

                    <div className="p-4 divide-y divide-stone-100 flex-1 space-y-3">
                      {studentsInClass.length === 0 ? (
                        <div className="py-6 text-center text-xs text-stone-400">
                          {isRTL ? 'אין ילדים בקבוצה זו' : 'Sin alumnos asignados'}
                        </div>
                      ) : (
                        studentsInClass.map((student) => {
                          const record = localAttendance.find(
                            (a) => a.childId === student.id && a.date === selectedAttendanceDate
                          );
                          const currentStatus = record?.status || 'present';

                          return (
                            <div key={student.id} className="pt-2 first:pt-0 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-stone-800">{student.childFullName}</span>
                                <span className="text-[10px] text-stone-400 font-mono">{student.childBirthDate}</span>
                              </div>

                              {/* Attendance Buttons */}
                              <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
                                <button
                                  onClick={() => handleSetAttendanceStatus(student.id, student.childFullName, cls.id, 'present')}
                                  className={`py-1 rounded-md transition-all cursor-pointer ${
                                    currentStatus === 'present'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {isRTL ? 'נוכח' : 'Presente'}
                                </button>
                                <button
                                  onClick={() => handleSetAttendanceStatus(student.id, student.childFullName, cls.id, 'late')}
                                  className={`py-1 rounded-md transition-all cursor-pointer ${
                                    currentStatus === 'late'
                                      ? 'bg-amber-500 text-white shadow-xs'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {isRTL ? 'איחור' : 'Tarde'}
                                </button>
                                <button
                                  onClick={() => handleSetAttendanceStatus(student.id, student.childFullName, cls.id, 'excused')}
                                  className={`py-1 rounded-md transition-all cursor-pointer ${
                                    currentStatus === 'excused'
                                      ? 'bg-blue-600 text-white shadow-xs'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {isRTL ? 'מוצדק' : 'Justif.'}
                                </button>
                                <button
                                  onClick={() => handleSetAttendanceStatus(student.id, student.childFullName, cls.id, 'absent')}
                                  className={`py-1 rounded-md transition-all cursor-pointer ${
                                    currentStatus === 'absent'
                                      ? 'bg-red-600 text-white shadow-xs'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {isRTL ? 'נעדר' : 'Ausente'}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DEVELOPMENT EVALUATION NOTES ================= */}
        {activeTab === 'evaluations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700" />
                  <span>{isRTL ? 'הערכות התפתחות ותיעוד פדגוגי' : 'Notas y Observaciones del Desarrollo Infantil'}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {isRTL ? 'מעקב אישי אחר מוטוריקה, שפה, השתלבות חברתית וחקר הטבע' : 'Seguimiento cualitativo de psicomotricidad, huerto, lenguaje y autonomía'}
                </p>
              </div>

              {canManageAcademics && (
                <button
                  onClick={() => setIsNoteModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isRTL ? 'הוספת הערכה חדשה' : '+ Nueva Nota Pedagógica'}</span>
                </button>
              )}
            </div>

            {/* Development Notes Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {developmentNotes.map((note) => (
                <div key={note.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-500 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md uppercase">
                        {note.area}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">{note.date}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 text-base">{note.childName}</h4>
                      <h5 className="text-xs font-semibold text-stone-700 mt-0.5">{note.title}</h5>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-200/50">
                      "{note.content}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{note.educatorName}</span>
                    </span>
                    <div className="flex gap-1">
                      {note.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: TEACHERS MANAGEMENT ================= */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-700" />
                  <span>{isRTL ? 'ניהול פרופילי צוות הגננות והסייעות' : 'Administración de Perfiles Docentes'}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {isRTL ? 'הוספה, עריכה ועדכון פרטים, תמונות והסמכות של צוות הגן' : 'Añadir, editar o remover educadoras y directivas con sincronización en tiempo real'}
                </p>
              </div>

              {canManageStaff && (
                <button
                  onClick={handleOpenAddTeacher}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isRTL ? 'הוספת גננת / סייעת חדשה' : '+ Nueva Educadora'}</span>
                </button>
              )}
            </div>

            {/* Teachers Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                  <div className="relative aspect-4/3 w-full bg-stone-100">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name.es}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 bg-stone-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {teacher.experienceYears} {isRTL ? 'שנים' : 'años'}
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base">{teacher.name.es}</h4>
                      <p className="text-xs font-semibold text-emerald-700">{teacher.role.es}</p>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">{teacher.bio.es}</p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400 font-mono text-[11px] truncate max-w-[120px]">
                        {teacher.email}
                      </span>
                      {canManageStaff && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleOpenEditTeacher(teacher)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                            title="Editar Perfil"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTeacher(teacher.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                            title="Eliminar Docente"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CLASSROOM CAPACITY ================= */}
        {activeTab === 'capacity' && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-700" />
                <span>{t.admin.capacityOverview}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {isRTL ? 'מעקב מכסות לפי חוק הפיקוח של משרד החינוך' : 'Supervisión de aforo según normativa oficial del Ministerio de Educación de Israel'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockClassrooms.map((cls) => {
                const enrolledInThisClass = registrations.filter(
                  (r) => r.classroomId === cls.id && r.status === 'approved'
                ).length;
                const totalDisplayEnrolled = cls.currentEnrolled + enrolledInThisClass;
                const percent = Math.min(100, Math.round((totalDisplayEnrolled / cls.maxCapacity) * 100));

                return (
                  <div key={cls.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-stone-900 text-base">{cls.name[currentLang]}</h4>
                        <span className="text-xs text-stone-500">{cls.ageRange[currentLang]}</span>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        Ratio {cls.ratio}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-stone-600">{isRTL ? 'תפוסה נוכחית:' : 'Ocupación:'}</span>
                        <span className="font-bold tabular-nums text-stone-900">
                          {totalDisplayEnrolled} / {cls.maxCapacity} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            percent >= 100 ? 'bg-red-500' : percent >= 85 ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-stone-600 flex justify-between border-t border-stone-200">
                      <span>{isRTL ? 'מקומות פנויים:' : 'Cupos libres:'}</span>
                      <span className="font-bold text-emerald-800 tabular-nums">
                        {Math.max(0, cls.maxCapacity - totalDisplayEnrolled)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: VIEW DOSSIER (FICHA COMPLETA Y DOCUMENTOS) ================= */}
      {dossierReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDossierReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    {dossierReg.registrationNumber}
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                    {dossierReg.childFullName}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isRTL ? 'תאריך פנייה:' : 'Fecha de solicitud:'} {dossierReg.createdAt} · {dossierReg.parentCity}
                  </p>
                </div>
                <div>{getStatusBadge(dossierReg.status)}</div>
              </div>

              {/* Grid of info details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'תאריך לידה' : 'Nacimiento'}</span>
                  <span className="font-bold text-stone-900">{dossierReg.childBirthDate}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'קבוצה מבוקשת' : 'Sala'}</span>
                  <span className="font-bold text-stone-900 capitalize">{dossierReg.classroomId}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'תעודת זהות' : 'Teudat Zehut'}</span>
                  <span className="font-mono font-bold text-stone-900">{dossierReg.childIdNumber}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'חיתולים' : 'Pañales'}</span>
                  <span className="font-bold text-stone-900">{dossierReg.needsDiapers ? 'Sí' : 'No'}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'קופת חולים' : 'Kupat Jolim'}</span>
                  <span className="font-bold text-stone-900">{dossierReg.healthFund || 'Clalit'}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl">
                  <span className="text-stone-500 block">{isRTL ? 'שעות פעילות' : 'Turno'}</span>
                  <span className="font-bold text-stone-900">{dossierReg.scheduleType}</span>
                </div>
              </div>

              {/* Health & Special Needs */}
              <div className="bg-red-50/50 border border-red-200/80 p-4 rounded-xl text-xs space-y-1">
                <div className="font-bold text-red-900">{isRTL ? 'אלרגיות וצרכים מיוחדים:' : 'Alergias y Necesidades Especiales:'}</div>
                <div><span className="text-stone-600">Alergias:</span> <span className="font-bold text-stone-800">{dossierReg.allergies}</span></div>
                {dossierReg.specialNeeds && (
                  <div><span className="text-stone-600">Necesidades:</span> <span className="font-bold text-stone-800">{dossierReg.specialNeeds}</span></div>
                )}
              </div>

              {/* Family Contacts & Address */}
              <div className="border border-stone-200 rounded-xl p-4 bg-amber-50/30 space-y-2 text-xs">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>{isRTL ? 'פרטי ההורים וכתובת:' : 'Contacto Familiar y Dirección:'}</span>
                  <span className="text-stone-500 font-normal">{dossierReg.parentRelationship}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <span className="font-medium text-stone-900">{dossierReg.parentFullName}</span>
                  <a href={`tel:${dossierReg.parentPhone}`} className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{dossierReg.parentPhone}</span>
                  </a>
                  <a href={`mailto:${dossierReg.parentEmail}`} className="inline-flex items-center gap-1 text-stone-600 hover:underline">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{dossierReg.parentEmail}</span>
                  </a>
                </div>
                <div className="text-stone-600 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{dossierReg.parentAddress || 'Dirección no provista'}, {dossierReg.parentCity}</span>
                </div>
                <div className="text-stone-700 pt-1 border-t border-stone-200">
                  <span className="font-bold">{isRTL ? 'איש קשר לשעת חירום:' : 'Emergencia:'}</span> {dossierReg.emergencyContact} ({dossierReg.emergencyPhoneAlternative || dossierReg.parentPhone})
                </div>
              </div>

              {/* Attached Files Section */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>{isRTL ? 'מסמכים שצורפו ע״י ההורים:' : 'Documentos Adjuntos por los Padres:'}</span>
                </div>
                {dossierReg.attachedFiles && dossierReg.attachedFiles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dossierReg.attachedFiles.map((f, fIdx) => (
                      <div key={fIdx} className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
                        <div className="truncate">
                          <span className="font-bold text-stone-800 block truncate">{f.name}</span>
                          <span className="text-[10px] text-stone-500">{f.size} · {f.uploadedAt}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Verificado
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-stone-400 italic bg-stone-50 p-3 rounded-xl border border-stone-200">
                    {isRTL ? 'לא צורפו קבצים בבקשה זו' : 'No se adjuntaron documentos adicionales'}
                  </div>
                )}
              </div>

              {/* Admin Notes */}
              {dossierReg.adminNotes && (
                <div className="p-3 bg-stone-100 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-stone-800">{t.admin.adminNotesLabel}:</span>
                  <p className="text-stone-600">{dossierReg.adminNotes}</p>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setDossierReg(null)}
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'סגירה' : 'Cerrar Ficha'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT REGISTRATION ================= */}
      {editReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-4">
              {isRTL ? 'עריכת פרטי רישום תלמיד' : 'Editar Registro de Inscripción'}
            </h3>

            <form onSubmit={handleSaveEditReg} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.childName}</label>
                  <input
                    type="text"
                    required
                    value={editReg.childFullName}
                    onChange={(e) => setEditReg({ ...editReg, childFullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.birthDate}</label>
                  <input
                    type="date"
                    required
                    value={editReg.childBirthDate}
                    onChange={(e) => setEditReg({ ...editReg, childBirthDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.classroomSelect}</label>
                  <select
                    value={editReg.classroomId}
                    onChange={(e) => setEditReg({ ...editReg, classroomId: e.target.value as ClassroomId })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="tinokiya">Tinokiyá (Bebés)</option>
                    <option value="paotot">Paotot (Párvulos)</option>
                    <option value="bogrim">Bogrim (Mayores)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.admin.changeStatus}</label>
                  <select
                    value={editReg.status}
                    onChange={(e) => setEditReg({ ...editReg, status: e.target.value as RegistrationStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-bold text-emerald-800"
                  >
                    <option value="pending">{t.admin.statusPending}</option>
                    <option value="interview">{t.admin.statusInterview}</option>
                    <option value="approved">{t.admin.statusApproved}</option>
                    <option value="waitlist">{t.admin.statusWaitlist}</option>
                    <option value="rejected">{t.admin.statusRejected}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.parentName}</label>
                  <input
                    type="text"
                    required
                    value={editReg.parentFullName}
                    onChange={(e) => setEditReg({ ...editReg, parentFullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.phone}</label>
                  <input
                    type="tel"
                    required
                    value={editReg.parentPhone}
                    onChange={(e) => setEditReg({ ...editReg, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Dirección y Ciudad</label>
                <input
                  type="text"
                  value={editReg.parentAddress}
                  onChange={(e) => setEditReg({ ...editReg, parentAddress: e.target.value })}
                  placeholder="Dirección completa"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Alergias</label>
                  <input
                    type="text"
                    value={editReg.allergies}
                    onChange={(e) => setEditReg({ ...editReg, allergies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Fecha de Entrevista / Visita</label>
                  <input
                    type="datetime-local"
                    value={editReg.interviewDate || ''}
                    onChange={(e) => setEditReg({ ...editReg, interviewDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.admin.adminNotesLabel}</label>
                <textarea
                  rows={2}
                  value={editReg.adminNotes || ''}
                  onChange={(e) => setEditReg({ ...editReg, adminNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditReg(null)}
                  className="px-4 py-2 text-stone-600 font-semibold hover:text-stone-900 cursor-pointer"
                >
                  {isRTL ? 'ביטול' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'שמירת שינויים' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CONFIRM DELETE REGISTRATION ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-stone-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              {isRTL ? 'האם למחוק את הרישום?' : '¿Confirmar eliminación?'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isRTL
                ? 'פעולה זו תמחק לצמיתות את תיק התלמיד ממערכת הניהול. לא ניתן לשחזר לאחר מכן.'
                : 'Esta acción eliminará permanentemente la inscripción y el expediente del alumno de la base de datos.'}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer"
              >
                {isRTL ? 'ביטול' : 'Cancelar'}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                {isRTL ? 'כן, למחוק' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: TEACHER CREATE / EDIT ================= */}
      {teacherModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setTeacherModalMode(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-4">
              {teacherModalMode === 'create'
                ? isRTL ? 'הוספת גננת / סייעת חדשה' : 'Añadir Nueva Educadora'
                : isRTL ? 'עריכת פרופיל גננת' : 'Editar Perfil Docente'}
            </h3>

            <form onSubmit={handleSaveTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={teacherFormName}
                  onChange={(e) => setTeacherFormName(e.target.value)}
                  placeholder="Ej: Noa Shapira"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Rol / Cargo *</label>
                <input
                  type="text"
                  required
                  value={teacherFormRole}
                  onChange={(e) => setTeacherFormRole(e.target.value)}
                  placeholder="Ej: Maestra de Preescolar - Sala Bogrim"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Certificación & Titulación Oficial</label>
                <input
                  type="text"
                  value={teacherFormCert}
                  onChange={(e) => setTeacherFormCert(e.target.value)}
                  placeholder="Ej: B.Ed. Educación Infantil (Kibbutzim College)"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Breve Biografía y Pasión Pedagógica *</label>
                <textarea
                  rows={3}
                  required
                  value={teacherFormBio}
                  onChange={(e) => setTeacherFormBio(e.target.value)}
                  placeholder="Detalla su experiencia con los niños, enfoque en la naturaleza o apego emocional..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Años de Experiencia</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={teacherFormExp}
                    onChange={(e) => setTeacherFormExp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Profesional</label>
                  <input
                    type="email"
                    value={teacherFormEmail}
                    onChange={(e) => setTeacherFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">URL de Foto Profesional</label>
                <input
                  type="url"
                  value={teacherFormPhoto}
                  onChange={(e) => setTeacherFormPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Especialidades (separadas por comas)</label>
                <input
                  type="text"
                  value={teacherFormSkills}
                  onChange={(e) => setTeacherFormSkills(e.target.value)}
                  placeholder="Botánica, Psicomotricidad, Primeros Auxilios"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setTeacherModalMode(null)}
                  className="px-4 py-2 text-stone-600 font-semibold cursor-pointer"
                >
                  {isRTL ? 'ביטול' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'שמירה' : 'Guardar Docente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD DEVELOPMENT NOTE ================= */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setIsNoteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-4">
              {isRTL ? 'הוספת הערכת התפתחות פדגוגית' : 'Nueva Observación Pedagógica'}
            </h3>

            <form onSubmit={handleSaveDevelopmentNote} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Alumno/a *</label>
                <select
                  value={noteChildId}
                  onChange={(e) => setNoteChildId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                >
                  {registrations.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.childFullName} ({r.classroomId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Área de Desarrollo</label>
                  <select
                    value={noteArea}
                    onChange={(e) => setNoteArea(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white uppercase font-bold text-emerald-800"
                  >
                    <option value="nature">Naturaleza & Huerto</option>
                    <option value="motor">Psicomotricidad</option>
                    <option value="social">Socialización</option>
                    <option value="language">Lenguaje</option>
                    <option value="emotional">Emocional</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Docente Evaluadora</label>
                  <select
                    value={noteEducator}
                    onChange={(e) => setNoteEducator(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.name.es}>
                        {t.name.es}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Título de la Observación *</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Ej: Avance notable en equilibrio y confianza"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Contenido de la Observación *</label>
                <textarea
                  rows={3}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Describe qué ocurrió, logros evidenciados y sugerencias de acompañamiento..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold cursor-pointer"
                >
                  {isRTL ? 'ביטול' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'שמירה' : 'Guardar Observación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANUAL ENTRY FOR REGISTRATION ================= */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-4">
              {t.admin.addManualRegistration}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!manualChildName || !manualParentName || !manualPhone) return;
                const newReg: Registration = {
                  id: `reg-${Date.now()}`,
                  registrationNumber: `GAN-2026-${Math.floor(500 + Math.random() * 400)}`,
                  createdAt: new Date().toISOString().split('T')[0],
                  childFullName: manualChildName.trim(),
                  childBirthDate: '2024-01-01',
                  childGender: 'female',
                  childIdNumber: '330000000',
                  classroomId: manualClassroom,
                  parentFullName: manualParentName.trim(),
                  parentRelationship: 'Padre/Madre',
                  parentPhone: manualPhone.trim(),
                  parentEmail: 'contacto@familia.co.il',
                  parentCity: 'Kfar Saba',
                  parentAddress: manualAddress.trim() || 'Kfar Saba',
                  emergencyContact: manualParentName.trim(),
                  emergencyPhoneAlternative: manualPhone.trim(),
                  healthFund: 'Clalit',
                  allergies: 'Ninguna',
                  medicalConditions: 'Ninguna',
                  needsDiapers: true,
                  scheduleType: 'regular',
                  attendsFridays: true,
                  desiredStartDate: '2026-09-01',
                  notes: 'Ingreso manual por secretaría.',
                  status: 'pending',
                };
                onAddManualRegistration(newReg);
                setIsManualModalOpen(false);
                setManualChildName('');
                setManualParentName('');
                setManualPhone('');
                setManualAddress('');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.childName} *</label>
                <input
                  type="text"
                  required
                  value={manualChildName}
                  onChange={(e) => setManualChildName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.parentName} *</label>
                <input
                  type="text"
                  required
                  value={manualParentName}
                  onChange={(e) => setManualParentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.phone} *</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="054-0000000"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Calle y número"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{t.enrollment.classroomSelect} *</label>
                <select
                  value={manualClassroom}
                  onChange={(e) => setManualClassroom(e.target.value as ClassroomId)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="tinokiya">Tinokiyá (Bebés)</option>
                  <option value="paotot">Paotot (Párvulos)</option>
                  <option value="bogrim">Bogrim (Mayores)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold cursor-pointer"
                >
                  {isRTL ? 'ביטול' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'הוספת רשומה' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
