import React from 'react';
import type { ScoringResult } from '../lib/scoring';
import questionsData from '../data/questions.json';

interface ScoreChartProps {
  scores: ScoringResult;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  const { categories, indicators } = scores;

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

  const dataPath =
    `M${pts[0].x} ${pts[0].y} L${pts[1].x} ${pts[1].y} ` +
    `L${pts[2].x} ${pts[2].y} L${pts[3].x} ${pts[3].y}Z`;

  return (
    <div className="charts-container">

      {/* 1. Radar Chart — 4 main categories */}
      <div className="chart-box radar-box">
        <h3 className="chart-title">4대 핵심 역량 카테고리</h3>
        <div className="radar-svg-wrapper">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', height: 'auto' }}
            className="radar-svg"
          >
            <defs>
              <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(99,102,241,0.12)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.42)" />
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

            {/* Data point dots */}
            {pts.map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="4.5"
                fill="#fff" stroke="var(--primary-color)" strokeWidth="2.5" />
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
                    return (
                      <div key={indId} className="indicator-bar-item">
                        <div className="indicator-bar-label">
                          <span className="ind-name">{indData?.name}</span>
                          <span className="ind-val">{score}점</span>
                        </div>
                        <div className="ind-progress-bg">
                          <div
                            className={`ind-progress-fill cat-${cat.id}`}
                            style={{ width: `${score}%` }}
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
