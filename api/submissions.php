<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

require_method('POST');

$input = json_input();
$student = is_array($input['student'] ?? null) ? $input['student'] : [];
$responses = is_array($input['responses'] ?? null) ? $input['responses'] : [];
$selfAssessment = is_array($input['selfAssessment'] ?? null) ? $input['selfAssessment'] : [];

$email = require_string($student, 'email', 190);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond_error('이메일 형식이 올바르지 않습니다.', 422);
}

if (empty($student['marketingConsent'])) {
    respond_error('이메일 수집 및 이용 동의가 필요합니다.', 422);
}

$name = require_string($student, 'name', 100);
$school = require_string($student, 'school', 150);
$department = require_string($student, 'department', 150);
$grade = require_string($student, 'grade', 50);
$writtenDate = require_string($student, 'date', 50);

if (count($responses) < 1 || count($selfAssessment) < 1) {
    respond_error('진단 응답 데이터가 필요합니다.', 422);
}

$publicId = bin2hex(random_bytes(16));
$stmt = db()->prepare(
    'INSERT INTO submissions
        (public_id, email, name, school, department, grade, written_date, marketing_consent, responses_json, self_assessment_json, user_agent, ip_address)
     VALUES
        (:public_id, :email, :name, :school, :department, :grade, :written_date, :marketing_consent, :responses_json, :self_assessment_json, :user_agent, :ip_address)'
);

$stmt->execute([
    ':public_id' => $publicId,
    ':email' => $email,
    ':name' => $name,
    ':school' => $school,
    ':department' => $department,
    ':grade' => $grade,
    ':written_date' => $writtenDate,
    ':marketing_consent' => 1,
    ':responses_json' => json_encode($responses, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ':self_assessment_json' => json_encode($selfAssessment, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ':user_agent' => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500),
    ':ip_address' => substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45),
]);

respond_json(['publicId' => $publicId], 201);
