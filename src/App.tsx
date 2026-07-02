import { useState, useEffect } from 'react';
import { SurveyPage, type StudentInfo } from './components/SurveyPage';
import { ResultPage } from './components/ResultPage';
import type { SurveyResponses } from './lib/scoring';

function App() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [responses, setResponses] = useState<SurveyResponses | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Load from localStorage on startup
  useEffect(() => {
    const savedInfoStr = localStorage.getItem('student_info');
    const savedRespStr = localStorage.getItem('survey_responses');
    const savedStatus = localStorage.getItem('survey_completed');

    if (savedInfoStr) {
      try {
        setStudentInfo(JSON.parse(savedInfoStr));
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
    if (savedStatus === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = (info: StudentInfo, resp: SurveyResponses) => {
    setStudentInfo(info);
    setResponses(resp);
    setIsCompleted(true);
    localStorage.setItem('survey_completed', 'true');
  };

  const handleRestart = () => {
    if (window.confirm('정말 처음으로 돌아가시겠습니까? 기존 답변은 유지되나 결과 화면을 다시 계산할 수 있습니다.')) {
      setIsCompleted(false);
      localStorage.removeItem('survey_completed');
    }
  };

  return (
    <main className="app-main">
      {!isCompleted ? (
        <SurveyPage
          onComplete={handleComplete}
          savedInfo={studentInfo}
          savedResponses={responses}
        />
      ) : (
        studentInfo && responses && (
          <ResultPage
            studentInfo={studentInfo}
            responses={responses}
            onRestart={handleRestart}
          />
        )
      )}
    </main>
  );
}

export default App;
