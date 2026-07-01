# Designer InBody Standard Scan v1.0.2

## 1. Overview

**Designer InBody Standard Scan v1.0.2** is a self-diagnostic pre-consulting tool for 3rd- and 4th-year undergraduate design students.

It is designed to help portfolio consultants quickly understand a student's:

- design competency profile
- working tendencies
- design orientation
- possible career-environment fit
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
| Layer 4 | 5 career environment fit types | Suggest possible portfolio development directions |

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

## 9. Career Environment Fit Types

Career environment fit should be shown as a **possibility**, not as a final recommendation.

| Environment ID | Name | Description |
|---|---|---|
| agency | Agency | Fast-changing environment with diverse projects, quick idea development, and strong visual output |
| inhouse | In-house Design Department | Long-term environment within one organization, brand, product, or service |
| startup_independent | Startup / Independent Project | Self-initiated environment where the designer finds problems and creates opportunities |
| studio_freelance | Studio / Freelance | Independent or client-based environment built around personal style or specialized skills |
| service_experience_planning | Service / Experience Design & Planning | Environment focused on people's behavior, service flow, experience problems, and improvement |

---

## 10. Question Composition

| Section | Count |
|---|---:|
| 12 detailed competency indicators | 48 |
| 6 design orientation tags | 24 |
| Career environment fit | 8 |
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
| Q01 | When I start a project, I usually organize the most important problem or direction before simply following the given requirements. | behavior | No |
| Q02 | I think it is important to ask “why is this needed?” before asking “what should I make?” | judgment | No |
| Q03 | When I receive assignment requirements, I usually start making right away without thinking again about the problem. | avoidance | Yes |
| Q04 | I can usually explain in one sentence what my work is trying to solve. | confidence | No |

### 2. Research / Discovery

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q05 | Before starting a project, I usually look at materials, examples, or people's situations first. | behavior | No |
| Q06 | I think that things newly learned from looking up materials or observing people should affect the direction of the work. | judgment | No |
| Q07 | When time is short, I usually move forward based on my own sense without looking up materials or observing people. | avoidance | Yes |
| Q08 | While looking at materials or examples, I usually find important discoveries that can be used in my work. | confidence | No |

### 3. Direction Translation

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q09 | I have often changed direction based on things I learned or feedback I received during the work process. | behavior | No |
| Q10 | I think it is important to change toward a more suitable direction through the process, rather than sticking to the first idea. | judgment | No |
| Q11 | I usually feel that changing direction in the middle makes the project unstable. | avoidance | Yes |
| Q12 | I can usually organize multiple thoughts into one core direction. | confidence | No |

---

## B. Making

### 4. Aesthetic Sense

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q13 | I usually pay close attention to sensory elements such as form, color, material, image, space, movement, and atmosphere. | behavior | No |
| Q14 | I think the feeling and finish of the outcome are as important as solving the problem. | judgment | No |
| Q15 | I usually refine the atmosphere or detailed expression only at the end if there is time left. | avoidance | Yes |
| Q16 | My work usually has a clear overall feeling or expression style. | confidence | No |

### 5. Structural Organization

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q17 | I usually organize the relationships and order among the elements in my work. | behavior | No |
| Q18 | I think good work should feel naturally connected as a whole, rather than having each element look good separately. | judgment | No |
| Q19 | I usually think that if each part is well made, the overall structure does not need much attention. | avoidance | Yes |
| Q20 | I can usually organize complex content into a structure that people can understand easily. | confidence | No |

### 6. Execution Quality

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q21 | Before submitting an outcome, I usually check for missing parts, awkward parts, and the finishing quality. | behavior | No |
| Q22 | I think that even if the idea is good, it is important to show it in a finished form. | judgment | No |
| Q23 | When time is short, I usually feel that showing only the big direction is enough, even if the details are unfinished. | avoidance | Yes |
| Q24 | I usually keep refining my work until it reaches the level I want. | confidence | No |

---

## C. Communicating

### 7. Work Organization

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q25 | I usually choose which works to show first depending on the purpose. | behavior | No |
| Q26 | I think a structure that clearly shows who I am is more important than showing many works. | judgment | No |
| Q27 | I usually think it is better to include as many completed works as possible. | avoidance | Yes |
| Q28 | I can usually organize my works so they are easy to see at a glance. | confidence | No |

