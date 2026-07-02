import React from 'react';
import type { ScoringResult } from '../lib/scoring';
import questionsData from '../data/questions.json';

interface ScoreChartProps {
  scores: ScoringResult;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  const { categories, indicators } = scores;

  // Radar Chart Calculations for 4 Categories
  // Top: Thinking, Right: Making, Bottom: Communicating, Left: Working
  const width = 400;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2;
  const maxVal = 100;
  const maxR = 100; // max radius for score 100

  const getCoordinates = (val: number, angleIndex: number) => {
    // angleIndex: 0 = Top, 1 = Right, 2 = Bottom, 3 = Left
    const r = (val / maxVal) * maxR;
    if (angleIndex === 0) return { x: cx, y: cy - r }; // Top
    if (angleIndex === 1) return { x: cx + r, y: cy }; // Right
    if (angleIndex === 2) return { x: cx, y: cy + r }; // Bottom
    return { x: cx - r, y: cy };                      // Left
  };

  const getGridPath = (val: number) => {
    const p0 = getCoordinates(val, 0);
    const p1 = getCoordinates(val, 1);
    const p2 = getCoordinates(val, 2);
    const p3 = getCoordinates(val, 3);
    return `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
  };

  const scorePoints = [
    getCoordinates(categories.thinking || 0, 0),
    getCoordinates(categories.making || 0, 1),
    getCoordinates(categories.communicating || 0, 2),
    getCoordinates(categories.working || 0, 3)
  ];

  const dataPath = `M ${scorePoints[0].x} ${scorePoints[0].y} ` +
    `L ${scorePoints[1].x} ${scorePoints[1].y} ` +
    `L ${scorePoints[2].x} ${scorePoints[2].y} ` +
    `L ${scorePoints[3].x} ${scorePoints[3].y} Z`;

  // Helper to format category score
  const getCatScore = (id: string) => Math.round(categories[id] || 0);

  return (
    <div className="charts-container">
      {/* 1. Radar Chart (Diamond) for 4 Main Categories */}
      <div className="chart-box radar-box">
        <h3 className="chart-title">4대 핵심 역량 카테고리</h3>
        <div className="radar-svg-wrapper">
          <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', maxWidth: '360px' }} className="radar-svg">
            <defs>
              <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.15)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.45)" />
              </radialGradient>
            </defs>

            {/* Grid Circles / Diamonds */}
            {[25, 50, 75, 100].map((v) => (
              <g key={v}>
                <path
                  d={getGridPath(v)}
                  className="radar-grid-line"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeDasharray={v === 100 ? '0' : '4 4'}
                />
                {/* Score guide number */}
                <text
                  x={cx + 5}
                  y={cy - (v / maxVal) * maxR + 4}
                  className="radar-grid-text"
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="9"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Axis Lines */}
            <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="rgba(255, 255, 255, 0.15)" />
            <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="rgba(255, 255, 255, 0.15)" />

            {/* Data Polygon Fill */}
            <path
              d={dataPath}
              fill="url(#radarGrad)"
              stroke="var(--primary-color)"
              strokeWidth="2"
              className="radar-data-path"
            />

            {/* Data Points */}
            {scorePoints.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#ffffff"
                stroke="var(--primary-color)"
                strokeWidth="2.5"
              />
            ))}

            {/* Outer Labels */}
            {/* Thinking */}
            <text x={cx} y={cy - maxR - 15} textAnchor="middle" className="radar-label radar-label-top" fill="#ffffff" fontWeight="600">
              사고 (Thinking) <tspan fill="var(--primary-light)" fontWeight="700"> {getCatScore('thinking')}점</tspan>
            </text>
            {/* Making */}
            <text x={cx + maxR + 12} y={cy + 4} textAnchor="start" className="radar-label radar-label-right" fill="#ffffff" fontWeight="600">
              제작 (Making) <tspan fill="var(--primary-light)" fontWeight="700">{getCatScore('making')}점</tspan>
            </text>
            {/* Communicating */}
            <text x={cx} y={cy + maxR + 25} textAnchor="middle" className="radar-label radar-label-bottom" fill="#ffffff" fontWeight="600">
              전달 (Communicating) <tspan fill="var(--primary-light)" fontWeight="700">{getCatScore('communicating')}점</tspan>
            </text>
            {/* Working */}
            <text x={cx - maxR - 12} y={cy + 4} textAnchor="end" className="radar-label radar-label-left" fill="#ffffff" fontWeight="600">
              태도 (Working) <tspan fill="var(--primary-light)" fontWeight="700">{getCatScore('working')}점</tspan>
            </text>
          </svg>
        </div>
      </div>

      {/* 2. Detailed 12 Indicators organized by Category */}
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
                    const indData = questionsData.indicators.find(i => i.id === indId);
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
