# Designer InBody Standard Scan v1.0.2

## 1. Overview

**Designer InBody Standard Scan v1.0.2** is a self-diagnostic pre-consulting tool for 3rd- and 4th-year undergraduate design students.

It is designed to help portfolio consultants quickly understand a student's:

- design competency profile
- working tendencies
- design orientation
- possible career/role fit
- portfolio development direction
- response consistency issues

This tool does **not** directly evaluate the student's portfolio quality.  
It does **not** determine whether a student is good or bad at design.  
It provides an initial hypothesis for portfolio consulting.

The result should be interpreted as a **self-reported pre-consulting profile**, not as a final evaluation.

---

## 2. Version

```yaml
name: Designer InBody Standard Scan
version: 1.0.2
format: 100% 5-point Likert scale
question_count: 84
estimated_time: 8-12 minutes
target_users: Undergraduate design students, primarily 3rd and 4th year
output: OnePage diagnostic report, downloadable as PDF
deployment_target: Static web app, such as GitHub Pages
server_required: false
portfolio_upload_required: false
ai_evaluation_required: false
```

---

## 3. Design Principles

### 3.1 Discipline-neutral wording

The questions must work across multiple design fields, including but not limited to:

- graphic design
- visual communication design
- UX/UI design
- product design
- space design
- exhibition design
- service design
- experience design
- motion/media design
- fashion design
- craft design

Avoid field-specific words such as:

- screen
- app
- UI
- component
- logo
- wireframe
- brand system
- typography
- prototype

Use broader words such as:

- work
- outcome
- element
- structure
- flow
- arrangement
- direction
- people
- people who see, use, or experience the work
- alternative directions
- test version
- overall rules and consistency

### 3.2 Simple language

Questions should be easy for undergraduate students to understand.  
Avoid overly professional or academic terminology.

Preferred wording:

| Avoid | Use instead |
|---|---|
| brief | assignment requirements |
| critique | feedback, opinion |
| concept | core idea, direction |
| insight | important discovery, something newly learned |
| context | situation, background |
| prototype | test version, trial version |
| research | looking up materials, case studies, observing people |
| storytelling | explanation flow |
| communication | explanation, delivery |
| output | outcome, result |

### 3.3 Cumulative working tendency

The scan should not focus only on the most recent project.  
Students should answer based on their repeated patterns across multiple design works.

Suggested instruction:

> This is not a test with right or wrong answers.  
> Please think about the design works you have done so far and answer based on the way you usually work.  
> Rather than focusing on one exceptional case, choose the answer that best reflects your repeated working habits.  
> Choose the option closest to your usual pattern, even if another option seems more ideal.

### 3.4 Low-friction input

v1.0.2 uses only a 5-point Likert scale.

No free-text answers.  
No portfolio PDF upload.  
No page-number entry.  
No login.  
No server-side storage.

---

## 4. Response Scale

Each question is answered using the following scale:

| Value | Label |
|---:|---|
| 1 | Strongly disagree |
| 2 | Disagree |
| 3 | Neutral |
| 4 | Agree |
| 5 | Strongly agree |

---

## 5. Overall Structure

v1.0.2 has four layers.

| Layer | Description | Purpose |
|---|---|---|
| Layer 1 | 4 main competency categories | Understand broad design competency profile |
| Layer 2 | 12 detailed indicators | Identify strength candidates and areas to check |
| Layer 3 | 6 design orientation tags | Estimate designer identity and working tendency |
| Layer 4 | 5 career/role fit directions | Suggest possible portfolio development directions |

---

## 6. Main Competency Categories

| ID | Name | Description |
|---|---|---|
| thinking | Thinking | Ability to start work, understand the problem, and set direction |
| making | Making | Ability to turn ideas into concrete outcomes |
| communicating | Communicating | Ability to organize and explain design work to others |
| working | Working | Working attitude, habits, and collaboration behavior |

---

## 7. Detailed Indicators

