# Login (toy project)

## 개요

---
로그인을 구현합니다.

회원 가입시 이메일을 발송하여 로그인에 대한 인증을 진행합니다.

Json Web Token 방식으로 권한 및 로그인 상태를 체크합니다.

## 기능 안내

---
- 회원가입
- 로그인
- 이메일 전송 기능
- 아이디별 권한

### 회원가입

---

이메일 및 패스워드를 기입 후 회원가입시 입력한 이메일로 인증 이메일이 발송된다. (유효기간이 1일 짜리 엑세스 토큰 발행)

이메일 보관함으로 이동하여 발행된 토큰으로 인증 시도

- 회원가입 시도
- 성공 → 회원가입 인증 메일 발송 (토큰)
- 링크 클릭 → 인증 → 성공

### 로그인

---

정상 회원가입이 된 후 이메일와 아이디로 로그인 시도

1. 로그인 시도
2. 성공: 접근 토큰 발행
3. users controller 접근 > 발행된 토큰 검증 > 권한체크 > 회원정보 리턴
