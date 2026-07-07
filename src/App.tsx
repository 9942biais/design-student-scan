import { useState, useEffect } from 'react';
import { SurveyPage, type StudentInfo } from './components/SurveyPage';
import { ResultPage } from './components/ResultPage';
import { AdminPage } from './components/AdminPage';
import type { SelfAssessmentScores, SurveyResponses } from './lib/scoring';
import { createSubmission } from './lib/api';

const getToday = () => new Date().toLocaleDateString('ko-KR');

const normalizeStudentInfo = (value: Partial<StudentInfo>): StudentInfo => ({
  email: value.email ?? '',
  name: value.name ?? '',
  school: value.school ?? '',
  department: value.department ?? '',
  grade: value.grade ?? '3학년',
  date: value.date ?? getToday(),
  marketingConsent: value.marketingConsent ?? false
});

function App() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [responses, setResponses] = useState<SurveyResponses | null>(null);
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessmentScores | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Load from localStorage on startup
  useEffect(() => {
    let savedInfoStr: string | null = null;
    let savedRespStr: string | null = null;
    let savedSelfAssessmentStr: string | null = null;
    let savedStatus: string | null = null;

    try {
      savedInfoStr = localStorage.getItem('student_info');
      savedRespStr = localStorage.getItem('survey_responses');
      savedSelfAssessmentStr = localStorage.getItem('self_assessment');
      savedStatus = localStorage.getItem('survey_completed');
    } catch (e) {
      console.error(e);
      return;
    }

    if (savedInfoStr) {
      try {
        setStudentInfo(normalizeStudentInfo(JSON.parse(savedInfoStr)));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedRespStr) {
      try {
        setResponses(JSON.parse(savedRespStr));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedSelfAssessmentStr) {
      try {
        setSelfAssessment(JSON.parse(savedSelfAssessmentStr));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedStatus === 'true' && savedInfoStr && savedRespStr && savedSelfAssessmentStr) {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = async (info: StudentInfo, selfScores: SelfAssessmentScores, resp: SurveyResponses) => {
    await createSubmission({
      studentInfo: info,
      selfAssessment: selfScores,
      responses: resp
    });
    setStudentInfo(info);
    setSelfAssessment(selfScores);
    setResponses(resp);
    setIsCompleted(true);
    try {
      localStorage.removeItem('student_info');
      localStorage.removeItem('survey_responses');
      localStorage.removeItem('self_assessment');
      localStorage.removeItem('survey_completed');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestart = () => {
    if (window.confirm('정말 처음으로 돌아가시겠습니까? 기존 답변은 유지되나 결과 화면을 다시 계산할 수 있습니다.')) {
      setIsCompleted(false);
      try {
        localStorage.removeItem('survey_completed');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const canShowResult = isCompleted && studentInfo && responses && selfAssessment;

  if (window.location.pathname.replace(/\/$/, '') === '/admin') {
    return (
      <main className="app-main">
        <AdminPage />
      </main>
    );
  }

  return (
    <main className="app-main">
      {canShowResult ? (
          <ResultPage
            studentInfo={studentInfo}
            responses={responses}
            selfAssessment={selfAssessment}
            onRestart={handleRestart}
            showFullReport={false}
          />
      ) : (
        <SurveyPage
          onComplete={handleComplete}
          savedInfo={studentInfo}
          savedResponses={responses}
          savedSelfAssessment={selfAssessment}
        />
      )}
    </main>
  );
}

export default App;
