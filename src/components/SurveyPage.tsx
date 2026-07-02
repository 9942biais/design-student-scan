import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import type { Question, SurveyResponses } from '../lib/scoring';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';

interface SurveyPageProps {
  onComplete: (studentInfo: StudentInfo, responses: SurveyResponses) => void;
  savedInfo: StudentInfo | null;
  savedResponses: SurveyResponses | null;
}

export interface StudentInfo {
  name: string;
  school: string;
  department: string;
  grade: string; // e.g., "3학년", "4학년"
  date: string;
}

interface PageSection {
  title: string;
  description: string;
  questions: Question[];
}

export const SurveyPage: React.FC<SurveyPageProps> = ({
  onComplete,
  savedInfo,
  savedResponses
}) => {
  // 1. Student Information State
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    school: '',
    department: '',
    grade: '3학년',
    date: new Date().toLocaleDateString('ko-KR')
  });

  // 2. Answers State
  const [responses, setResponses] = useState<SurveyResponses>({});

  // 3. Navigation State (0 is Intro/Info page, 1 to 6 are survey pages)
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Load saved data if present
  useEffect(() => {
    if (savedInfo) {
      setStudentInfo(savedInfo);
    }
    if (savedResponses) {
      setResponses(savedResponses);
    }
  }, [savedInfo, savedResponses]);

  // Save to localStorage on change
  const saveToLocalStorage = (updatedInfo: StudentInfo, updatedResponses: SurveyResponses) => {
    localStorage.setItem('student_info', JSON.stringify(updatedInfo));
    localStorage.setItem('survey_responses', JSON.stringify(updatedResponses));
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextInfo = { ...studentInfo, [name]: value };
    setStudentInfo(nextInfo);
    saveToLocalStorage(nextInfo, responses);
  };

  const handleResponseChange = (qId: string, val: number) => {
    const nextResponses = { ...responses, [qId]: val };
    setResponses(nextResponses);
    saveToLocalStorage(studentInfo, nextResponses);
  };

  // Reset survey handler
  const handleReset = () => {
    if (window.confirm('기존 입력한 모든 답변이 초기화됩니다. 계속하시겠습니까?')) {
      const resetInfo = {
        name: '',
        school: '',
        department: '',
        grade: '3학년',
        date: new Date().toLocaleDateString('ko-KR')
      };
      const resetResp = {};
      setStudentInfo(resetInfo);
      setResponses(resetResp);
      setCurrentPage(0);
      localStorage.removeItem('student_info');
      localStorage.removeItem('survey_responses');
    }
  };

  // Group questions by survey page
  // Page 1: Thinking (competency + category 'thinking')
  // Page 2: Making (competency + category 'making')
  // Page 3: Communicating (competency + category 'communicating')
  // Page 4: Working (competency + category 'working')
  // Page 5: Design Orientation (orientation)
  // Page 6: Career / Role Fit (career_fit) & Response Consistency (consistency)
  const allQuestions = questionsData.questions as Question[];
  const pageSections: PageSection[] = [
    {
      title: '1. 사고와 방향 설정 (Thinking)',
      description: '작업을 시작하고, 문제를 파악하며, 디자인 방향을 설정하는 평소 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'thinking')
    },
    {
      title: '2. 제작과 구현 (Making)',
      description: '아이디어를 구체적인 결과물로 만들고, 조형미와 디테일을 다듬는 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'making')
    },
    {
      title: '3. 정리와 전달 (Communicating)',
      description: '디자인 결과물을 목적에 맞게 재구성하고, 논리적 흐름에 맞춰 말과 글로 전달하는 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'communicating')
    },
    {
      title: '4. 작업 태도와 습관 (Working)',
      description: '지시 없이 능동적으로 작업을 시작하고, 의견을 반영해 개선하며, 협업하는 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'working')
    },
    {
      title: '5. 디자인 성향 (Design Orientation)',
      description: '본인 스스로 강하게 추구하는 디자이너로서의 태도와 지향점을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'orientation')
    },
    {
      title: '6. 진로/역할 및 응답 교차 검증 (Career/Role Fit & Consistency)',
      description: '다양한 실무 디자인 환경과 역할 방향에 대한 선호 및 응답의 일관성을 마무리 점검합니다.',
      questions: allQuestions.filter(q => q.section === 'career_fit' || q.section === 'consistency')
    }
  ];

  const totalQuestions = allQuestions.length;
  const answeredCount = allQuestions.filter(q => responses[q.id] !== undefined).length;

  const currentSection = currentPage > 0 ? pageSections[currentPage - 1] : null;

  // Check if current page is completely answered
  const isSectionComplete = () => {
    if (!currentSection) return true;
    return currentSection.questions.every(q => responses[q.id] !== undefined);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInfo.name.trim() || !studentInfo.school.trim() || !studentInfo.department.trim()) {
      alert('모든 필수 학생 정보를 입력해주세요.');
      return;
    }
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (!isSectionComplete()) {
      alert('이 섹션의 모든 문항에 답변해 주세요.');
      return;
    }
    if (currentPage < pageSections.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      // Completed all
      if (answeredCount < totalQuestions) {
        alert('아직 답변하지 않은 문항이 있습니다. 설문을 다시 확인해주세요.');
        return;
      }
      onComplete(studentInfo, responses);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="survey-container">
      {currentPage === 0 ? (
        // --- 1. INTRO & STUDENT INFO FORM ---
        <div className="intro-card fade-in">
          <header className="intro-header">
            <h1 className="main-title">{questionsData.meta.name}</h1>
            <p className="version-tag">v{questionsData.meta.version}</p>
          </header>
          
          <div className="intro-desc">
            <p className="intro-intro">{questionsData.instructions.intro}</p>
            <div className="alert alert-info">
              {questionsData.meta.disclaimer}
            </div>
            <p className="time-est">⏱️ 소요 시간: 약 {questionsData.meta.estimated_time_minutes.standard}분 (총 {totalQuestions}문항)</p>
          </div>

          <form onSubmit={handleStart} className="info-form">
            <h3 className="section-subtitle">학생 기본 정보 입력</h3>
            
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={studentInfo.name}
                onChange={handleInfoChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="school">학교 *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={studentInfo.school}
                  onChange={handleInfoChange}
                  placeholder="예: 서울대학교"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">학과 *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={studentInfo.department}
                  onChange={handleInfoChange}
                  placeholder="예: 디자인과"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="grade">학년 *</label>
                <select
                  id="grade"
                  name="grade"
                  value={studentInfo.grade}
                  onChange={handleInfoChange}
                >
                  <option value="3학년">3학년</option>
                  <option value="4학년">4학년</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">작성일</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={studentInfo.date}
                  disabled
                />
              </div>
            </div>

            <div className="form-actions mt-4">
              {answeredCount > 0 && (
                <button type="button" onClick={handleReset} className="btn btn-secondary">
                  새로 시작하기
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {answeredCount > 0 ? '이어서 진단 시작' : '자기진단 시작하기'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        // --- 2. SURVEY RUNNING ---
        <div className="survey-flow fade-in">
          <ProgressBar current={answeredCount} total={totalQuestions} />

          <div className="section-intro">
            <h2 className="section-title">{currentSection?.title}</h2>
            <p className="section-desc">{currentSection?.description}</p>
          </div>

          <div className="questions-grid">
            {currentSection?.questions.map((q) => {
              // Find global index of this question
              const globalIndex = allQuestions.findIndex(x => x.id === q.id) + 1;
              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  value={responses[q.id]}
                  onChange={(val) => handleResponseChange(q.id, val)}
                  index={globalIndex}
                />
              );
            })}
          </div>

          <div className="navigation-footer">
            <button 
              type="button" 
              onClick={handlePrev} 
              className="btn btn-secondary"
            >
              이전
            </button>
            
            <button 
              type="button" 
              onClick={handleNext} 
              className={`btn btn-primary ${!isSectionComplete() ? 'disabled' : ''}`}
            >
              {currentPage === pageSections.length ? '진단 완료 및 결과 보기' : '다음 단계'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
