<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => '서버 설정 파일이 없습니다.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require $configFile;

session_name($config['session']['name'] ?? 'dif_scan_admin');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => (bool)($config['session']['secure'] ?? true),
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond_error('요청 JSON 형식이 올바르지 않습니다.', 400);
    }

    return $decoded;
}

function respond_json(mixed $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode(['ok' => true, 'data' => $data], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function respond_error(string $message, int $status = 400): never
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function db(): PDO
{
    static $pdo = null;
    global $config;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $db = $config['db'];
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $db['host'],
        $db['name'],
        $db['charset'] ?? 'utf8mb4'
    );

    $pdo = new PDO($dsn, $db['user'], $db['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function require_admin(): void
{
    if (empty($_SESSION['admin_authenticated'])) {
        respond_error('관리자 로그인이 필요합니다.', 401);
    }
}

function require_method(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        respond_error('허용되지 않은 요청 방식입니다.', 405);
    }
}

function require_string(array $data, string $key, int $maxLength): string
{
    $value = trim((string)($data[$key] ?? ''));
    if ($value === '') {
        respond_error($key . ' 값이 필요합니다.', 422);
    }
    if (mb_strlen($value, 'UTF-8') > $maxLength) {
        respond_error($key . ' 값이 너무 깁니다.', 422);
    }
    return $value;
}
