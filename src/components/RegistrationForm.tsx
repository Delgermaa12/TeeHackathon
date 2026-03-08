import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CheckCircle2,
  Info,
  GraduationCap,
  Briefcase,
  ClipboardList,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useDataContext } from '../context/DataContext';
import { useAlert } from '../hooks/useAlert';

interface Branch {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  image: string;
}

interface CurriculumItem {
  title: string;
  desc: string;
  skills: string[];
}

type FormType = '' | 'training' | 'job' | 'survey';

interface TrainingFormData {
  lastName: string;
  firstName: string;
  grade: number;
  age: string;
  branchId: string;
  phone1: string;
  phone2: string;
}

interface JobFormData {
  lastName: string;
  firstName: string;
  age: string;
  school: string;
  major: string;
  educationLevel: string;
  gpa: string;
  phone: string;
  email: string;
}

interface SurveyFormData {
  fullName: string;
  phone: string;
  interest: string;
  note: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRANCHES: Branch[] = [
  {
    id: 'gem-castle',
    name: 'Gem Castle',
    description: 'СУИС-ийн урд Gem Castle 15 давхарт 1501 тоот',
    lat: 47.9237,
    lng: 106.9178,
    image: 'https://picsum.photos/seed/gemcastle/800/400',
  },
  {
    id: 'nature',
    name: 'Натур',
    description: 'Натур худалдааны төвийн ойролцоо',
    lat: 47.9185,
    lng: 106.9412,
    image: 'https://picsum.photos/seed/nature/800/400',
  },
  {
    id: 'yaarmag',
    name: 'Яармаг',
    description: 'Яармаг дахь салбар',
    lat: 47.875,
    lng: 106.835,
    image: 'https://picsum.photos/seed/yaarmag/800/400',
  },
  {
    id: 'gem-mall',
    name: 'Gem Mall',
    description: '25-р эмийн сан, Gem Mall',
    lat: 47.912,
    lng: 106.885,
    image: 'https://picsum.photos/seed/gemmall/800/400',
  },
  {
    id: 'tusgal',
    name: 'Тусгал',
    description: 'Тэнгис кино театрын хойно Тусгал төв',
    lat: 47.9255,
    lng: 106.908,
    image: 'https://picsum.photos/seed/tusgal/800/400',
  },
];

const CURRICULUM_DATA: Record<number, CurriculumItem> = {
  3: {
    title: '3-р анги',
    desc: 'Програмчлалын үндэс',
    skills: ['Logic', 'Scratch', 'Algorithm', 'Digital art'],
  },
  4: {
    title: '4-р анги',
    desc: 'Визуал програмчлал',
    skills: ['Game basics', 'Creative coding', 'Variables', 'Animation'],
  },
  5: {
    title: '5-р анги',
    desc: 'Тоглоом хөгжүүлэлт',
    skills: ['Advanced Scratch', 'Python', 'Problem solving', 'Projects'],
  },
  6: {
    title: '6-р анги',
    desc: 'Кибер аюулгүй байдал',
    skills: ['Cyber', 'Network', 'Hardware', 'Privacy'],
  },
  7: {
    title: '7-р анги',
    desc: 'App хөгжүүлэлт',
    skills: ['App dev', 'UX/UI', 'Prototype', 'Research'],
  },
  8: {
    title: '8-р анги',
    desc: 'Вэб хөгжүүлэлт',
    skills: ['HTML/CSS', 'JavaScript', 'Web design', 'Interactive project'],
  },
  9: {
    title: '9-р анги',
    desc: 'Өгөгдлийн бүтэц',
    skills: ['Data structure', 'Algorithms', 'Backend', 'API'],
  },
  10: {
    title: '10-р анги',
    desc: 'AI, ML үндэс',
    skills: ['AI', 'ML', 'Data analysis', 'Future tech'],
  },
};

const INITIAL_TRAINING_FORM: TrainingFormData = {
  lastName: '',
  firstName: '',
  grade: 3,
  age: '',
  branchId: '',
  phone1: '',
  phone2: '',
};

const INITIAL_JOB_FORM: JobFormData = {
  lastName: '',
  firstName: '',
  age: '',
  school: '',
  major: '',
  educationLevel: '',
  gpa: '',
  phone: '',
  email: '',
};

const INITIAL_SURVEY_FORM: SurveyFormData = {
  fullName: '',
  phone: '',
  interest: '',
  note: '',
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme } = useAppContext();
  const { showAlert } = useAlert();
  const { addRequest } = useDataContext();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<FormType>('');

