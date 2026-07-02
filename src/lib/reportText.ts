import type { ScoringResult } from './scoring';
import questionsData from '../data/questions.json';

export interface ReportFeedback {
  summary: string;
  strengths: { id: string; name: string; desc: string }[];
  checks: { id: string; name: string; desc: string }[];
  careerFitText: string;
  portfolioDirections: string[];
  consultingPriorities: string[];
}

export const CONSISTENCY_GUIDANCE: { [ruleId: string]: string } = {
  P01: "기획 단계를 중요하게 여긴다고 했으나 실제로는 바로 제작에 들어가는 경향이 있습니다. 실제 프로젝트 시작 시 문제 정의 단계를 거치는지 확인하고 포트폴리오에 명시하게 하세요.",
  P02: "자료 조사를 중시하지만 일정이 부족하면 생략한다고 답했습니다. 시간이 부족할 때 조사의 퀄리티를 유지하는 방식이나 리서치가 생략된 채 본인의 감각만으로 진행된 프로젝트가 있는지 확인이 필요합니다.",
  P03: "의견을 반영해 방향을 유연하게 수정한다고 했으나 동시에 방향 전환이 프로젝트를 불안정하게 만든다고 느낍니다. 방향 수정 과정에서 겪은 어려움이나 소통 방식을 확인하세요.",
  P04: "감각적 요소를 세심하게 살피지만 마무리는 시간에 쫓겨 막판에 다듬는 경향이 있습니다. 포트폴리오 상의 디테일과 마감 퀄리티가 고르게 유지되고 있는지 점검해야 합니다.",
  P05: "요소 간 관계와 순서를 정리하지만 개별 파트가 잘 되면 전체 구조는 무관하다는 인식이 섞여 있습니다. 포트폴리오 내 개별 프로젝트가 유기적인 구조를 갖추고 있는지 점검하세요.",
  P06: "마감 상태를 꼼꼼히 확인한다고 했으나 시간이 부족하면 큰 방향성만 보여주는 것으로 타협합니다. 포트폴리오에서 완성도가 미흡한 채 미완성으로 남은 영역이 있는지 체크하세요.",
  P07: "목적에 맞춰 작업을 고른다고 답하면서도 가능한 한 많은 작업을 보여주려는 욕심이 있습니다. 포트폴리오의 과도한 양을 덜어내고 핵심 프로젝트 위주로 선별하는 컨설팅이 필요합니다.",
  P08: "과정 중심의 설명을 중시하면서도 결과물만 좋으면 과정 설명은 생략해도 된다는 인식이 공존합니다. 포트폴리오에서 '왜 만들었는지'에 대한 맥락과 과정 설명이 생략되지 않았는지 점검하세요.",
  P09: "설명 전 핵심 문장을 정리한다고 했지만 생각을 말이나 글로 표현하는 데 근본적인 어려움을 겪고 있습니다. 포트폴리오 텍스트 작성을 위한 키워드 요약 및 스피치 훈련이 도움될 수 있습니다.",
  P10: "주도적으로 일을 찾아서 한다고 했으나 명확한 지시가 없으면 멈추는 경향이 있습니다. 가이드라인이 명확하지 않았던 졸업작품이나 개인 프로젝트에서 어떤 태도를 취했는지 확인해 보세요.",
  P11: "처음 만든 것을 여러 번 고치며 발전시킨다고 했으나 자신이 많이 고민해 만든 결과물은 피드백을 받아도 바꾸기 싫어합니다. 피드백을 수용하여 개선된 구체적 사례가 포트폴리오에 드러나는지 체크하세요.",
  P12: "내 역할과 마감을 지키려 노력하지만 내 파트가 끝나면 다른 영역에는 관여하지 않으려 합니다. 협업 프로젝트에서 자신의 파트 외에 팀 전체의 완성도를 높이기 위해 기여한 부분이 있는지 확인하세요.",
  P13: "작업 전 자료 조사를 수행한다고 했으나 조사 없이 바로 만들 때 작업이 더 잘 풀린다고 느낍니다. 실제 프로젝트 과정에서 리서치가 형식적으로 진행되고 있지는 않은지 조사 결과가 설계에 실질적으로 반영되는지 확인하세요.",
  P14: "작업이 왜 그런 과정으로 발전했는지 설명하는 것을 중요하게 생각한다고 했으나 결과물이 보기 좋으면 과정은 생략해도 된다고 답했습니다. 포트폴리오의 비주얼에 비해 논리적 전개가 빈약하거나 인과관계가 부족한 부분이 있는지 점검하세요.",
  P15: "피드백이 결과물을 더 낫게 만든다고 생각하지만 결국 본인의 첫 방식을 고수하는 편입니다. 타인의 피드백을 수용하고 수정하는 과정을 포트폴리오 프로세스 페이지에 어떻게 기술했는지 확인하세요.",
  P16: "전체 결과물의 완성도를 중시한다고 답했으나 자신의 역할이 끝나면 관여하지 않는 편입니다. 공동 작업에서 발생한 한계나 문제 상황을 극복하기 위해 노력한 경험을 검증하세요."
};