### 8. Explanation Flow

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q29 | When explaining my work, I try to organize the problem, process, and result so they connect. | behavior | No |
| Q30 | I think it is important to show why I made something, not just the final outcome. | judgment | No |
| Q31 | I usually think that if the outcome is good, the process explanation can be short or missing. | avoidance | Yes |
| Q32 | I can usually explain how my work developed over time. | confidence | No |

### 9. Verbal / Written Clarity

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q33 | Before explaining my work in speech or writing, I usually organize the key sentence first. | behavior | No |
| Q34 | I think it is important to explain with words that the other person can understand immediately, rather than using difficult words. | judgment | No |
| Q35 | I often find it difficult to organize thoughts in my head into speech or writing. | avoidance | Yes |
| Q36 | I can usually explain my work easily to someone seeing it for the first time. | confidence | No |

---

## D. Working

### 10. Self-Direction

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q37 | Even when no one explains everything in detail, I usually find what needs to be done and start. | behavior | No |
| Q38 | I think it is important to set my own goals and standards for good work. | judgment | No |
| Q39 | When there is no clear instruction, I usually stop because I do not know where to begin. | avoidance | Yes |
| Q40 | I can usually set a direction and carry the work through to the end on my own. | confidence | No |

### 11. Iteration / Improvement

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q41 | Rather than leaving the first version as it is, I usually improve it through several revisions. | behavior | No |
| Q42 | I think receiving feedback is not something that weakens the work, but a process that makes it better. | judgment | No |
| Q43 | If I have already thought a lot about a work, I usually do not want to change it much even after receiving feedback. | avoidance | Yes |
| Q44 | I can usually improve the outcome based on feedback or trial and error. | confidence | No |

### 12. Collaboration / Responsibility

| ID | Question | Type | Reverse |
|---|---|---|---|
| Q45 | When working with others, I usually try to keep my role and deadline. | behavior | No |
| Q46 | In collaborative work, I think the quality of the whole outcome is important, not only my part. | judgment | No |
| Q47 | Once my assigned part is finished, I usually do not get deeply involved in other parts. | avoidance | Yes |
| Q48 | Even when I disagree with others, I can usually coordinate opinions and continue working. | confidence | No |

---

## E. Design Orientation

### 13. Idea Generator

| ID | Question | Reverse |
|---|---|---|
| Q49 | Even with familiar topics, I usually think of new perspectives or other possibilities. | No |
| Q50 | At the beginning of a project, I usually think broadly about several directions rather than one answer. | No |
| Q51 | I often get hints for my work from examples or experiences in completely different fields. | No |
| Q52 | If my first idea seems acceptable, I usually proceed with it rather than looking for more possibilities. | Yes |

### 14. Process Builder

| ID | Question | Reverse |
|---|---|---|
| Q53 | I think it is important to explain why my work developed through a certain process. | No |
| Q54 | I think good work happens when problem, reason, process, and result are connected. | No |
| Q55 | When making choices during a project, I usually think about why this direction is suitable. | No |
| Q56 | If the outcome looks good, I usually do not pay much attention to whether the process is connected from beginning to end. | Yes |

### 15. Visual Stylist

| ID | Question | Reverse |
|---|---|---|
| Q57 | I care strongly about the first impression, atmosphere, and visual or formal finish of my work. | No |
| Q58 | I think the power of a work can change greatly depending on how the same content is expressed. | No |
| Q59 | I usually check whether sensory elements such as form, color, material, image, space, and movement match the purpose of the work. | No |
| Q60 | If the expression looks beautiful or impressive, I sometimes feel it is acceptable even if it does not fully match the purpose. | Yes |

### 16. Tool Operator

| ID | Question | Reverse |
|---|---|---|
| Q61 | I usually learn the tools, software, or production methods needed to create the expression I want. | No |
| Q62 | Even when I get stuck technically, I usually try to find a way to realize the idea. | No |
| Q63 | I do not feel much burden when trying a new tool or production method. | No |
| Q64 | I usually give up easily on expressions that are difficult to make with tools I already know. | Yes |

### 17. Experience Designer

