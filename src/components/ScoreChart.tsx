import React from 'react';
import type { ScoringResult, SelfAssessmentScores } from '../lib/scoring';
import questionsData from '../data/questions.json';

interface ScoreChartProps {
  scores: ScoringResult;
  selfAssessment: SelfAssessmentScores;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({ scores, selfAssessment }) => {
  const { categories, indicators } = scores;
  const selfAssessmentAsPercent = (indicatorId: string) =>
    ((selfAssessment[indicatorId] || 0) / 10) * 100;
  const getSelfCategoryScore = (indicatorIds: string[]) => {
    if (indicatorIds.length === 0) return 0;
    const sum = indicatorIds.reduce((total, indicatorId) => total + selfAssessmentAsPercent(indicatorId), 0);
    return sum / indicatorIds.length;
  };

  // Compact radar: category scores are shown in the detailed indicator cards.
  const W = 320;
  const H = 320;
  const cx = W / 2;
  const cy = H / 2;
  const maxVal = 100;
  const maxR = 120;
  const axisLabels = [
    { id: 'thinking', label: '사고', x: cx, y: cy - maxR - 18, anchor: 'middle' as const },
    { id: 'making', label: '제작', x: cx + maxR + 14, y: cy + 4, anchor: 'start' as const },
    { id: 'communicating', label: '전달', x: cx, y: cy + maxR + 26, anchor: 'middle' as const },
    { id: 'working', label: '태도', x: cx - maxR - 14, y: cy + 4, anchor: 'end' as const },
  ];

  const getXY = (val: number, idx: number) => {
    const r = (val / maxVal) * maxR;
    if (idx === 0) return { x: cx, y: cy - r }; // top
    if (idx === 1) return { x: cx + r, y: cy }; // right
    if (idx === 2) return { x: cx, y: cy + r }; // bottom
    return { x: cx - r, y: cy }; // left
  };

  const gridPath = (v: number) => {
    const p = [0, 1, 2, 3].map(i => getXY(v, i));
    return `M${p[0].x} ${p[0].y} L${p[1].x} ${p[1].y} L${p[2].x} ${p[2].y} L${p[3].x} ${p[3].y}Z`;
  };

  const pts = [
    getXY(categories.thinking || 0, 0),
    getXY(categories.making || 0, 1),
    getXY(categories.communicating || 0, 2),
    getXY(categories.working || 0, 3),
  ];
  const selfCategoryScores = {
    thinking: getSelfCategoryScore(['problem_discovery', 'research_discovery', 'direction_translation']),
    making: getSelfCategoryScore(['aesthetic_sense', 'structural_organization', 'execution_quality']),
    communicating: getSelfCategoryScore(['portfolio_organization', 'explanation_flow', 'verbal_written_clarity']),
    working: getSelfCategoryScore(['self_direction', 'iteration_improvement', 'collaboration_responsibility']),
  };
  const selfPts = [
    getXY(selfCategoryScores.thinking, 0),
    getXY(selfCategoryScores.making, 1),
    getXY(selfCategoryScores.communicating, 2),
    getXY(selfCategoryScores.working, 3),
  ];

  const dataPath =
    `M${pts[0].x} ${pts[0].y} L${pts[1].x} ${pts[1].y} ` +
    `L${pts[2].x} ${pts[2].y} L${pts[3].x} ${pts[3].y}Z`;
  const selfDataPath =
    `M${selfPts[0].x} ${selfPts[0].y} L${selfPts[1].x} ${selfPts[1].y} ` +
    `L${selfPts[2].x} ${selfPts[2].y} L${selfPts[3].x} ${selfPts[3].y}Z`;

  return (
    <div className="charts-container">

      {/* 1. Radar Chart — 4 main categories */}
      <div className="chart-box radar-box">
        <h3 className="chart-title">4대 핵심 역량 카테고리</h3>
        <div className="score-legend" aria-label="점수 범례">
          <span><i className="legend-swatch actual" />진단 결과</span>
          <span><i className="legend-swatch self" />내가 생각한 능력치</span>
        </div>
        <div className="radar-svg-wrapper">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', height: 'auto' }}
            className="radar-svg"
          >
            <defs>
              <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,113,227,0.08)" />
                <stop offset="100%" stopColor="rgba(0,113,227,0.28)" />
              </radialGradient>
            </defs>

            {/* Grid diamonds */}
            {[25, 50, 75, 100].map(v => (
              <g key={v}>
                <path
                  className="radar-grid-line"
                  d={gridPath(v)}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeDasharray={v === 100 ? '0' : '4 4'}
                />
                <text
                  x={cx + 6}
                  y={cy - (v / maxVal) * maxR + 4}
                  className="radar-grid-value"
                  fill="rgba(255,255,255,0.35)"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Axis lines */}
            <line className="radar-axis-line" x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="rgba(255,255,255,0.12)" />
            <line className="radar-axis-line" x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="rgba(255,255,255,0.12)" />

            {/* Data polygon */}
            <path className="radar-data-path" d={dataPath} fill="url(#radarGrad)" stroke="var(--primary-color)" strokeWidth="2" />
            <path className="radar-self-path" d={selfDataPath} fill="rgba(255, 159, 10, 0.10)" stroke="#ff9f0a" strokeWidth="2" strokeDasharray="6 5" />

            {/* Data point dots */}
            {pts.map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="4.5"
                fill="#fff" stroke="var(--primary-color)" strokeWidth="2.5" />
            ))}
            {selfPts.map((pt, i) => (
              <circle key={`self-${i}`} cx={pt.x} cy={pt.y} r="3.8"
                fill="#fff8eb" stroke="#ff9f0a" strokeWidth="2" />
            ))}

            {axisLabels.map(axis => (
              <text
                key={axis.id}
                x={axis.x}
                y={axis.y}
                textAnchor={axis.anchor}
                className={`radar-axis-label cat-${axis.id}`}
              >
                {axis.label}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* 2. Detailed 12 indicators by category */}
      <div className="chart-box indicators-box">
        <h3 className="chart-title">12대 세부 역량 지표</h3>
        <div className="score-legend indicator-legend" aria-label="점수 범례">
          <span><i className="legend-swatch actual" />진단 결과</span>
          <span><i className="legend-swatch self" />내가 생각한 능력치</span>
        </div>
        <div className="indicators-grid-layout">
          {questionsData.competency_categories.map((cat: any) => {
            const catScore = Math.round(categories[cat.id] || 0);
            return (
              <div key={cat.id} className="indicator-cat-group">
                <h4 className="indicator-cat-header">
                  <span>{cat.ko_name}</span>
                  <span className="cat-badge">{catScore}점</span>
                </h4>
                <div className="indicator-bars-list">
                  {cat.indicators.map((indId: string) => {
                    const indData = questionsData.indicators.find((i: any) => i.id === indId);
                    const score = Math.round(indicators[indId] || 0);
                    const selfScore = Math.round(selfAssessmentAsPercent(indId));
                    return (
                      <div key={indId} className="indicator-bar-item">
                        <div className="indicator-bar-label">
                          <span className="ind-name">{indData?.name}</span>
                          <span className="ind-val">{score}점 / 자기 {selfAssessment[indId] || 0}</span>
                        </div>
                        <div className="ind-progress-bg comparison">
                          <div
                            className={`ind-progress-fill cat-${cat.id}`}
                            style={{ width: `${score}%` }}
                          />
                          <span
                            className="self-score-marker"
                            style={{ left: `${selfScore}%` }}
                            aria-label={`내가 생각한 ${indData?.name} ${selfAssessment[indId] || 0}점`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
