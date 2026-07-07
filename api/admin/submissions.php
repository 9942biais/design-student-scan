<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

require_method('GET');
require_admin();

$stmt = db()->query(
    'SELECT id, public_id, email, name, school, department, grade, written_date, created_at
     FROM submissions
     ORDER BY created_at DESC
     LIMIT 500'
);

$rows = array_map(static fn (array $row): array => [
    'id' => (int)$row['id'],
    'publicId' => $row['public_id'],
    'email' => $row['email'],
    'name' => $row['name'],
    'school' => $row['school'],
    'department' => $row['department'],
    'grade' => $row['grade'],
    'writtenDate' => $row['written_date'],
    'createdAt' => $row['created_at'],
], $stmt->fetchAll());

respond_json($rows);