| Category | Indicator ID | Indicator Name | Description |
|---|---|---|---|
| Thinking | problem_discovery | Problem Discovery | Ability to identify the important problem or direction within assignment requirements |
| Thinking | research_discovery | Research / Discovery | Ability to find useful evidence and important discoveries through materials, case studies, and observation |
| Thinking | direction_translation | Direction Translation | Ability to turn findings and thoughts into a clear design direction |
| Making | aesthetic_sense | Aesthetic Sense | Ability to handle form, color, material, image, space, movement, and atmosphere |
| Making | structural_organization | Structural Organization | Ability to organize relationships, flow, and consistency within the work |
| Making | execution_quality | Execution Quality | Ability to make ideas concrete and refine details to a finished level |
| Communicating | portfolio_organization | Work Organization | Ability to select and arrange works according to purpose |
| Communicating | explanation_flow | Explanation Flow | Ability to explain the problem, process, and result in a connected way |
| Communicating | verbal_written_clarity | Verbal / Written Clarity | Ability to explain one's work clearly in speech or writing |
| Working | self_direction | Self-Direction | Ability to set goals and start work without waiting for detailed instruction |
| Working | iteration_improvement | Iteration / Improvement | Ability to improve work through feedback and repeated attempts |
| Working | collaboration_responsibility | Collaboration / Responsibility | Ability to understand one's role and contribute responsibly in collaborative work |

---

## 8. Design Orientation Tags

| Tag ID | Tag Name | Korean Label | Description |
|---|---|---|---|
| idea_generator | Idea Generator | 아이디어 발상형 | Tends to generate new ideas, perspectives, and possibilities |
| process_builder | Process Builder | 과정 설계형 | Tends to connect problem, process, reason, and result |
| visual_stylist | Visual Stylist | 시각 조형형 | Tends to care strongly about aesthetics, styling, form, and visual impression |
| tool_operator | Tool Operator | 도구 구현형 | Tends to learn and use tools or production methods to realize ideas |
| experience_designer | Experience Designer | 경험 설계형 | Tends to consider people's behavior, use flow, and experience |
| presentation_editor | Presentation Editor | 발표 편집형 | Tends to organize and present work in a clear and visually effective way |

---

## 9. Career / Role Fit Directions

Career/role fit should be shown as a **possibility**, not as a final recommendation.
Some directions describe work environments, while others describe role-oriented work that can appear across multiple environments.

| Direction ID | Name | Description |
|---|---|---|
| agency | Agency-oriented | Fast-changing environment with diverse clients and projects, quick alternative development, persuasive presentation material, and strong visual output |
| inhouse | In-house-oriented | Long-term environment within one organization, brand, product, or service where consistency and gradual improvement matter |
| startup_independent | Startup / Independent Project-oriented | Self-initiated environment where the designer finds problems, acts under uncertainty, and creates new opportunities |
| studio_freelance | Independent Studio / Freelance-oriented | Independent or client-based environment built around personal style, specialized skills, and self-proposed work |
| service_experience_planning | Service / Experience Problem-solving-oriented | Role-oriented direction focused on people's behavior, experience flow, stakeholder coordination, and service or experience improvement |

---

## 10. Question Composition

| Section | Count |
|---|---:|
| 12 detailed competency indicators | 48 |
| 6 design orientation tags | 24 |
| Career / role fit | 8 |
| Response consistency support | 4 |
| Total | 84 |

---

## 11. Question Metadata Fields

Each question should support the following fields in JSON:

```ts
type Question = {
  id: string;
  text: string;
  section: "competency" | "orientation" | "career_fit" | "consistency";
  reverse: boolean;
  category?: "thinking" | "making" | "communicating" | "working";
  indicator?: string;
  item_type?: "behavior" | "judgment" | "avoidance" | "confidence";
  orientation_tag?: string;
  career_environment?: string[];
  consistency_area?: string[];
};
```

---

# 12. Full Question List

## A. Thinking

### 1. Problem Discovery

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q01 | At the start of a project, I usually sort out what seems most important before deciding what to make. | behavior | No |
| Q02 | I tend to spend time clarifying why the work is needed before choosing the form of the outcome. | judgment | No |
| Q03 | When the assignment requirements feel clear enough, I tend to move into making before restating the problem in my own words. | avoidance | Yes |
| Q04 | I can usually describe the main issue or direction of my work in one short sentence. | confidence | No |

### 2. Research / Discovery

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q05 | Before settling on a direction, I usually look at materials, examples, or people's situations. | behavior | No |
| Q06 | What I find from materials, examples, or observation often changes how I think about the work. | judgment | No |
| Q07 | When time is tight, I tend to rely on my current sense of the situation instead of looking up more materials or observing people. | avoidance | Yes |
| Q08 | I can usually find something useful for my work while looking at materials, examples, or people's situations. | confidence | No |

