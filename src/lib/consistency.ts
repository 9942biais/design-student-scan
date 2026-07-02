import questionsData from '../data/questions.json';
import type { SurveyResponses } from './scoring';

export interface ConsistencyAlert {
  id: string;
  questionA: string;
  questionB: string;
  questionAText: string;
  questionBText: string;
  area: string;
  message: string;
  valueA: number;
  valueB: number;
}

export function checkConsistency(responses: SurveyResponses): ConsistencyAlert[] {
  const alerts: ConsistencyAlert[] = [];
  const questionsMap = new Map<string, string>();
  questionsData.questions.forEach((q: any) => {
    questionsMap.set(q.id, q.text);
  });

  questionsData.consistency_rules.forEach((rule: any) => {
    const valA = responses[rule.question_a] || 0;
    const valB = responses[rule.question_b] || 0;

    // Trigger if both are >= 4
    if (valA >= 4 && valB >= 4) {
      alerts.push({
        id: rule.id,
        questionA: rule.question_a,
        questionB: rule.question_b,
        questionAText: questionsMap.get(rule.question_a) || '',
        questionBText: questionsMap.get(rule.question_b) || '',
        area: rule.area,
        message: rule.message,
        valueA: valA,
        valueB: valB
      });
    }
  });

  return alerts;
}
