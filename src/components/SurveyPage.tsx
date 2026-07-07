import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import type { Question, SelfAssessmentScores, SurveyResponses } from '../lib/scoring';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';

interface SurveyPageProps {
  onComplete: (studentInfo: StudentInfo, selfAssessment: SelfAssessmentScores, responses: SurveyResponses) => Promise<void> | void;
  savedInfo: StudentInfo | null;
  savedResponses: SurveyResponses | null;
  savedSelfAssessment: SelfAssessmentScores | null;
}

export interface StudentInfo {
  email: string;
  name: string;
  school: string;
  department: string;
  grade: string; // e.g., "3학년", "4학년"
  date: string;
  marketingConsent: boolean;
}

interface PageSection {
  title: string;
  description: string;
  questions: Question[];
}

export const SurveyPage: React.FC<SurveyPageProps> = ({
  onComplete,
  savedInfo,
  savedResponses,
  savedSelfAssessment
}) => {
  // 1. Student Information State
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    school: '',
    department: '',
    grade: '3학년',
    date: new Date().toLocaleDateString('ko-KR'),
    marketingConsent: false
  });

  // 2. Answers State
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessmentScores>({});

  // 3. Navigation State (0 is Intro/Info page, 1 is self-assessment, 2 to 7 are survey pages)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [missingQuestionIds, setMissingQuestionIds] = useState<string[]>([]);
  const [missingSelfAssessmentIds, setMissingSelfAssessmentIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved data if present
  useEffect(() => {
    if (savedInfo) {
      setStudentInfo(savedInfo);
    }
    if (savedResponses) {
      setResponses(savedResponses);
    }
    if (savedSelfAssessment) {
      setSelfAssessment(savedSelfAssessment);
    }
  }, [savedInfo, savedResponses, savedSelfAssessment]);

  // Save to localStorage on change
  const saveToLocalStorage = (
    updatedInfo: StudentInfo,
    updatedResponses: SurveyResponses,
    updatedSelfAssessment: SelfAssessmentScores
  ) => {
    try {
      localStorage.setItem('student_info', JSON.stringify(updatedInfo));
      localStorage.setItem('survey_responses', JSON.stringify(updatedResponses));
      localStorage.setItem('self_assessment', JSON.stringify(updatedSelfAssessment));
    } catch (e) {
      console.error(e);
    }
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const nextValue = type === 'checkbox' && e.target instanceof HTMLInputElement
      ? e.target.checked
      : value;
    const nextInfo = { ...studentInfo, [name]: nextValue };
    setStudentInfo(nextInfo);
    saveToLocalStorage(nextInfo, responses, selfAssessment);
  };

  const handleResponseChange = (qId: string, val: number) => {
    const nextResponses = { ...responses, [qId]: val };
    setResponses(nextResponses);
    if (missingQuestionIds.length > 0 && currentSection) {
      const nextMissingIds = currentSection.questions
        .filter(q => nextResponses[q.id] === undefined)
        .map(q => q.id);
      setMissingQuestionIds(nextMissingIds);
    }
    saveToLocalStorage(studentInfo, nextResponses, selfAssessment);
  };

  const handleSelfAssessmentChange = (indicatorId: string, val: number) => {
    const nextSelfAssessment = { ...selfAssessment, [indicatorId]: val };
    setSelfAssessment(nextSelfAssessment);
    if (missingSelfAssessmentIds.length > 0) {
      setMissingSelfAssessmentIds(
        questionsData.indicators
          .filter((indicator: any) => nextSelfAssessment[indicator.id] === undefined)
          .map((indicator: any) => indicator.id)
      );
    }
    saveToLocalStorage(studentInfo, responses, nextSelfAssessment);
  };

  // Reset survey handler
  const handleReset = () => {
    if (window.confirm('기존 입력한 모든 답변이 초기화됩니다. 계속하시겠습니까?')) {
      const resetInfo = {
        name: '',
        email: '',
        school: '',
        department: '',
        grade: '3학년',
        date: new Date().toLocaleDateString('ko-KR'),
        marketingConsent: false
      };
      const resetResp = {};
      const resetSelfAssessment = {};
      setStudentInfo(resetInfo);
      setResponses(resetResp);
      setSelfAssessment(resetSelfAssessment);
      setCurrentPage(0);
      setMissingQuestionIds([]);
      setMissingSelfAssessmentIds([]);
      try {
        localStorage.removeItem('student_info');
        localStorage.removeItem('survey_responses');
        localStorage.removeItem('self_assessment');
      } catch (e) {
        console.error(e);
      }
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
  const indicators = questionsData.indicators as Array<{
    id: string;
    name: string;
    category: string;
    description: string;
  }>;
  const pageSections: PageSection[] = [
    {
      title: '1. 사고와 방향 설정 (Thinking)',
      description: '작업을 시작하고 문제를 파악하며 디자인 방향을 설정하는 평소 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'thinking')
    },
    {
      title: '2. 제작과 구현 (Making)',
      description: '아이디어를 구체적인 결과물로 만들고 조형미와 디테일을 다듬는 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'making')
    },
    {
      title: '3. 정리와 전달 (Communicating)',
      description: '디자인 결과물을 목적에 맞게 재구성하고 논리적 흐름에 맞춰 말과 글로 전달하는 방식을 진단합니다.',
      questions: allQuestions.filter(q => q.section === 'competency' && q.category === 'communicating')
    },
    {
      title: '4. 작업 태도와 습관 (Working)',
      description: '지시 없이 능동적으로 작업을 시작하고 의견을 반영해 개선하며 협업하는 방식을 진단합니다.',
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
  const selfAssessmentMissing = indicators.filter(indicator => selfAssessment[indicator.id] === undefined);

  const currentSection = currentPage > 1 ? pageSections[currentPage - 2] : null;
  const missingQuestions = currentSection
    ? currentSection.questions.filter(q => responses[q.id] === undefined)
    : [];
  const missingQuestionLabels = missingQuestionIds
    .map(qId => allQuestions.findIndex(q => q.id === qId) + 1)
    .filter(index => index > 0)
    .map(index => `Q${index.toString().padStart(2, '0')}`);

  // Check if current page is completely answered
  const isSectionComplete = () => {
    if (!currentSection) return true;
    return currentSection.questions.every(q => responses[q.id] !== undefined);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !studentInfo.name.trim() ||
      !studentInfo.email.trim() ||
      !studentInfo.school.trim() ||
      !studentInfo.department.trim()
    ) {
      alert('모든 필수 학생 정보를 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentInfo.email.trim())) {
      alert('이메일 형식을 확인해주세요.');
      return;
    }
    if (!studentInfo.marketingConsent) {
      alert('컨설팅 프로그램 안내를 위한 이메일 수집 및 이용에 동의해야 진단을 시작할 수 있습니다.');
      return;
    }
    setMissingQuestionIds([]);
    setMissingSelfAssessmentIds([]);
    const nextSelfAssessment = indicators.reduce<SelfAssessmentScores>((acc, indicator) => {
      acc[indicator.id] = selfAssessment[indicator.id] ?? 5;
      return acc;
    }, {});
    setSelfAssessment(nextSelfAssessment);
    saveToLocalStorage(studentInfo, responses, nextSelfAssessment);
    setCurrentPage(1);
  };

  const handleSelfAssessmentNext = () => {
    if (selfAssessmentMissing.length > 0) {
      setMissingSelfAssessmentIds(selfAssessmentMissing.map(indicator => indicator.id));
      window.requestAnimationFrame(() => {
        document.querySelector('.missing-response-alert')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
      return;
    }
    setMissingSelfAssessmentIds([]);
    setCurrentPage(2);
    window.scrollTo(0, 0);
  };

  const handleNext = async () => {
    if (isSubmitting) return;
    if (missingQuestions.length > 0) {
      setMissingQuestionIds(missingQuestions.map(q => q.id));
      window.requestAnimationFrame(() => {
        document.querySelector('.missing-response-alert')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
      return;
    }
    setMissingQuestionIds([]);
    if (currentPage < pageSections.length + 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } else {
      // Completed all
      if (answeredCount < totalQuestions) {
        const nextMissingQuestion = allQuestions.find(q => responses[q.id] === undefined);
        const nextPageIndex = pageSections.findIndex(section =>
          section.questions.some(q => q.id === nextMissingQuestion?.id)
        );
        if (nextMissingQuestion && nextPageIndex >= 0) {
          const nextSection = pageSections[nextPageIndex];
          setCurrentPage(nextPageIndex + 2);
          setMissingQuestionIds(
            nextSection.questions
              .filter(q => responses[q.id] === undefined)
              .map(q => q.id)
          );
          window.scrollTo(0, 0);
        }
        return;
      }
      setIsSubmitting(true);
      try {
        await onComplete(studentInfo, selfAssessment, responses);
      } catch (error) {
        alert(error instanceof Error ? error.message : '진단 결과 저장에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setMissingQuestionIds([]);
      setMissingSelfAssessmentIds([]);
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
            <div className="alert alert-privacy">
              입력한 학생 정보와 응답은 결과 확인 및 향후 컨설팅 프로그램 안내를 위해 BIAIS 서버에 저장됩니다. 응답자 화면에는 요약 결과만 표시되며, 전체 결과지는 관리자만 확인할 수 있습니다.
            </div>
            <p className="time-est">소요 시간: 약 {questionsData.meta.estimated_time_minutes.standard}분 · 총 {totalQuestions}문항</p>
          </div>

          <form onSubmit={handleStart} className="info-form">
            <h3 className="section-subtitle">학생 기본 정보 입력</h3>
            
            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={studentInfo.email}
                onChange={handleInfoChange}
                placeholder="name@example.com"
                required
              />
            </div>

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

            <label className="consent-check">
              <input
                type="checkbox"
                name="marketingConsent"
                checked={studentInfo.marketingConsent}
                onChange={handleInfoChange}
                required
              />
              <span>향후 컨설팅 프로그램 안내를 받기 위해 이메일 수집 및 이용에 동의합니다.</span>
            </label>

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
      ) : currentPage === 1 ? (
        <div className="self-assessment-flow fade-in">
          <div className="section-intro">
            <h2 className="section-title">내가 생각하는 나의 능력치는?</h2>
          </div>

          {missingSelfAssessmentIds.length > 0 && (
            <div className="missing-response-alert" role="alert">
              <strong>아직 표시하지 않은 역량이 있어요.</strong>
              <span>{missingSelfAssessmentIds.length}개 역량의 슬라이더를 조정해주세요.</span>
            </div>
          )}

          <div className="self-assessment-grid">
            {questionsData.competency_categories.map((cat: any) => (
              <section key={cat.id} className="self-assessment-group">
                <h3 className="self-assessment-group-title">{cat.ko_name}</h3>
                {indicators
                  .filter(indicator => indicator.category === cat.id)
                  .map(indicator => {
                    const value = selfAssessment[indicator.id] ?? 5;
                    const isMissing = missingSelfAssessmentIds.includes(indicator.id);
                    return (
                      <div
                        key={indicator.id}
                        className={`self-slider-card ${isMissing ? 'missing' : ''}`}
                      >
                        <div className="self-slider-header">
                          <div>
                            <h4>{indicator.name}</h4>
                            <p>{indicator.description}</p>
                          </div>
                          <output className="self-slider-value" htmlFor={`self-${indicator.id}`}>
                            {value}점
                          </output>
                        </div>
                        <input
                          id={`self-${indicator.id}`}
                          className="self-slider"
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={value}
                          onChange={(event) => handleSelfAssessmentChange(indicator.id, Number(event.target.value))}
                          style={{ '--slider-progress': `${((value - 1) / 9) * 100}%` } as React.CSSProperties}
                        />
                        <div className="self-slider-scale" aria-hidden="true">
                          <span>1</span>
                          <span>10</span>
                        </div>
                      </div>
                    );
                  })}
              </section>
            ))}
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
              onClick={handleSelfAssessmentNext}
              className={`btn btn-primary ${selfAssessmentMissing.length > 0 ? 'disabled' : ''}`}
            >
              84문항 진단 시작
            </button>
          </div>
        </div>
      ) : (
        // --- 2. SURVEY RUNNING ---
        <div className="survey-flow fade-in">
          <ProgressBar current={answeredCount} total={totalQuestions} />

          <div className="section-intro">
            <h2 className="section-title">{currentSection?.title}</h2>
            <p className="section-desc">{currentSection?.description}</p>
          </div>

          {missingQuestionLabels.length > 0 && (
            <div className="missing-response-alert" role="alert">
              <strong>아직 응답하지 않은 문항이 있어요.</strong>
              <span>{missingQuestionLabels.join(', ')} 문항에 답변하면 다음 단계로 이동할 수 있습니다.</span>
            </div>
          )}

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
                  isMissing={missingQuestionIds.includes(q.id)}
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
              className={`btn btn-primary ${!isSectionComplete() || isSubmitting ? 'disabled' : ''}`}
              disabled={isSubmitting}
            >
              {currentPage === pageSections.length + 1
                ? (isSubmitting ? '저장 중...' : '진단 완료 및 결과 보기')
                : '다음 단계'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