### 3. Direction Translation

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q09 | During a project, I have often adjusted the direction based on what I learned or feedback I received. | behavior | No |
| Q10 | I am comfortable letting the direction change when the process shows a better fit. | judgment | No |
| Q11 | Once a direction has been chosen, I usually prefer to protect it from major changes during the project. | avoidance | Yes |
| Q12 | I can usually gather several thoughts into one main direction. | confidence | No |

---

## B. Making

### 4. Aesthetic Sense

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q13 | While working, I usually make choices about sensory elements such as form, color, material, image, space, movement, and atmosphere. | behavior | No |
| Q14 | I often judge whether a work is working by looking at both its purpose and its feeling or finish. | judgment | No |
| Q15 | I tend to decide the atmosphere or detailed expression after the main structure has already been made. | avoidance | Yes |
| Q16 | My work usually has an overall feeling or expression style that I can recognize clearly. | confidence | No |

### 5. Structural Organization

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q17 | I usually spend time arranging the relationships and order among the elements in my work. | behavior | No |
| Q18 | I tend to look at whether the parts of a work connect as a whole, not only whether each part works by itself. | judgment | No |
| Q19 | When each part is working well, I do not usually spend much extra time adjusting the overall relationship among parts. | avoidance | Yes |
| Q20 | I can usually turn complex content into a structure that other people can follow. | confidence | No |

### 6. Execution Quality

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q21 | Before submitting an outcome, I usually check for missing parts, awkward parts, and finishing quality. | behavior | No |
| Q22 | I tend to feel more confident about an idea when it has been made into a clear finished form. | judgment | No |
| Q23 | When time is tight, I put the main direction first and accept that some details may stay rough. | avoidance | Yes |
| Q24 | I usually keep adjusting my work until it reaches a level I can accept. | confidence | No |

---

## C. Communicating

### 7. Work Organization

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q25 | When showing my work, I usually choose the order depending on the purpose. | behavior | No |
| Q26 | I tend to make selections based on what kind of designer I want to show, not only on how many works I have. | judgment | No |
| Q27 | When preparing a portfolio, I feel more comfortable showing a wider range of completed works than making a very small selection. | avoidance | Yes |
| Q28 | I can usually arrange my works so their overall direction is easy to grasp. | confidence | No |

### 8. Explanation Flow

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q29 | When explaining my work, I usually connect the starting point, process, and result. | behavior | No |
| Q30 | I tend to include the reason behind a work along with the final outcome. | judgment | No |
| Q31 | If the final outcome is strong, I tend to keep the process explanation brief. | avoidance | Yes |
| Q32 | I can usually explain how my work changed or developed over time. | confidence | No |

### 9. Verbal / Written Clarity

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q33 | Before explaining my work in speech or writing, I usually prepare the key sentence first. | behavior | No |
| Q34 | I tend to choose words that the other person can understand quickly. | judgment | No |
| Q35 | It usually takes me some time to turn thoughts in my head into clear speech or writing. | avoidance | Yes |
| Q36 | I can usually explain my work to someone who is seeing it for the first time. | confidence | No |

---

## D. Working

### 10. Self-Direction

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q37 | Even when not everything is explained in detail, I usually find a starting point and begin. | behavior | No |
| Q38 | I tend to set my own goals or standards while working, even when the assignment is open. | judgment | No |
| Q39 | When instructions are open, I usually need some outside direction before deciding where to begin. | avoidance | Yes |
| Q40 | I can usually set a direction and carry the work through to the end on my own. | confidence | No |

### 11. Iteration / Improvement

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q41 | After making a first version, I usually revise it through several attempts. | behavior | No |
| Q42 | I tend to treat feedback as material I can use to adjust the work. | judgment | No |
| Q43 | After I have spent a long time thinking through a direction, I tend to make smaller adjustments rather than changing the main direction after feedback. | avoidance | Yes |
| Q44 | I can usually improve the outcome based on feedback or trial and error. | confidence | No |

### 12. Collaboration / Responsibility

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q45 | When working with others, I usually manage my role and deadline. | behavior | No |
| Q46 | In collaborative work, I tend to pay attention to how my part affects the whole outcome. | judgment | No |
| Q47 | In group work, I tend to focus first on completing my assigned part before getting involved in other parts. | avoidance | Yes |
| Q48 | Even when I disagree with others, I can usually coordinate opinions and continue working. | confidence | No |

