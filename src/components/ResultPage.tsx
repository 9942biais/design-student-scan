import React, { useState } from 'react';
import { type SurveyResponses, calculateScores } from '../lib/scoring';
import type { StudentInfo } from './SurveyPage';
import { checkConsistency } from '../lib/consistency';
import { generateReportFeedback, CONSISTENCY_GUIDANCE } from '../lib/reportText';
import { ScoreChart } from './ScoreChart';
import { PdfExportButton } from './PdfExportButton';
import questionsData from '../data/questions.json';

const CONSULTANT_PIN = import.meta.env.VITE_CONSULTANT_PIN || '6969';
const CONSULTANT_SESSION_KEY = 'designer_inbody_consultant_mode';

interface ResultPageProps {
  studentInfo: StudentInfo;
  responses: SurveyResponses;
  onRestart: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  studentInfo,
  responses,
  onRestart
}) => {
  const [isConsultantMode, setIsConsultantMode] = useState(() => {
    try {
      return sessionStorage.getItem(CONSULTANT_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [cornerTapCount, setCornerTapCount] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // 1. Calculate all scores
  const scores = calculateScores(responses);

  // 2. Perform consistency check
  const consistencyAlerts = checkConsistency(responses);

  // 3. Generate dynamic feedback and interpretations
  const feedback = generateReportFeedback(scores);

  // Sort orientations
  const sortedOrientations = Object.entries(scores.orientations)
    .map(([id, score]) => {
      const tagData = questionsData.orientation_tags.find(t => t.id === id);
      return {
        id,
        score: Math.round(score),
        name: tagData?.name || id,
        koName: tagData?.ko_name || id,
        desc: tagData?.description || ''
      };
    })
    .sort((a, b) => b.score - a.score);

  // Sort career fits
  const sortedCareers = Object.entries(scores.careers)
    .map(([id, score]) => {
      const envData = questionsData.career_environments.find(e => e.id === id);
      return {
        id,
        score: Math.round(score),
        name: envData?.name || id,
        desc: envData?.description || ''
      };
    })
    .sort((a, b) => b.score - a.score);

  const handleSecretTrigger = () => {
    const nextCount = cornerTapCount + 1;
    setCornerTapCount(nextCount);

    window.setTimeout(() => {
      setCornerTapCount(0);
    }, 3000);

    if (nextCount >= 2) {
      setCornerTapCount(0);
      setPinInput('');
      setPinError('');
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pinInput.trim() !== CONSULTANT_PIN) {
      setPinError('PIN 번호가 일치하지 않습니다.');
      return;
    }

    setIsConsultantMode(true);
    setShowPinModal(false);
    setPinInput('');
    setPinError('');
    try {
      sessionStorage.setItem(CONSULTANT_SESSION_KEY, 'true');
    } catch {
      // sessionStorage may be unavailable in some browsing modes.
    }
  };

  return (
    <div className="result-container fade-in">
      {/* Action Header (Hidden in Print) */}
      <div className="action-header print-hide">
        <button type="button" onClick={onRestart} className="btn btn-secondary">
          처음으로
        </button>
        {isConsultantMode && (
          <span className="consultant-mode-badge">컨설턴트 모드</span>
        )}
        <PdfExportButton studentName={studentInfo.name} />
      </div>

      {/* --- REPORT ONE-PAGE CONTAINER --- */}
      <div className="report-paper">
        {/* Report Header */}
        <header className="report-header">
          <div className="report-title-section">
            <h1 className="report-title">{questionsData.meta.name} 결과 진단표</h1>
            <p className="report-subtitle">디자인 학부생 포트폴리오 컨설팅용 사전 자기진단 리포트</p>
          </div>
          <div className="report-meta-box">
            <div className="meta-row">
              <span className="meta-label">이름</span>
              <span className="meta-val">{studentInfo.name}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">소속</span>
              <span className="meta-val">{studentInfo.school} / {studentInfo.department}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">학년</span>
              <span className="meta-val">{studentInfo.grade}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">작성일</span>
              <span className="meta-val">{studentInfo.date}</span>
            </div>
          </div>
        </header>

        {/* 1. Diagnostic Summary Banner */}
        {isConsultantMode && (
          <section className="report-section summary-section">
            <h2 className="report-section-title">종합 결과 요약 (Diagnostic Summary)</h2>
            <div className="glass-panel summary-panel">
              <p className="summary-text" dangerouslySetInnerHTML={{ __html: feedback.summary }} />
            </div>
          </section>
        )}

        {/* 2. Charts Section (Radar & Indicators) */}
        <section className="report-section charts-section">
          <ScoreChart scores={scores} />
        </section>

        {/* 3. Strengths & Areas to Check (Two-column) */}
        {isConsultantMode && (
          <section className="report-section two-col-section">
            <div className="col-box strengths-box">
              <h3 className="section-col-title text-success">강점 후보 (Strength Candidates)</h3>
              <ul className="indicator-list">
                {feedback.strengths.map((item, idx) => (
                  <li key={item.id} className="indicator-list-item">
                    <span className="badge badge-success">{idx + 1}</span>
                    <div className="ind-desc-box">
                      <span className="ind-name-text">{item.name} ({Math.round(scores.indicators[item.id])}점)</span>
                      <p className="ind-desc-p">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-box checks-box">
              <h3 className="section-col-title text-warning">체크 필요 영역 (Areas to Check)</h3>
              <ul className="indicator-list">
                {feedback.checks.map((item, idx) => (
                  <li key={item.id} className="indicator-list-item">
                    <span className="badge badge-warning">{idx + 1}</span>
                    <div className="ind-desc-box">
                      <span className="ind-name-text">{item.name} ({Math.round(scores.indicators[item.id])}점)</span>
                      <p className="ind-desc-p">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 4. Design Orientation (6 tags list) */}
        <section className="report-section orientations-section">
          <h2 className="report-section-title">디자인 성향 프로파일 (Design Orientation)</h2>
          <div className="orientations-wrapper">
            <div className="top-tags-box">
              <span className="label-prefix">주 성향 태그:</span>
              {sortedOrientations.slice(0, 2).map((tag, idx) => (
                <span key={tag.id} className={`top-tag-badge idx-${idx}`}>
                  {tag.koName} ({tag.score}점)
                </span>
              ))}
            </div>
            <div className="orientations-grid">
              {sortedOrientations.map((tag) => (
                <div key={tag.id} className="orientation-grid-item">
                  <div className="item-header">
                    <span className="tag-ko">{tag.koName}</span>
                    <span className="tag-score">{tag.score}점</span>
                  </div>
                  <div className="tag-progress-bg">
                    <div className="tag-progress-fill" style={{ width: `${tag.score}%` }} />
                  </div>
                  <p className="tag-desc-small">{tag.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Career / Role Fit Section */}
        <section className="report-section career-section">
          <h2 className="report-section-title">진로/역할 적합 가능성 (Career / Role Fit)</h2>
          <div className="career-wrapper">
            <p className="career-fit-eval">{feedback.careerFitText}</p>
            <div className="career-bars-grid">
              {sortedCareers.map((car, idx) => (
                <div key={car.id} className={`career-bar-item rank-${idx + 1}`}>
                  <div className="career-label-row">
                    <span className="career-name">{car.name}</span>
                    <span className="career-score">{car.score}점</span>
                  </div>
                  <div className="career-progress-bg">
                    <div className="career-progress-fill" style={{ width: `${car.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Portfolio Development Directions & Consulting Priorities (Two-column) */}
        {isConsultantMode && (
          <section className="report-section two-col-section">
            <div className="col-box directions-box">
              <h3 className="section-col-title text-primary">추천 포트폴리오 전개 방향</h3>
              <ul className="bullet-list">
                {feedback.portfolioDirections.map((dir, idx) => (
                  <li key={idx}>{dir}</li>
                ))}
              </ul>
            </div>

            <div className="col-box priorities-box">
              <h3 className="section-col-title text-accent">컨설팅 우선순위 체크리스트</h3>
              <ul className="bullet-list">
                {feedback.consultingPriorities.map((prior, idx) => (
                  <li key={idx}>{prior}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 7. Consistency Alerts (OnePage print-friendly alert) */}
        {isConsultantMode && (
          <section className="report-section consistency-section">
            <h2 className="report-section-title">응답 일관성 경고 (Response Consistency Alerts)</h2>
            {consistencyAlerts.length === 0 ? (
              <div className="consistency-box success">
                <span className="success-icon">✓</span> 응답의 일관성과 신뢰도가 우수합니다. 상충되는 응답 패턴이 존재하지 않습니다.
              </div>
            ) : (
              <div className="consistency-alerts-list">
                {consistencyAlerts.map((alert) => (
                  <div key={alert.id} className="consistency-alert-item">
                    <div className="alert-badge">일관성 의심 ({alert.area})</div>
                    <div className="alert-content-box">
                      <p className="alert-message-text">“{alert.message}”</p>
                      <div className="alert-q-details">
                        <div>• {alert.questionA}번 답변: <span className="text-warning font-semibold">{alert.valueA}점</span> (문항: {alert.questionAText})</div>
                        <div>• {alert.questionB}번 답변: <span className="text-warning font-semibold">{alert.valueB}점</span> (문항: {alert.questionBText})</div>
                      </div>
                      <div className="consulting-guide-tip">
                        <strong>컨설팅 권장 가이드:</strong> {CONSISTENCY_GUIDANCE[alert.id] || "두 질문의 응답 배경과 실제 수행 능력을 점검하세요."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Disclaimer / Footer */}
        <footer className="report-footer">
          <p className="disclaimer-text">{questionsData.meta.disclaimer}</p>
          <p className="copyright-text">© {new Date().getFullYear()} Designer InBody Standard Scan. All rights reserved.</p>
        </footer>
      </div>

      <button
        type="button"
        className="consultant-secret-trigger print-hide"
        aria-label="컨설턴트 모드 열기"
        onDoubleClick={handleSecretTrigger}
        onTouchEnd={handleSecretTrigger}
      />

      {showPinModal && (
        <div className="pin-modal-backdrop print-hide" role="presentation">
          <form className="pin-modal" onSubmit={handlePinSubmit}>
            <h2 className="pin-modal-title">컨설턴트 모드</h2>
            <p className="pin-modal-desc">전체 결과지를 보려면 PIN 번호를 입력하세요.</p>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              className="pin-input"
              value={pinInput}
              onChange={(event) => {
                setPinInput(event.target.value);
                setPinError('');
              }}
              aria-label="컨설턴트 PIN 번호"
            />
            {pinError && <p className="pin-error">{pinError}</p>}
            <div className="pin-modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowPinModal(false);
                  setPinInput('');
                  setPinError('');
                }}
              >
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                확인
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