  const [trainingForm, setTrainingForm] =
    useState<TrainingFormData>(INITIAL_TRAINING_FORM);
  const [jobForm, setJobForm] = useState<JobFormData>(INITIAL_JOB_FORM);
  const [surveyForm, setSurveyForm] =
    useState<SurveyFormData>(INITIAL_SURVEY_FORM);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setIsLoading(false);
      setSubmitted(false);
      setFormType('');
      setTrainingForm(INITIAL_TRAINING_FORM);
      setJobForm(INITIAL_JOB_FORM);
      setSurveyForm(INITIAL_SURVEY_FORM);
    }
  }, [isOpen]);

  const selectedBranch = useMemo(
    () => BRANCHES.find((b) => b.id === trainingForm.branchId),
    [trainingForm.branchId]
  );

  const getMaxStep = () => {
    if (formType === 'training') return 4;
    if (formType === 'job') return 2;
    if (formType === 'survey') return 1;
    return 0;
  };

  const totalSteps = getMaxStep();

  const updateTrainingField = <K extends keyof TrainingFormData>(
    key: K,
    value: TrainingFormData[K]
  ) => {
    setTrainingForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateJobField = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K]
  ) => {
    setJobForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateSurveyField = <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K]
  ) => {
    setSurveyForm((prev) => ({ ...prev, [key]: value }));
  };

  const getRoadmap = () => {
    const grade = Number(trainingForm.grade);
    let path: number[] = [];
    let note = '';

    if (grade >= 3 && grade <= 5) {
      if (grade === 3) path = [3];
      if (grade === 4) path = [3, 4];
      if (grade === 5) {
        path = [3, 4, 5];
        note = 'Суурийн агуулгыг шаталж нөхөж үзнэ.';
      }
    } else {
      if (grade === 6) path = [6];
      else {
        path = [6, 7, grade];
        note = `${grade}-р ангийн сурагч шаталсан байдлаар ахина.`;
      }
    }

    return { path, note };
  };

  const validateCurrentStep = () => {
    const errors: string[] = [];

    if (step === 0 && !formType) {
      errors.push('Эхлээд төрөл сонгоно уу.');
    }

    if (formType === 'training') {
      if (step === 1) {
        if (!trainingForm.lastName.trim()) errors.push('Овог оруулна уу.');
        if (!trainingForm.firstName.trim()) errors.push('Нэр оруулна уу.');
        if (!trainingForm.age.trim()) errors.push('Нас оруулна уу.');
        if (!trainingForm.phone1.trim()) errors.push('Утас 1 оруулна уу.');
        if (!trainingForm.phone2.trim()) errors.push('Утас 2 оруулна уу.');
      }

      if (step === 4 && !trainingForm.branchId) {
        errors.push('Салбар сонгоно уу.');
      }
    }

    if (formType === 'job') {
      if (step === 1) {
        if (!jobForm.lastName.trim()) errors.push('Овог оруулна уу.');
        if (!jobForm.firstName.trim()) errors.push('Нэр оруулна уу.');
        if (!jobForm.age.trim()) errors.push('Нас оруулна уу.');
        if (!jobForm.school.trim()) errors.push('Сургууль оруулна уу.');
        if (!jobForm.major.trim()) errors.push('Мэргэжил оруулна уу.');
        if (!jobForm.phone.trim()) errors.push('Утас оруулна уу.');
      }

      if (step === 2) {
        if (!jobForm.educationLevel.trim()) {
          errors.push('Боловсролын түвшин оруулна уу.');
        }
        if (!jobForm.email.trim()) {
          errors.push('Имэйл оруулна уу.');
        }
      }
    }

    if (formType === 'survey') {
      if (step === 1) {
        if (!surveyForm.fullName.trim()) errors.push('Нэр оруулна уу.');
        if (!surveyForm.phone.trim()) errors.push('Утас оруулна уу.');
        if (!surveyForm.interest.trim()) errors.push('Сонирхол оруулна уу.');
      }
    }

    if (errors.length > 0) {
      showAlert(errors.join('\n'), 'warning');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formType === 'training') {
        addRequest({
          name: `${trainingForm.lastName} ${trainingForm.firstName}`,
          phone: trainingForm.phone1,
          type: 'training',
          priority: 'high',
          status: 'new',
        });
      } else if (formType === 'job') {
        addRequest({
          name: `${jobForm.lastName} ${jobForm.firstName}`,
          email: jobForm.email,
          phone: jobForm.phone,
          type: 'teacher',
          priority: 'medium',
          status: 'new',
        });
      } else if (formType === 'survey') {
        addRequest({
          name: surveyForm.fullName,
          phone: surveyForm.phone,
          type: 'support',
          priority: 'low',
          status: 'new',
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      showAlert('Алдаа гарлаа. Дахин оролдоно уу.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const MapSimulation = () => {
    return (
      <div
        className={`relative w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden border ${
          theme === 'dark'
            ? 'border-white/10 bg-white/5'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M10,10 L90,10 L90,90 L10,90 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M10,30 L90,30 M10,60 L90,60 M30,10 L30,90 M60,10 L60,90"
            stroke="currentColor"
            strokeWidth="0.2"
          />
        </svg>

        {BRANCHES.map((branch) => {
          const x = (branch.lng - 106.8) * 500;
          const y = 100 - (branch.lat - 47.85) * 500;
          const isSelected = branch.id === trainingForm.branchId;

          return (
            <motion.button
              type="button"
              key={branch.id}
              initial={false}
              animate={{
                scale: isSelected ? 1.25 : 1,
                opacity: isSelected ? 1 : 0.5,
              }}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -100%)',
              }}
              onClick={() => updateTrainingField('branchId', branch.id)}
            >
              <MapPin
                size={isSelected ? 20 : 14}
                className={
                  isSelected
                    ? 'text-[#D4AF37]'
                    : theme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                }
              />
            </motion.button>
          );
        })}
      </div>
    );
  };

  const getStepTitle = () => {
    if (submitted) return 'Амжилттай бүртгэгдлээ';

    if (step === 0) return 'Сонголт хийх';

    if (formType === 'training') {
      if (step === 1) return 'Сурагчийн мэдээлэл';
      if (step === 2) return 'Анги сонгох';
      if (step === 3) return 'Хөтөлбөр';
      if (step === 4) return 'Салбар';
    }

    if (formType === 'job') {
      if (step === 1) return 'Ажлын анкет';
      if (step === 2) return 'Нэмэлт мэдээлэл';
    }

    if (formType === 'survey') {
      if (step === 1) return 'Судалгааны маягт';
    }

    return 'Бүртгэл';
  };

  const getSuccessText = () => {
    if (formType === 'training') {
      return 'Таны сургалтын бүртгэлийг хүлээн авлаа. Манай баг удахгүй тантай холбогдох болно.';
    }
    if (formType === 'job') {
      return 'Таны ажлын анкет амжилттай илгээгдлээ. Сонгон шалгаруулалтын баг тантай эргэн холбогдоно.';
    }
    return 'Таны судалгааны мэдээлэл амжилттай илгээгдлээ. Баярлалаа.';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className={`w-full max-w-5xl h-[96vh] sm:h-[92vh] rounded-[24px] shadow-2xl overflow-hidden flex flex-col ${
          theme === 'dark'
            ? 'bg-[#0A0D18] text-white border border-white/10'
            : 'bg-white text-gray-900 border border-black/5'
        }`}
      >
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-['Syne'] font-bold text-lg sm:text-2xl tracking-tight">
              {getStepTitle()}
            </h2>
            {!submitted && (
              <p className="text-xs sm:text-sm opacity-60">
                {step === 0 ? 'Эхний сонголтоо хийнэ үү' : `Алхам ${step} / ${totalSteps}`}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {!submitted && formType !== '' && (
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-2 shrink-0">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                    step >= s
                      ? 'bg-[#D4AF37] text-black'
                      : theme === 'dark'
                      ? 'bg-white/10 text-white/40'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>

                {s < totalSteps && (
                  <div
                    className={`flex-1 h-[2px] rounded-full ${
                      step > s
                        ? 'bg-[#D4AF37]'
                        : theme === 'dark'
                        ? 'bg-white/10'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 px-4 sm:px-6 py-3 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center">
            <AnimatePresence mode="wait">
              {submitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="w-full flex flex-col items-center justify-center text-center px-4"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6">
                    <CheckCircle2 size={44} />
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold mb-3 font-['Syne']">
                    Амжилттай бүртгэгдлээ
                  </h3>

                  <p className="max-w-xl text-sm sm:text-lg opacity-70 leading-relaxed">
                    {getSuccessText()}
                  </p>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-8 px-8 py-3 rounded-full bg-[#D4AF37] text-black font-bold hover:scale-105 transition-transform"
                  >
                    Хаах
                  </button>
                </motion.div>
              )}

              {!submitted && step === 0 && (
                <motion.div
                  key="choose-type"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl sm:text-3xl font-bold mb-2 font-['Syne']">
                      Юунд бүртгүүлэх вэ?
                    </h3>
                    <p className="text-sm sm:text-base opacity-60">
                      Доорх сонголтоос нэгийг сонгоно уу.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormType('training')}
                      className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
                        formType === 'training'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : theme === 'dark'
                          ? 'border-white/10 bg-white/5 hover:bg-white/10'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <GraduationCap className="text-[#D4AF37] mb-4" size={30} />
                      <h4 className="font-bold text-lg mb-2">Сургалтад бүртгүүлэх</h4>
                      <p className="text-sm opacity-70">
                        Хүүхдээ сургалтад бүртгүүлэх сонголт.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType('job')}
                      className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
                        formType === 'job'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : theme === 'dark'
                          ? 'border-white/10 bg-white/5 hover:bg-white/10'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Briefcase className="text-[#D4AF37] mb-4" size={30} />
                      <h4 className="font-bold text-lg mb-2">Ажилд орох</h4>
                      <p className="text-sm opacity-70">
                        Ажлын анкет бөглөж илгээх сонголт.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType('survey')}
                      className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
                        formType === 'survey'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : theme === 'dark'
                          ? 'border-white/10 bg-white/5 hover:bg-white/10'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <ClipboardList className="text-[#D4AF37] mb-4" size={30} />
                      <h4 className="font-bold text-lg mb-2">Судалгаа өгөх</h4>
                      <p className="text-sm opacity-70">
                        Санал, сонирхол, хэрэгцээний мэдээлэл үлдээх хэсэг.
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'training' && step === 1 && (
                <motion.div
                  key="training-step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
                >
                  <div className="md:col-span-2">
                    <h3 className="font-bold text-base sm:text-xl">Сурагчийн мэдээлэл</h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Хүүхдийн үндсэн мэдээллийг оруулна уу.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Овог *</label>
                    <input
                      type="text"
                      value={trainingForm.lastName}
                      onChange={(e) => updateTrainingField('lastName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Овог"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нэр *</label>
                    <input
                      type="text"
                      value={trainingForm.firstName}
                      onChange={(e) => updateTrainingField('firstName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Нэр"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нас *</label>
                    <input
                      type="number"
                      min="1"
                      value={trainingForm.age}
                      onChange={(e) => updateTrainingField('age', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Нас"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Утас 1 *</label>
                    <input
                      type="tel"
                      value={trainingForm.phone1}
                      onChange={(e) => updateTrainingField('phone1', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="+976 ..."
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Утас 2 *</label>
                    <input
                      type="tel"
                      value={trainingForm.phone2}
                      onChange={(e) => updateTrainingField('phone2', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="+976 ..."
                    />
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'training' && step === 2 && (
                <motion.div
                  key="training-step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-base sm:text-xl">Анги сонгох</h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Намар хэддүгээр ангид элсэхээ сонгоно уу.
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-xl border flex gap-3 items-center ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Info className="text-[#D4AF37] shrink-0" size={20} />
                    <p className="text-xs sm:text-sm opacity-80">
                      Бага анги: 3-5, Дунд/Ахлах анги: 6-10
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => updateTrainingField('grade', g)}
                        className={`p-4 sm:p-5 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          trainingForm.grade === g
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg scale-[1.02]'
                            : theme === 'dark'
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl font-bold">{g}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">анги</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'training' && step === 3 && (
                <motion.div
                  key="training-step-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full h-full flex flex-col justify-center space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-base sm:text-xl">
                      Хөтөлбөрийн замнал ({trainingForm.grade}-р анги)
                    </h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Суралцах дараалал
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {getRoadmap().path.map((g) => (
                      <div
                        key={g}
                        className={`p-4 rounded-2xl border ${
                          g === trainingForm.grade
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                            : theme === 'dark'
                            ? 'bg-white/5 border-white/10'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                              g === trainingForm.grade
                                ? 'bg-[#D4AF37] text-black'
                                : theme === 'dark'
                                ? 'bg-white/10 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            {g}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-bold text-sm sm:text-base">
                              {CURRICULUM_DATA[g]?.title}
                            </h4>
                            <p className="text-xs sm:text-sm opacity-70">
                              {CURRICULUM_DATA[g]?.desc}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {CURRICULUM_DATA[g]?.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {getRoadmap().note && (
                    <div className="p-3 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex gap-2 items-start">
                      <Info size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                      <p className="text-xs sm:text-sm text-[#D4AF37] font-medium">
                        {getRoadmap().note}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {!submitted && formType === 'training' && step === 4 && (
                <motion.div
                  key="training-step-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center"
                >
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base sm:text-xl">Салбар сонгох</h3>
                      <p className="text-xs sm:text-sm opacity-60">
                        Танд хамгийн ойр салбарыг сонгоно уу.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {BRANCHES.map((branch) => (
                        <button
                          type="button"
                          key={branch.id}
                          onClick={() => updateTrainingField('branchId', branch.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                            trainingForm.branchId === branch.id
                              ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                              : theme === 'dark'
                              ? 'bg-white/5 border-white/10 hover:bg-white/10'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              trainingForm.branchId === branch.id
                                ? 'bg-[#D4AF37] text-black'
                                : theme === 'dark'
                                ? 'bg-white/10'
                                : 'bg-gray-200'
                            }`}
                          >
                            <MapPin size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold">{branch.name}</p>
                            <p className="text-[10px] sm:text-xs opacity-60 truncate">
                              {branch.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <MapSimulation />

                    {selectedBranch && (
                      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                        <img
                          src={selectedBranch.image}
                          alt={selectedBranch.name}
                          className="w-full h-[140px] sm:h-[180px] object-cover"
                        />
                        <div className="p-3">
                          <p className="font-bold text-sm sm:text-base">
                            {selectedBranch.name}
                          </p>
                          <p className="text-xs sm:text-sm opacity-70">
                            {selectedBranch.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'job' && step === 1 && (
                <motion.div
                  key="job-step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
                >
                  <div className="md:col-span-2">
                    <h3 className="font-bold text-base sm:text-xl">Ажлын анкет</h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Эхний шатны үндсэн мэдээллээ оруулна уу.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Овог *</label>
                    <input
                      type="text"
                      value={jobForm.lastName}
                      onChange={(e) => updateJobField('lastName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Овог"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нэр *</label>
                    <input
                      type="text"
                      value={jobForm.firstName}
                      onChange={(e) => updateJobField('firstName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Нэр"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нас *</label>
                    <input
                      type="number"
                      value={jobForm.age}
                      onChange={(e) => updateJobField('age', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Нас"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Сургууль *</label>
                    <input
                      type="text"
                      value={jobForm.school}
                      onChange={(e) => updateJobField('school', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Их сургууль / Коллеж / Сургууль"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Мэргэжил *</label>
                    <input
                      type="text"
                      value={jobForm.major}
                      onChange={(e) => updateJobField('major', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Мэргэжил"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Утас *</label>
                    <input
                      type="tel"
                      value={jobForm.phone}
                      onChange={(e) => updateJobField('phone', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="+976 ..."
                    />
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'job' && step === 2 && (
                <motion.div
                  key="job-step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
                >
                  <div className="md:col-span-2">
                    <h3 className="font-bold text-base sm:text-xl">Нэмэлт мэдээлэл</h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Үлдсэн мэдээллээ оруулна уу.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">
                      Боловсролын түвшин *
                    </label>
                    <input
                      type="text"
                      value={jobForm.educationLevel}
                      onChange={(e) => updateJobField('educationLevel', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Бакалавр / Магистр / гэх мэт"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Голч дүн</label>
                    <input
                      type="text"
                      value={jobForm.gpa}
                      onChange={(e) => updateJobField('gpa', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Жишээ: 3.4"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Имэйл *</label>
                    <input
                      type="email"
                      value={jobForm.email}
                      onChange={(e) => updateJobField('email', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="name@example.com"
                    />
                  </div>
                </motion.div>
              )}

              {!submitted && formType === 'survey' && step === 1 && (
                <motion.div
                  key="survey-step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="w-full grid grid-cols-1 gap-3 sm:gap-4"
                >
                  <div>
                    <h3 className="font-bold text-base sm:text-xl">Судалгааны маягт</h3>
                    <p className="text-xs sm:text-sm opacity-60">
                      Богино мэдээллээ үлдээнэ үү.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нэр *</label>
                    <input
                      type="text"
                      value={surveyForm.fullName}
                      onChange={(e) => updateSurveyField('fullName', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Бүтэн нэр"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Утас *</label>
                    <input
                      type="tel"
                      value={surveyForm.phone}
                      onChange={(e) => updateSurveyField('phone', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="+976 ..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">
                      Юу сонирхож байна вэ? *
                    </label>
                    <input
                      type="text"
                      value={surveyForm.interest}
                      onChange={(e) => updateSurveyField('interest', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base"
                      placeholder="Сургалт, ажлын байр, салбар, үнэ гэх мэт"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium opacity-70">Нэмэлт тайлбар</label>
                    <textarea
                      value={surveyForm.note}
                      onChange={(e) => updateSurveyField('note', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-sm sm:text-base min-h-[120px] resize-none"
                      placeholder="Нэмэлт санал, хүсэлт..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!submitted && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                step === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10'
              }`}
            >
              <ChevronLeft size={18} />
              Буцах
            </button>

            {step === 0 ? (
              <button
                type="button"
                onClick={() => {
                  if (!validateCurrentStep()) return;
                  setStep(1);
                }}
                className="flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg"
              >
                Эхлэх
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={step === totalSteps ? handleSubmit : handleNext}
                disabled={isLoading}
                className="flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Илгээж байна...' : step === totalSteps ? 'Илгээх' : 'Дараах'}
                {!isLoading && <ChevronRight size={18} />}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};