const CATEGORY_KO_NAMES: { [key: string]: string } = {
  thinking: "사고와 방향 설정(Thinking)",
  making: "제작과 구현(Making)",
  communicating: "정리와 전달(Communicating)",
  working: "작업 태도와 습관(Working)"
};

const ORIENTATION_DIRECTIONS: { [key: string]: string[] } = {
  idea_generator: [
    "독창적인 컨셉 도출 과정을 보여주는 초기 스케치, 아이디어 맵, 대안 검토 과정을 흥미롭게 연출하세요.",
    "아이디어의 참신함이 실제 디자인 마감이나 구체적인 세부 사양(Detail)으로 어떻게 구현되었는지 완성도 검증 페이지를 보완해야 합니다."
  ],
  process_builder: [
    "포트폴리오에 문제 해결의 흐름(배경-조사-정의-해결-결과)이 논리적으로 인과관계를 갖추도록 레이아웃을 잡으세요.",
    "설명이 너무 길어지지 않도록 긴 텍스트는 지양하고, 전체 디자인 여정을 다이어그램이나 핵심 인포그래픽으로 요약해 보여주세요."
  ],
  visual_stylist: [
    "시각적 감각과 스타일 강점이 돋보이는 대표 이미지를 포트폴리오 전면과 최상단에 배치하세요.",
    "단순히 '예쁘게 표현한 것'을 넘어, 이 조형적 스타일과 컬러 피커 등을 선택한 디자인 기획 근거를 짤막하게 서술하세요."
  ],
  tool_operator: [
    "3D 모델링, 정교한 그래픽, 모션 그래픽, 프로토타입 구현 등 고도화된 툴 활용 능력을 근접 뷰나 클로즈업 뷰로 증명하세요.",
    "도구의 숙련도를 드러내되, 기획 의도와 기술의 결합을 설득하는 '왜 이 제작 방식을 썼는지'에 대한 서술을 덧붙이세요."
  ],
  experience_designer: [
    "사용자의 맥락(Journey), 사용 흐름상의 불편함 해결, 비포/애프터 비교 등 사용자 경험(UX) 관점의 개선 결과에 중점을 둡니다.",
    "실제 타겟 사용자를 통한 검증 피드백 및 프로토타입 테스트로 최종 수정한 스토리를 포트폴리오 구성에 포함하세요."
  ],
  presentation_editor: [
    "포트폴리오 문서의 그리드, 타이포그래피, 이미지 여백 구성 자체가 본인의 편집 완성도를 증명하므로 레이아웃 완성도에 심혈을 기울이세요.",
    "정리 실력이 돋보이는 반면, 포트폴리오가 너무 획일화되거나 개성이 묻히지 않도록 메인 프로젝트 페이지에서는 강약을 확실히 조절하세요."
  ]
};

