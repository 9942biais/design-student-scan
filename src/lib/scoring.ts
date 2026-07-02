import questionsData from '../data/questions.json';

export interface Question {
  id: string;
  text: string;
  section: string;
  reverse: boolean;
  category?: string;
  indicator?: string;
  item_type?: string;
  orientation_tag?: string;
  career_environment?: string[];
  consistency_area?: string[];
}

export interface SurveyResponses {
  [questionId: string]: number; // 1 to 5
}

export interface ScoringResult {
  indicators: { [indicatorId: string]: number };
  categories: { [categoryId: string]: number };
  orientations: { [tagId: string]: number };
  careers: { [careerId: string]: number };
}

// Score mapping helper
export function getQuestionScore(q: Question, value: number): number {
  const rawValue = value || 3; // Default to neutral if missing
  if (q.reverse) {
    // 1 -> 100, 2 -> 75, 3 -> 50, 4 -> 25, 5 -> 0
    return (5 - rawValue) * 25;
  } else {
    // 1 -> 0, 2 -> 25, 3 -> 50, 4 -> 75, 5 -> 100
    return (rawValue - 1) * 25;
  }
}

export function calculateScores(responses: SurveyResponses): ScoringResult {
  const questionsMap = new Map<string, Question>();
  questionsData.questions.forEach((q: any) => {
    questionsMap.set(q.id, q as Question);
  });

  // 1. Calculate Indicator Scores (12 detailed indicators)
  const indicatorScores: { [indicatorId: string]: number } = {};
  const indicatorWeights: { [type: string]: number } = {
    behavior: 0.40,
    judgment: 0.25,
    avoidance: 0.25,
    confidence: 0.10
  };

  // Group questions by indicator
  const indicatorQuestions: { [indicatorId: string]: Question[] } = {};
  questionsData.questions.forEach((q: any) => {
    if (q.indicator) {
      if (!indicatorQuestions[q.indicator]) {
        indicatorQuestions[q.indicator] = [];
      }
      indicatorQuestions[q.indicator].push(q as Question);
    }
  });

  // Compute weighted sum for each indicator
  Object.keys(indicatorQuestions).forEach((indicatorId) => {
    const qList = indicatorQuestions[indicatorId];
    let totalScore = 0;
    qList.forEach((q) => {
      const val = responses[q.id] || 3;
      const score = getQuestionScore(q, val);
      const weight = indicatorWeights[q.item_type || ''] || 0;
      totalScore += score * weight;
    });
    indicatorScores[indicatorId] = totalScore;
  });

  // 2. Calculate Category Scores (4 main categories)
  const categoryScores: { [categoryId: string]: number } = {};
  questionsData.competency_categories.forEach((cat: any) => {
    let sum = 0;
    cat.indicators.forEach((indId: string) => {
      sum += indicatorScores[indId] || 0;
    });
    categoryScores[cat.id] = sum / cat.indicators.length;
  });

  // 3. Calculate Design Orientation Tag Scores (6 tags)
  const orientationScores: { [tagId: string]: number } = {};
  questionsData.orientation_tags.forEach((tag: any) => {
    // 3.1 Direct questions average (60% weight)
    let directSum = 0;
    tag.direct_questions.forEach((qId: string) => {
      const q = questionsMap.get(qId);
      const val = responses[qId] || 3;
      if (q) {
        directSum += getQuestionScore(q, val);
      }
    });
    const directAvg = directSum / tag.direct_questions.length;

    // 3.2 Related indicators average (40% weight)
    let relatedSum = 0;
    tag.related_indicators.forEach((indId: string) => {
      relatedSum += indicatorScores[indId] || 0;
    });
    const relatedAvg = relatedSum / tag.related_indicators.length;

    orientationScores[tag.id] = directAvg * 0.60 + relatedAvg * 0.40;
  });

  // 4. Calculate Career / Role Fit Scores (5 types)
  const careerScores: { [careerId: string]: number } = {};
  questionsData.career_environments.forEach((env: any) => {
    // 4.1 Direct career/role questions average (50% weight)
    let directSum = 0;
    env.direct_questions.forEach((qId: string) => {
      const q = questionsMap.get(qId);
      const val = responses[qId] || 3;
      if (q) {
        directSum += getQuestionScore(q, val);
      }
    });
    const directAvg = directSum / env.direct_questions.length;

    // 4.2 Related orientation tags average (30% weight)
    let tagsSum = 0;
    env.related_tags.forEach((tagId: string) => {
      tagsSum += orientationScores[tagId] || 0;
    });
    const tagsAvg = tagsSum / env.related_tags.length;

    // 4.3 Related detailed indicators average (20% weight)
    let indicatorsSum = 0;
    env.related_indicators.forEach((indId: string) => {
      indicatorsSum += indicatorScores[indId] || 0;
    });
    const indicatorsAvg = indicatorsSum / env.related_indicators.length;

    careerScores[env.id] = directAvg * 0.50 + tagsAvg * 0.30 + indicatorsAvg * 0.20;
  });

  return {
    indicators: indicatorScores,
    categories: categoryScores,
    orientations: orientationScores,
    careers: careerScores
  };
}