---

## E. Design Orientation

### 13. Idea Generator

| ID | Question | Reverse |
|---|---|---|
| Q49 | Even with familiar topics, I usually try changing the viewpoint or looking for another angle. | No |
| Q50 | At the beginning of a project, I usually explore several possible directions before narrowing down. | No |
| Q51 | I often get hints for my work from examples or experiences outside the immediate topic. | No |
| Q52 | When an early direction already fits the assignment, I usually prefer to develop it rather than keep searching for other options. | Yes |

### 14. Process Builder

| ID | Question | Reverse |
|---|---|---|
| Q53 | When presenting work, I usually show how the direction developed through the process. | No |
| Q54 | I feel more comfortable with work when the problem, choices, process, and result can be traced as one line. | No |
| Q55 | When making choices during a project, I usually think about why a direction fits the situation. | No |
| Q56 | When the outcome communicates clearly, I do not always feel the full process needs to be shown. | Yes |

### 15. Visual Stylist

| ID | Question | Reverse |
|---|---|---|
| Q57 | I pay close attention to the first impression, atmosphere, and visual or formal finish of my work. | No |
| Q58 | I often feel that the same content can feel very different depending on how it is expressed. | No |
| Q59 | I usually check whether sensory elements such as form, color, material, image, space, and movement fit the purpose of the work. | No |
| Q60 | When I find a strong expression, I sometimes keep it even if the connection to the original purpose needs more explanation. | Yes |

### 16. Tool Operator

| ID | Question | Reverse |
|---|---|---|
| Q61 | I usually learn the tools, software, or production methods needed for the expression I want. | No |
| Q62 | Even when I get stuck technically, I usually look for another way to realize the idea. | No |
| Q63 | I do not feel much burden when trying a new tool or production method. | No |
| Q64 | When an expression requires tools or methods I do not know yet, I often choose a simpler expression I can make reliably. | Yes |

### 17. Experience Designer

| ID | Question | Reverse |
|---|---|---|
| Q65 | I usually think about the situation and flow of the people who will see, use, or experience my work. | No |
| Q66 | I often notice discomfort or difficulties that people may experience and wonder how they could be improved. | No |
| Q67 | I tend to adjust the direction of the work depending on the place, time, situation, and people involved. | No |
| Q68 | If the outcome already feels clear and attractive, I usually check people's actual experience later in the process. | Yes |

### 18. Presentation Editor

| ID | Question | Reverse |
|---|---|---|
| Q69 | When showing my work, I usually adjust order, spacing, size, and flow so it is easy to view. | No |
| Q70 | I am interested in arranging complex work so that other people can understand it more easily. | No |
| Q71 | When showing my work, I usually decide carefully what should appear first and what should appear later. | No |
| Q72 | When the work itself is clear, I tend to spend less time changing the order or presentation method. | Yes |

---

## F. Career / Role Fit

| ID | Question | Connected Direction | Reverse |
|---|---|---|---|
| Q73 | I can keep working without much stress when requests or work conditions change several times. | agency | No |
| Q74 | I feel comfortable staying with one topic, organization, or service and improving it over a long period. | inhouse | No |
| Q75 | When there is no fixed answer, I tend to make a temporary problem definition and start from there. | startup_independent | No |
| Q76 | I am drawn to building a personal expression style or specialized field over time and connecting it to independent or client-based work. | studio_freelance | No |
| Q77 | I often become curious about how people move, choose, use, or experience something. | service_experience_planning | No |
| Q78 | I can usually work with several people's opinions and conditions until they become one direction. | inhouse, service_experience_planning | No |
| Q79 | I do not mind making several possible directions quickly before choosing one. | agency | No |
| Q80 | I often notice opportunities for work before someone gives me a fixed request. | startup_independent, studio_freelance | No |

---

## G. Response Consistency Support

These questions are mainly used to support response consistency checks.