export function generateReportFeedback(scores: ScoringResult): ReportFeedback {
  // 1. Find strongest and weakest categories
  let strongestCat = 'thinking';
  let weakestCat = 'thinking';
  let maxCatScore = -1;
  let minCatScore = 101;

  Object.entries(scores.categories).forEach(([catId, score]) => {
    if (score > maxCatScore) {
      maxCatScore = score;
      strongestCat = catId;
    }
    if (score < minCatScore) {
      minCatScore = score;
      weakestCat = catId;
    }
  });

  // 2. Rank indicators for Strengths & Checks
  const sortedIndicators = Object.entries(scores.indicators)
    .map(([id, score]) => {
      const indData = questionsData.indicators.find(i => i.id === id);
      return {
        id,
        score,
        name: indData?.name || id,
        desc: indData?.description || ''
      };
    })
    .sort((a, b) => b.score - a.score);

  const strengths = sortedIndicators.slice(0, 3);
  const checks = sortedIndicators.slice(-3).reverse(); // Pick lowest 3, show in ascending order (lowest first)

  // 3. Diagnostic Summary Generation
  const strongestKo = CATEGORY_KO_NAMES[strongestCat];
  const weakestKo = CATEGORY_KO_NAMES[weakestCat];
  const topIndNames = strengths.slice(0, 2).map(s => s.name).join(', ');
  const bottomIndNames = checks.slice(0, 2).map(c => c.name).join(', ');

  let summary = `본 진단 결과 학생은 ${strongestKo} 영역(특히 ${topIndNames})에서 높은 성향을 보이고 있습니다. `;
  if (strongestCat === weakestCat) {
    summary += `전반적인 역량이 균형을 이루고 있으나 포트폴리오 전반에 걸쳐 본인의 개성을 입증할 구체적인 프로젝트 마무리가 중요합니다.`;
  } else {
    summary += `반면 ${weakestKo} 영역(특히 ${bottomIndNames})이 상대적으로 약하게 나타나 포트폴리오 컨설팅 시 이 영역을 집중 보완하고 검증하는 것이 필요합니다.`;
  }

  // 4. Determine primary orientation tag for portfolio directions
  const sortedOrientations = Object.entries(scores.orientations)
    .sort((a, b) => b[1] - a[1]);
  const topTagId = sortedOrientations[0][0];
  const topTagNameKo = questionsData.orientation_tags.find(t => t.id === topTagId)?.ko_name || '';

  // Collect portfolio directions based on top 2 orientations
  const portfolioDirections: string[] = [];
  const top2Tags = sortedOrientations.slice(0, 2);
  top2Tags.forEach(([tagId]) => {
    const dirs = ORIENTATION_DIRECTIONS[tagId] || [];
    dirs.forEach(d => portfolioDirections.push(d));
  });

  // 5. Consulting Priorities based on weakest category
  const consultingPriorities: string[] = [];
  if (weakestCat === 'thinking') {
    consultingPriorities.push("포트폴리오 프로젝트의 첫 단추인 '기획 의도'와 '진짜 문제 정의'가 충분히 설득력 있게 적혀 있는지 점검합니다.");
    consultingPriorities.push("단순히 예쁘게 디자인된 작업물 나열을 탈피하여, 자료 조사(Research) 결과가 최종 디자인안에 도출되기까지의 논리적 징검다리를 확인합니다.");
  } else if (weakestCat === 'making') {
    consultingPriorities.push("디자인 마감도(디테일, 그리드 밀도, 폰트 조화, 그래픽 완성도)가 학부 고학년 수준에 부합하는지 꼼꼼히 점검합니다.");
    consultingPriorities.push("아이디어에 비해 조형적 마무리가 약하다면 완성도 높은 클로즈업 컷을 개발하거나 메인 비주얼을 대대적으로 리터칭하도록 가이드합니다.");
  } else if (weakestCat === 'communicating') {
    consultingPriorities.push("포트폴리오의 전체 페이지 수 조절 및 각 프로젝트의 순서(가장 자신 있고 기획력 있는 작업을 1순위 배치)를 우선 재배치합니다.");
    consultingPriorities.push("디자인 프로세스 전개가 너무 복잡하거나 장황한 경우 말과 글을 단조롭고 명확하게 수정하여 초독자의 이해도를 높입니다.");
  } else if (weakestCat === 'working') {
    consultingPriorities.push("피드백을 받아들여 실제로 작업을 수정하고 개선한 과정을 포트폴리오에 적극 반영하여 '성장 가능성'과 '오픈 마인드'를 부각시킵니다.");
    consultingPriorities.push("협업 프로젝트의 경우 전체 포트폴리오 안에서 학생의 실질적인 역할 범위와 기여도가 어디서부터 어디까지인지를 명료하게 명시하게 합니다.");
  }

  // 6. Possible Career / Role Fit Text
  const sortedCareers = Object.entries(scores.careers)
    .sort((a, b) => b[1] - a[1]);
  const topCareerId = sortedCareers[0][0];
  const topCareerData = questionsData.career_environments.find(c => c.id === topCareerId);
  const topCareerName = topCareerData?.name || '';
  const topCareerDesc = topCareerData?.description || '';

  const careerFitText = `이 학생은 현재 ${topCareerName}(${topCareerDesc})에 가장 높은 적합 가능성을 보여주고 있습니다. ` +
    `다만 이 결과는 확정 추천이 아니라 자기보고 기반의 진로/역할 가설이므로, 컨설팅 중에는 해당 방향에 필요한 핵심 성향(예: ${topTagNameKo})과 포트폴리오 구조가 부합하는지 실제 작업 샘플을 대조하며 확인하시기 바랍니다.`;

  return {
    summary,
    strengths,
    checks,
    careerFitText,
    portfolioDirections,
    consultingPriorities
  };
}
