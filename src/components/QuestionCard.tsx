import React from 'react';
import type { Question } from '../lib/scoring';

interface QuestionCardProps {
  question: Question;
  value: number | undefined;
  onChange: (val: number) => void;
  index: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  index
}) => {
  const options = [
    { value: 1, label: '전혀 아니다' },
    { value: 2, label: '아니다' },
    { value: 3, label: '보통이다' },
    { value: 4, label: '그렇다' },
    { value: 5, label: '매우 그렇다' }
  ];

  return (
    <div className={`question-card ${value !== undefined ? 'answered' : ''}`}>
      <div className="question-header">
        <span className="question-number">Q{index.toString().padStart(2, '0')}</span>
        {question.reverse && <span className="badge badge-reverse">역채점</span>}
      </div>
      <p className="question-text">{question.text}</p>
      
      <div className="likert-container">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`likert-button val-${opt.value} ${isSelected ? 'active' : ''}`}
              onClick={() => onChange(opt.value)}
              aria-label={`${question.id}번 문항 ${opt.label} 선택`}
            >
              <div className="likert-dot" />
              <span className="likert-label">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
