import React, { useState } from 'react';
import { Language, ClassroomId, Registration, AttachedFile } from '../types';
import { translations } from '../i18n/translations';
import { mockClassrooms } from '../data/mockData';
import {
  CheckCircle2,
  AlertCircle,
  Printer,
  X,
  Upload,
  FileText,
  Trash2,
  Send,
  ShieldCheck,
  Building2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface EnrollmentFormProps {
  currentLang: Language;
  onNewRegistration: (reg: Registration) => void;
  preselectedClassroomId?: ClassroomId;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  currentLang,
  onNewRegistration,
  preselectedClassroomId,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  // Child details
  const [childFullName, setChildFullName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [childGender, setChildGender] = useState<'female' | 'male' | 'other'>('female');
  const [childIdNumber, setChildIdNumber] = useState('');
  const [classroomId, setClassroomId] = useState<ClassroomId>(preselectedClassroomId || 'paotot');
  const [allergies, setAllergies] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [needsDiapers, setNeedsDiapers] = useState(true);

  // Parent details
  const [parentFullName, setParentFullName] = useState('');
  const [parentRelationship, setParentRelationship] = useState('Madre / אמא');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [parentCity, setParentCity] = useState('');

  // Emergency details
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');
  const [emergencyPhoneAlternative, setEmergencyPhoneAlternative] = useState('');
  const [healthFund, setHealthFund] = useState('Clalit (כללית)');

  // Schedule & dates
  const [scheduleType, setScheduleType] = useState<'regular' | 'extended'>('regular');
  const [attendsFridays, setAttendsFridays] = useState(true);
  const [desiredStartDate, setDesiredStartDate] = useState('2026-09-01');
  const [notes, setNotes] = useState('');

  // Attached files state
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // Form submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReg, setSubmittedReg] = useState<Registration | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const newFiles: AttachedFile[] = filesArray.map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type || 'document',
      uploadedAt: new Date().toISOString().split('T')[0],
    }));

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setFileInputKey(Date.now()); // reset file input
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!childFullName.trim()) {
      errors.childFullName = isRTL ? 'שם הילד/ה הינו שדה חובה' : 'El nombre del niño/a es obligatorio';
    }
    if (!childBirthDate) {
      errors.childBirthDate = isRTL ? 'תאריך לידה הינו שדה חובה' : 'La fecha de nacimiento es obligatoria';
    }
    if (!parentFullName.trim()) {
      errors.parentFullName = isRTL ? 'שם ההורה הינו שדה חובה' : 'El nombre del padre/tutor es obligatorio';
    }
    if (!parentPhone.trim() || parentPhone.length < 8) {
      errors.parentPhone = isRTL ? 'מספר טלפון תקין הינו שדה חובה' : 'Ingrese un teléfono de contacto válido';
    }
    if (!parentEmail.trim() || !parentEmail.includes('@')) {
      errors.parentEmail = isRTL ? 'כתובת דוא״ל תקינה הינה חובה' : 'Ingrese un correo electrónico válido';
    }
    if (!parentAddress.trim()) {
      errors.parentAddress = isRTL ? 'כתובת מגורים הינה שדה חובה' : 'La dirección física es obligatoria';
    }
    if (!parentCity.trim()) {
      errors.parentCity = isRTL ? 'יישוב מגורים הינו שדה חובה' : 'La ciudad de residencia es obligatoria';
    }
    if (!emergencyContact.trim()) {
      errors.emergencyContact = isRTL ? 'שם איש קשר לשעת חירום הינו חובה' : 'El contacto de emergencia es obligatorio';
    }
    if (!emergencyPhoneAlternative.trim()) {
      errors.emergencyPhoneAlternative = isRTL ? 'טלפון לשעת חירום הינו חובה' : 'El teléfono de emergencia es obligatorio';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const elem = document.getElementById(firstErrorKey);
      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const regNumber = `GAN-2026-${Math.floor(200 + Math.random() * 800)}`;
      const newReg: Registration = {
        id: `reg-${Date.now()}`,
        registrationNumber: regNumber,
        createdAt: new Date().toISOString().split('T')[0],
        childFullName: childFullName.trim(),
        childBirthDate,
        childGender,
        childIdNumber: childIdNumber.trim() || '320000000',
        classroomId,
        parentFullName: parentFullName.trim(),
        parentRelationship,
        parentPhone: parentPhone.trim(),
        parentEmail: parentEmail.trim(),
        parentCity: parentCity.trim(),
        parentAddress: parentAddress.trim(),
        emergencyContact: emergencyContact.trim(),
        emergencyContactRelation: emergencyContactRelation.trim() || (isRTL ? 'משפחה' : 'Familiar'),
        emergencyPhoneAlternative: emergencyPhoneAlternative.trim(),
        healthFund,
        allergies: allergies.trim() || (isRTL ? 'אין' : 'Ninguna'),
        medicalConditions: medicalConditions.trim() || (isRTL ? 'אין' : 'Ninguna'),
        specialNeeds: specialNeeds.trim() || (isRTL ? 'אין' : 'Ninguna'),
        needsDiapers,
        scheduleType,
        attendsFridays,
        desiredStartDate,
        notes: notes.trim(),
        status: 'pending',
        attachedFiles,
      };

      onNewRegistration(newReg);
      setSubmittedReg(newReg);
      setIsSubmitting(false);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedReg(null);
    setChildFullName('');
    setChildBirthDate('');
    setChildIdNumber('');
    setAllergies('');
    setSpecialNeeds('');
    setMedicalConditions('');
    setParentFullName('');
    setParentPhone('');
    setParentEmail('');
    setParentAddress('');
    setParentCity('');
    setEmergencyContact('');
    setEmergencyContactRelation('');
    setEmergencyPhoneAlternative('');
    setNotes('');
    setAttachedFiles([]);
    setValidationErrors({});
  };

  return (
    <section id="enrollment" className="py-16 md:py-24 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.enrollment.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.enrollment.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.enrollment.subtitle}
          </p>
        </div>

        {/* Enrollment Form Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Global Error Banner if validation fails */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  {isRTL
                    ? 'אנא תקנו את השדות המסומנים באדום לפני שליחת הטופס.'
                    : 'Por favor complete o corrija los campos requeridos marcados en rojo.'}
                </span>
              </div>
            )}

            {/* SECCIÓN 1: Información del Niño */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {isRTL ? 'פרטי הילד/ה והתאמה לקבוצה' : 'Información del Niño/a'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.childName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="childFullName"
                    type="text"
                    value={childFullName}
                    onChange={(e) => {
                      setChildFullName(e.target.value);
                      if (validationErrors.childFullName) {
                        setValidationErrors((prev) => ({ ...prev, childFullName: '' }));
                      }
                    }}
                    placeholder={isRTL ? 'לדוגמה: איתן כהן' : 'Ej: Eitan Cohen'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.childFullName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.childFullName && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.childFullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.birthDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="childBirthDate"
                    type="date"
                    value={childBirthDate}
                    onChange={(e) => {
                      setChildBirthDate(e.target.value);
                      if (validationErrors.childBirthDate) {
                        setValidationErrors((prev) => ({ ...prev, childBirthDate: '' }));
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.childBirthDate ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.childBirthDate && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.childBirthDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.idNumber}
                  </label>
                  <input
                    type="text"
                    value={childIdNumber}
                    onChange={(e) => setChildIdNumber(e.target.value)}
                    placeholder={isRTL ? '9 ספרות ת.ז' : 'N° Teudat Zehut / Pasaporte'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.classroomSelect} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={classroomId}
                    onChange={(e) => setClassroomId(e.target.value as ClassroomId)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    {mockClassrooms.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name[currentLang]} ({cls.ageRange[currentLang]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Alergias y Necesidades Especiales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'אלרגיות או רגישויות למזון' : 'Alergias o Intolerancias Alimentarias'}
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder={isRTL ? 'רשמו אין או פירוט (למשל: רגישות לחלב)' : 'Escriba "Ninguna" o detalle (ej: leche, huevo, gluten)'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'צרכים מיוחדים או ליווי התפתחותי' : 'Necesidades Especiales o Acompañamiento'}
                  </label>
                  <input
                    type="text"
                    value={specialNeeds}
                    onChange={(e) => setSpecialNeeds(e.target.value)}
                    placeholder={isRTL ? 'פיזיותרפיה, קלינאית תקשורת או צורך מיוחד' : 'Fisioterapia, lenguaje, o necesidades particulares'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.gender}
                  </label>
                  <div className="flex gap-4 text-xs font-medium text-stone-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="childGender"
                        checked={childGender === 'female'}
                        onChange={() => setChildGender('female')}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{t.enrollment.female}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="childGender"
                        checked={childGender === 'male'}
                        onChange={() => setChildGender('male')}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{t.enrollment.male}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="childGender"
                        checked={childGender === 'other'}
                        onChange={() => setChildGender('other')}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{t.enrollment.otherGender}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.needsDiapers}
                  </label>
                  <div className="flex gap-4 text-xs font-medium text-stone-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="needsDiapers"
                        checked={needsDiapers === true}
                        onChange={() => setNeedsDiapers(true)}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{t.enrollment.yes}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="needsDiapers"
                        checked={needsDiapers === false}
                        onChange={() => setNeedsDiapers(false)}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{t.enrollment.no}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: Información de los Padres/Tutores */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {isRTL ? 'פרטי ההורים וכתובת מגורים' : 'Información de los Padres/Tutores'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.parentName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentFullName"
                    type="text"
                    value={parentFullName}
                    onChange={(e) => {
                      setParentFullName(e.target.value);
                      if (validationErrors.parentFullName) {
                        setValidationErrors((prev) => ({ ...prev, parentFullName: '' }));
                      }
                    }}
                    placeholder={isRTL ? 'שם הורה מלא' : 'Nombre padre/madre/tutor'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.parentFullName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.parentFullName && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.parentFullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.relationship}
                  </label>
                  <input
                    type="text"
                    value={parentRelationship}
                    onChange={(e) => setParentRelationship(e.target.value)}
                    placeholder={isRTL ? 'אמא / אבא / אפוטרופוס' : 'Madre, Padre o Tutor'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.phone} (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentPhone"
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => {
                      setParentPhone(e.target.value);
                      if (validationErrors.parentPhone) {
                        setValidationErrors((prev) => ({ ...prev, parentPhone: '' }));
                      }
                    }}
                    placeholder="054-1234567"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.parentPhone ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums`}
                  />
                  {validationErrors.parentPhone && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.parentPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentEmail"
                    type="email"
                    value={parentEmail}
                    onChange={(e) => {
                      setParentEmail(e.target.value);
                      if (validationErrors.parentEmail) {
                        setValidationErrors((prev) => ({ ...prev, parentEmail: '' }));
                      }
                    }}
                    placeholder="family@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.parentEmail ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.parentEmail && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.parentEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'כתובת מגורים (רחוב ומספר)' : 'Dirección Física (Calle y Número)'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentAddress"
                    type="text"
                    value={parentAddress}
                    onChange={(e) => {
                      setParentAddress(e.target.value);
                      if (validationErrors.parentAddress) {
                        setValidationErrors((prev) => ({ ...prev, parentAddress: '' }));
                      }
                    }}
                    placeholder={isRTL ? 'למשל: רחוב ויצמן 45' : 'Ej: Calle Weizmann 45, dpto 2'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.parentAddress ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.parentAddress && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.parentAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.city} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentCity"
                    type="text"
                    value={parentCity}
                    onChange={(e) => {
                      setParentCity(e.target.value);
                      if (validationErrors.parentCity) {
                        setValidationErrors((prev) => ({ ...prev, parentCity: '' }));
                      }
                    }}
                    placeholder={isRTL ? 'עיר (כפר סבא, רעננה, נתניה)' : 'Ej: Kfar Saba, Raanana, Tel Aviv'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.parentCity ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.parentCity && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.parentCity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: Detalles de Emergencia */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {isRTL ? 'פרטי חירום וקופת חולים' : 'Detalles de Emergencia'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'איש קשר לשעת חירום' : 'Contacto de Emergencia'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyContact"
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => {
                      setEmergencyContact(e.target.value);
                      if (validationErrors.emergencyContact) {
                        setValidationErrors((prev) => ({ ...prev, emergencyContact: '' }));
                      }
                    }}
                    placeholder={isRTL ? 'שם סבא / סבתא / דוד' : 'Ej: Abuelo Dani'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.emergencyContact ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                  />
                  {validationErrors.emergencyContact && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.emergencyContact}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'קרבה משפחתית' : 'Parentesco'}
                  </label>
                  <input
                    type="text"
                    value={emergencyContactRelation}
                    onChange={(e) => setEmergencyContactRelation(e.target.value)}
                    placeholder={isRTL ? 'סבא / דודה' : 'Abuela, Tío, Vecino'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'טלפון נוסף לשעת חירום' : 'Teléfono Alternativo'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emergencyPhoneAlternative"
                    type="tel"
                    value={emergencyPhoneAlternative}
                    onChange={(e) => {
                      setEmergencyPhoneAlternative(e.target.value);
                      if (validationErrors.emergencyPhoneAlternative) {
                        setValidationErrors((prev) => ({ ...prev, emergencyPhoneAlternative: '' }));
                      }
                    }}
                    placeholder="052-0000000"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.emergencyPhoneAlternative ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono`}
                  />
                  {validationErrors.emergencyPhoneAlternative && (
                    <p className="text-[11px] text-red-600 mt-1">{validationErrors.emergencyPhoneAlternative}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isRTL ? 'קופת חולים (ישראל)' : 'Kupat Jolim (Salud Israel)'}
                  </label>
                  <select
                    value={healthFund}
                    onChange={(e) => setHealthFund(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="Clalit (כללית)">Clalit (כללית)</option>
                    <option value="Maccabi (מכבי)">Maccabi (מכבי)</option>
                    <option value="Meuhedet (מאוחדת)">Meuhedet (מאוחדת)</option>
                    <option value="Leumit (לאומית)">Leumit (לאומית)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: Adjuntar Documentos */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {isRTL ? 'צירוף מסמכים (חיסונים, ת.ז, אישור רפואי)' : 'Adjuntar Documentos (Opcional)'}
                </h3>
              </div>

              <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 transition-colors rounded-2xl p-6 text-center bg-stone-50/50">
                <input
                  key={fileInputKey}
                  type="file"
                  id="documentUpload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="documentUpload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800">
                    {isRTL ? 'לחצו להעלאת מסמכים או גררו לכאן' : 'Haz clic para seleccionar o arrastra documentos aquí'}
                  </div>
                  <p className="text-[11px] text-stone-500 max-w-md">
                    {isRTL
                      ? 'פנקס חיסונים (טיפת חלב), ספח תעודת זהות, אישור רפואי (PDF, JPG, PNG עד 10MB)'
                      : 'Cartilla de vacunación (Tipat Jalav), fotocopia de Teudat Zehut / ID o certificado médico (PDF, JPG hasta 10MB)'}
                  </p>
                </label>
              </div>

              {/* Lista de archivos adjuntos */}
              {attachedFiles.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-stone-700">
                    {isRTL ? 'מסמכים שצורפו:' : 'Documentos adjuntos:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {attachedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-white text-xs shadow-2xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="font-medium text-stone-800 truncate">{file.name}</span>
                          <span className="text-stone-400 text-[10px] tabular-nums shrink-0">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-stone-400 hover:text-red-600 p-1 rounded-md transition-colors"
                          title="Eliminar archivo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 5: Modalidad y Comentarios */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.scheduleType}
                  </label>
                  <select
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value as 'regular' | 'extended')}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="regular">{t.enrollment.regularTime}</option>
                    <option value="extended">{t.enrollment.extendedTime}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.fridaysOption}
                  </label>
                  <select
                    value={attendsFridays ? 'yes' : 'no'}
                    onChange={(e) => setAttendsFridays(e.target.value === 'yes')}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="yes">{t.enrollment.yes} (07:30 - 12:30)</option>
                    <option value="no">{t.enrollment.no}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.enrollment.startDate}
                  </label>
                  <input
                    type="date"
                    value={desiredStartDate}
                    onChange={(e) => setDesiredStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.enrollment.notes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isRTL
                      ? 'שאלות נוספות, בקשה לתיאום סיור מודרך או העדפות מיוחדות...'
                      : 'Comentarios, disponibilidad para visitar el jardín, o necesidades particulares...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-base font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-2xl transition-all shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 active:scale-99 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.enrollment.submitting}</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t.enrollment.submitButton}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation & Printable Receipt Modal */}
      {submittedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-extrabold text-stone-900">
                {t.enrollment.successTitle}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed">
                {t.enrollment.successMessage}
              </p>

              {/* Code Banner */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 my-4">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  {t.enrollment.registrationCode}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-wider tabular-nums my-1">
                  {submittedReg.registrationNumber}
                </div>
                <div className="text-[11px] text-stone-500">
                  {t.enrollment.saveCodeAdvice}
                </div>
              </div>

              {/* Summary box */}
              <div className="bg-stone-50 rounded-xl p-4 text-xs text-stone-700 text-left space-y-1.5 border border-stone-200/80">
                <div className="flex justify-between">
                  <span className="text-stone-500">{isRTL ? 'שם הילד/ה:' : 'Alumno/a:'}</span>
                  <span className="font-bold text-stone-900">{submittedReg.childFullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isRTL ? 'קבוצה:' : 'Sala:'}</span>
                  <span className="font-bold text-stone-900 uppercase">{submittedReg.classroomId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isRTL ? 'כתובת:' : 'Dirección:'}</span>
                  <span className="font-semibold text-stone-900">{submittedReg.parentAddress}, {submittedReg.parentCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isRTL ? 'חירום:' : 'Emergencia:'}</span>
                  <span className="font-semibold text-stone-900">{submittedReg.emergencyContact} ({submittedReg.emergencyPhoneAlternative})</span>
                </div>
                {submittedReg.attachedFiles && submittedReg.attachedFiles.length > 0 && (
                  <div className="flex justify-between pt-1 border-t border-stone-200/60">
                    <span className="text-stone-500">{isRTL ? 'מסמכים:' : 'Adjuntos:'}</span>
                    <span className="font-semibold text-emerald-800">{submittedReg.attachedFiles.length} {isRTL ? 'קבצים' : 'archivos'}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-50 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.enrollment.printReceipt}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition-colors"
                >
                  {t.enrollment.closeModal}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
