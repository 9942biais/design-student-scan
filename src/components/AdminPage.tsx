import React, { useEffect, useState } from 'react';
import {
  fetchSubmission,
  fetchSubmissions,
  loginAdmin,
  logoutAdmin,
  type SubmissionDetail,
  type SubmissionSummary
} from '../lib/api';
import { ResultPage } from './ResultPage';
import type { StudentInfo } from './SurveyPage';

export const AdminPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSubmissions = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '관리자 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSubmissions();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await loginAdmin(password);
      setPassword('');
      await loadSubmissions();
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin().catch(() => undefined);
    setIsAuthenticated(false);
    setSelectedSubmission(null);
    setSubmissions([]);
    setPassword('');
  };

  const handleSelect = async (publicId: string) => {
    setIsLoading(true);
    setError('');
    try {
      setSelectedSubmission(await fetchSubmission(publicId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '상세 결과를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-shell">
        <form className="admin-login" onSubmit={handleLogin}>
          <h1>관리자 로그인</h1>
          <p>응답자별 전체 결과지를 확인하려면 관리자 비밀번호를 입력하세요.</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="관리자 비밀번호"
            autoFocus
          />
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    );
  }

  if (selectedSubmission) {
    const studentInfo: StudentInfo = {
      email: selectedSubmission.email,
      name: selectedSubmission.name,
      school: selectedSubmission.school,
      department: selectedSubmission.department,
      grade: selectedSubmission.grade,
      date: selectedSubmission.writtenDate,
      marketingConsent: true
    };

    return (
      <ResultPage
        studentInfo={studentInfo}
        responses={selectedSubmission.responses}
        selfAssessment={selectedSubmission.selfAssessment}
        showFullReport
        onRestart={() => setSelectedSubmission(null)}
      />
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-panel">
        <header className="admin-header">
          <div>
            <h1>자가진단 응답 관리</h1>
            <p>{submissions.length}개의 제출 결과가 저장되어 있습니다.</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            로그아웃
          </button>
        </header>

        {error && <div className="admin-error">{error}</div>}
        {isLoading && <div className="admin-muted">불러오는 중...</div>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>제출일</th>
                <th>이름</th>
                <th>이메일</th>
                <th>소속</th>
                <th>작성일</th>
                <th>결과지</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.publicId}>
                  <td>{submission.createdAt}</td>
                  <td>{submission.name}</td>
                  <td>{submission.email}</td>
                  <td>{submission.school} / {submission.department} / {submission.grade}</td>
                  <td>{submission.writtenDate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary admin-small-btn"
                      onClick={() => void handleSelect(submission.publicId)}
                    >
                      보기
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="admin-empty">아직 제출된 응답이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