| ID | Question | Check Area | Reverse |
|---|---|---|---|
| Q81 | In many projects, I understand the task better after I begin making something than after looking up or organizing first. | problem_discovery, research_discovery | Yes |
| Q82 | When the final outcome is easy to understand, I often keep the reason or process explanation short. | explanation_flow, process_builder | Yes |
| Q83 | After feedback, I usually keep the original direction and use the feedback mainly for smaller adjustments if the main idea still feels convincing to me. | iteration_improvement, direction_translation | Yes |
| Q84 | After my assigned part is finished in collaborative work, I usually focus on handoff and timing rather than continuing to follow the whole outcome closely. | collaboration_responsibility | Yes |

---

# 13. Scoring Rules

## 13.1 Normal scoring

| Response | Score |
|---:|---:|
| 1 | 0 |
| 2 | 25 |
| 3 | 50 |
| 4 | 75 |
| 5 | 100 |

## 13.2 Reverse scoring

| Response | Score |
|---:|---:|
| 1 | 100 |
| 2 | 75 |
| 3 | 50 |
| 4 | 25 |
| 5 | 0 |

---

## 13.3 Indicator scoring

Each of the 12 detailed indicators is calculated from 4 questions.

| Item Type | Weight |
|---|---:|
| behavior | 0.40 |
| judgment | 0.25 |
| avoidance | 0.25 |
| confidence | 0.10 |

Example:

```text
problem_discovery =
  Q01 * 0.40
+ Q02 * 0.25
+ reverse(Q03) * 0.25
+ Q04 * 0.10
```

---

## 13.4 Category scoring

Each main category is the average of its three indicators.

```text
Thinking =
  average(problem_discovery, research_discovery, direction_translation)

Making =
  average(aesthetic_sense, structural_organization, execution_quality)

Communicating =
  average(portfolio_organization, explanation_flow, verbal_written_clarity)

Working =
  average(self_direction, iteration_improvement, collaboration_responsibility)
```

---

## 13.5 Design orientation tag scoring

Each orientation tag is calculated from:

| Component | Weight |
|---|---:|
| Average of 4 direct orientation questions | 0.60 |
| Average of related detailed indicators | 0.40 |

### Related indicators

| Tag | Direct Questions | Related Indicators |
|---|---|---|
| Idea Generator | Q49-Q52 | problem_discovery, direction_translation |
| Process Builder | Q53-Q56 | problem_discovery, research_discovery, direction_translation, explanation_flow |
| Visual Stylist | Q57-Q60 | aesthetic_sense, execution_quality |
| Tool Operator | Q61-Q64 | execution_quality, self_direction |
| Experience Designer | Q65-Q68 | problem_discovery, research_discovery, structural_organization |
| Presentation Editor | Q69-Q72 | portfolio_organization, explanation_flow, verbal_written_clarity |

---

## 13.6 Career / role fit scoring

Career/role fit should be interpreted as possibility, not final classification.

Suggested calculation:

```text
career_fit_score =
  direct career/role questions average * 0.50
+ related orientation tags average * 0.30
+ related detailed indicators average * 0.20
```

### Agency-oriented

Direct questions:

- Q73
- Q79

Related orientation tags:

- idea_generator
- visual_stylist
- presentation_editor
- tool_operator

Related indicators:

- iteration_improvement

### In-house-oriented

Direct questions:

- Q74
- Q78

Related orientation tags:

- process_builder
- experience_designer

Related indicators:

- structural_organization
- collaboration_responsibility
- iteration_improvement

### Startup / Independent Project-oriented

Direct questions:

- Q75
- Q80

Related orientation tags:

- idea_generator
- process_builder
- experience_designer

Related indicators:

- self_direction
- execution_quality

### Independent Studio / Freelance-oriented

Direct questions:

- Q76
- Q80

Related orientation tags:

- visual_stylist
- tool_operator
- presentation_editor

Related indicators:

- self_direction
- execution_quality

### Service / Experience Problem-solving-oriented

Direct questions:

- Q77
- Q78

Related orientation tags:

- experience_designer
- process_builder

Related indicators:

- research_discovery
- structural_organization
- verbal_written_clarity

---

# 14. Response Consistency Rules

Response consistency checks are not used to judge whether the student lied.  
They identify areas where responses show mixed or conflicting tendencies.

A consistency issue is flagged when both questions in a pair are answered with **4 or higher**.

