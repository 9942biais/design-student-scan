<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

require_method('GET');
require_admin();

$publicId = trim((string)($_GET['id'] ?? ''));
if ($publicId === '') {
    respond_error('결과 ID가 필요합니다.', 422);
}

$stmt = db()->prepare(
    'SELECT id, public_id, email, name, school, department, grade, written_date, responses_json, self_assessment_json, created_at
     FROM submissions
     WHERE public_id = :public_id
     LIMIT 1'
);
$stmt->execute([':public_id' => $publicId]);
$row = $stmt->fetch();

if (!$row) {
    respond_error('결과를 찾을 수 없습니다.', 404);
}

respond_json([
    'id' => (int)$row['id'],
    'publicId' => $row['public_id'],
    'email' => $row['email'],
    'name' => $row['name'],
    'school' => $row['school'],
    'department' => $row['department'],
    'grade' => $row['grade'],
    'writtenDate' => $row['written_date'],
    'createdAt' => $row['created_at'],
    'responses' => json_decode($row['responses_json'], true) ?: [],
    'selfAssessment' => json_decode($row['self_assessment_json'], true) ?: [],
]);
