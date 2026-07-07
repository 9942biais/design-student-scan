import type { SelfAssessmentScores, SurveyResponses } from './scoring';
import type { StudentInfo } from '../components/SurveyPage';

export interface SubmissionSummary {
  id: number;
  publicId: string;
  name: string;
  email: string;
  school: string;
  department: string;
  grade: string;
  writtenDate: string;
  createdAt: string;
}

export interface SubmissionDetail extends SubmissionSummary {
  responses: SurveyResponses;
  selfAssessment: SelfAssessmentScores;
}

interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

async function requestJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const body = await response.json().catch(() => null) as ApiResponse<T> | null;

  if (!response.ok || !body?.ok) {
    const message = body && !body.ok ? body.error : '서버 요청을 처리하지 못했습니다.';
    throw new Error(message);
  }

  return body.data;
}

export function createSubmission(payload: {
  studentInfo: StudentInfo;
  responses: SurveyResponses;
  selfAssessment: SelfAssessmentScores;
}) {
  return requestJson<{ publicId: string }>('/api/submissions.php', {
    method: 'POST',
    body: JSON.stringify({
      student: payload.studentInfo,
      responses: payload.responses,
      selfAssessment: payload.selfAssessment
    })
  });
}

export function loginAdmin(password: string) {
  return requestJson<{ authenticated: boolean }>('/api/admin/login.php', {
    method: 'POST',
    body: JSON.stringify({ password })
  });
}

export function logoutAdmin() {
  return requestJson<{ authenticated: boolean }>('/api/admin/logout.php', {
    method: 'POST',
    body: JSON.stringify({})
  });
}

export function fetchSubmissions() {
  return requestJson<SubmissionSummary[]>('/api/admin/submissions.php');
}

export function fetchSubmission(publicId: string) {
  return requestJson<SubmissionDetail>(`/api/admin/submission.php?id=${encodeURIComponent(publicId)}`);
}