| ID | Question | Reverse |
|---|---|---|
| Q65 | I usually think about the situation and flow of the people who will see, use, or experience my work. | No |
| Q66 | I am interested in finding and improving discomfort or difficulties that people experience. | No |
| Q67 | I think the direction of the work can change depending on the place, time, situation, and people involved. | No |
| Q68 | If the outcome looks good, I usually feel that how people actually experience it can be considered later. | Yes |

### 18. Presentation Editor

| ID | Question | Reverse |
|---|---|---|
| Q69 | When showing my work, I usually organize order, spacing, size, and flow so it is easy to view. | No |
| Q70 | I am interested in organizing complex work so that other people can understand it easily. | No |
| Q71 | When showing my work, I carefully decide what to show first and what to show later. | No |
| Q72 | If the work itself is good enough, I usually think the order or way of presenting it is not very important. | Yes |

---

## F. Career Environment Fit

| ID | Question | Connected Environment | Reverse |
|---|---|---|---|
| Q73 | I feel energized even in environments where many different kinds of work change quickly. | agency | No |
| Q74 | I am well suited to work that develops and improves one topic or organization over a long time. | inhouse | No |
| Q75 | Even when there is no clear answer, I usually define the problem myself and begin. | startup_independent | No |
| Q76 | I am well suited to steadily building my own expression style or specialized field. | studio_freelance | No |
| Q77 | I find it interesting to observe people's behavior or experience flow and find points for improvement. | service_experience_planning | No |
| Q78 | I am well suited to developing outcomes while coordinating opinions from several people. | inhouse, service_experience_planning | No |
| Q79 | I am well suited to making and comparing several directions in a short time. | agency | No |
| Q80 | I am well suited to creating opportunities myself and proposing my work first. | startup_independent, studio_freelance | No |

---

## G. Response Consistency Support

These questions are mainly used to support response consistency checks.

| ID | Question | Check Area | Reverse |
|---|---|---|---|
| Q81 | My work usually goes better when I start making right away without looking things up or organizing first. | problem_discovery, research_discovery | Yes |
| Q82 | If the outcome looks good, I do not think the reason or process needs to be explained in detail. | explanation_flow, process_builder | Yes |
| Q83 | Even after receiving feedback, I usually keep my first way of thinking. | iteration_improvement, direction_translation | Yes |
| Q84 | In collaborative work, once my role is finished, I usually do not get deeply involved in the overall result. | collaboration_responsibility | Yes |

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

## 13.6 Career environment fit scoring

Career environment fit should be interpreted as possibility, not final classification.

Suggested calculation:

```text
career_fit_score =
  direct career questions average * 0.50
+ related orientation tags average * 0.30
+ related detailed indicators average * 0.20
```

### Agency

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

### In-house Design Department

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

### Startup / Independent Project

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

### Studio / Freelance

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

### Service / Experience Design & Planning

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
8. Career environment fit possibilities
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

### Possible Career Environment Fit

This student may fit agency or studio/freelance-like environments.  
However, the consultant should check whether the portfolio shows the ability to respond to different conditions, revise after feedback, and explain why certain design choices were made.

### Portfolio Development Direction

1. Place visually strong representative works early in the portfolio.
2. Do not only show final outcomes; briefly explain why each direction was chosen.
3. Include projects that show response to different styles, conditions, or requirements.
4. Make the student's visual strength clear within the first few pages.

### Response Consistency Alert Example

Research / Discovery needs consistency review.

The student answered highly on both:

- Q05: “Before starting a project, I usually look at materials, examples, or people's situations first.”
- Q81: “My work usually goes better when I start making right away without looking things up or organizing first.”

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
8. Calculate 5 career environment fit scores.
9. Detect response consistency issues using the 16 predefined pairs.
10. Generate a OnePage result view.
11. Allow the user to save the result as PDF using browser print or client-side PDF export.
12. Avoid sending student responses to any server in v1.0.2.

---

## 19. Final Definition

**Designer InBody Standard Scan v1.0.2** is an 84-question, 5-point Likert-based self-diagnostic tool for undergraduate design students.

It helps portfolio consultants quickly identify a student's strength candidates, areas to check, design orientation, possible career-environment fit, and portfolio development direction before a portfolio consulting session.

It does not replace long-term observation, portfolio review, or expert judgment.  
It compresses early understanding into a structured pre-consulting profile.
