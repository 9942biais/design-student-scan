# DIF Scan

디자인 학부생 자가진단 서비스입니다. `dif-scan.biais.co.kr` 서브도메인 루트에 React 정적 파일을 배포하고, 같은 호스트의 PHP 8.x API가 MariaDB에 응답자 정보와 진단 응답을 저장합니다.

## 운영 구조

- `/`: 응답자용 자가진단
- `/admin`: 관리자 로그인, 응답 목록, 전체 결과지 조회
- `/api`: PHP API
- `database/schema.sql`: MariaDB 테이블 생성 SQL

## Cafe24 배포 순서

1. Cafe24에서 `dif-scan.biais.co.kr` 서브도메인을 생성하고 SSL을 설정합니다.
2. MariaDB에 `database/schema.sql`을 실행합니다.
3. `api/config.example.php`를 `api/config.php`로 복사한 뒤 DB 정보와 관리자 비밀번호 해시를 설정합니다.
4. `npm run build`를 실행합니다.
5. `dist` 안의 정적 파일, `.htaccess`, `api` 폴더를 서브도메인 웹 루트에 업로드합니다.

`api/config.php`는 비밀 정보가 들어가므로 Git에 커밋하지 않습니다.