| Pair ID | Question A | Question B | Area |
|---|---|---|---|
| P01 | Q01 | Q03 | problem_discovery |
| P02 | Q05 | Q07 | research_discovery |
| P03 | Q09 | Q11 | direction_translation |
| P04 | Q13 | Q15 | aesthetic_sense |
| P05 | Q17 | Q19 | structural_organization |
| P06 | Q21 | Q23 | execution_quality |
| P07 | Q25 | Q27 | portfolio_organization |
| P08 | Q29 | Q31 | explanation_flow |
| P09 | Q33 | Q35 | verbal_written_clarity |
| P10 | Q37 | Q39 | self_direction |
| P11 | Q41 | Q43 | iteration_improvement |
| P12 | Q45 | Q47 | collaboration_responsibility |
| P13 | Q05 | Q81 | research_discovery |
| P14 | Q53 | Q82 | process_builder |
| P15 | Q42 | Q83 | iteration_improvement |
| P16 | Q46 | Q84 | collaboration_responsibility |

---

## 15. Suggested Report Output

The OnePage result should include:

1. Basic student information
2. 4 main category scores
3. 12 detailed indicator scores
4. 6 design orientation tags
5. Strength candidates
6. Areas to check
7. Response consistency alerts
8. Career/role fit possibilities
9. Portfolio development direction
10. Consulting priorities
11. Interpretation disclaimer

---

## 16. Report Wording Guidelines

Use non-judgmental wording.

Recommended phrases:

- strength candidate
- area to check
- tendency appears high
- possible fit
- needs confirmation during consulting
- check evidence in the portfolio
- suggested portfolio development direction

Avoid phrases such as:

- excellent
- poor
- suitable
- unsuitable
- lack of ability
- pass
- fail
- true
- false
- problematic student

---

## 17. Example Result Text

### Diagnostic Summary

This student shows relatively strong tendencies in Making, especially in aesthetic sense and execution quality.  
However, Communicating appears weaker, so the portfolio structure and explanation flow should be checked first during consulting.

### Main Orientation Tags

- Visual Stylist
- Tool Operator
- Presentation Editor

### Strength Candidates

- Aesthetic sense
- Execution quality
- Visual organization

### Areas to Check

- Research / Discovery
- Explanation flow
- Verbal / Written clarity

### Possible Career / Role Fit

This student may show a possible fit with agency-oriented or independent studio/freelance-oriented directions.  
However, the consultant should check whether the portfolio shows the ability to respond to different conditions, revise after feedback, and explain why certain design choices were made.

### Portfolio Development Direction

1. Place visually strong representative works early in the portfolio.
2. Do not only show final outcomes; briefly explain why each direction was chosen.
3. Include projects that show response to different styles, conditions, or requirements.
4. Make the student's visual strength clear within the first few pages.

### Response Consistency Alert Example

Research / Discovery needs consistency review.

The student answered highly on both:

- Q05: “Before settling on a direction, I usually look at materials, examples, or people's situations.”
- Q81: “In many projects, I understand the task better after I begin making something than after looking up or organizing first.”

Consulting check:

> Confirm how much research actually happens in the student's project process, and what gets skipped when time is short.

---

## 18. Implementation Notes for AI Agent

Recommended file structure:

```text
/src
  /data
    questions.json
  /lib
    scoring.ts
    consistency.ts
    reportText.ts
  /components
    SurveyPage.tsx
    QuestionCard.tsx
    ProgressBar.tsx
    ResultPage.tsx
    ScoreChart.tsx
    PdfExportButton.tsx
```

The AI Agent should implement:

1. Load question data from `questions.json`.
2. Render all 84 questions as 5-point Likert items.
3. Store responses locally in browser state or localStorage.
4. Calculate normal and reverse scores.
5. Calculate 12 indicator scores.
6. Calculate 4 category scores.
7. Calculate 6 design orientation tag scores.
8. Calculate 5 career/role fit scores.
9. Detect response consistency issues using the 16 predefined pairs.
10. Generate a OnePage result view.
11. Allow the user to save the result as PDF using browser print or client-side PDF export.
12. Avoid sending student responses to any server in v1.0.2.

---

## 19. Final Definition

**Designer InBody Standard Scan v1.0.2** is an 84-question, 5-point Likert-based self-diagnostic tool for undergraduate design students.

It helps portfolio consultants quickly identify a student's strength candidates, areas to check, design orientation, possible career/role fit, and portfolio development direction before a portfolio consulting session.

It does not replace long-term observation, portfolio review, or expert judgment.  
It compresses early understanding into a structured pre-consulting profile.
