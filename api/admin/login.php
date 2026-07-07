<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

require_method('POST');

$input = json_input();
$password = (string)($input['password'] ?? '');
$hash = (string)($config['admin']['password_hash'] ?? '');

if ($hash === '' || !password_verify($password, $hash)) {
    respond_error('관리자 비밀번호가 일치하지 않습니다.', 401);
}

session_regenerate_id(true);
$_SESSION['admin_authenticated'] = true;

respond_json(['authenticated' => true]);
