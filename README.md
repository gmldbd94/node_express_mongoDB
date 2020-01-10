# Dyeong_RESTful_project

## Architecture
### config
- 보안과 관련된 파일들을 담는 폴더

### model
- DB를 접근하는 모듈을 담는 폴더

### module
- db/pool.js : DB 쿼리 적용 모듈
- utils/jwt.js : JWT 모듈
- utils/authUtil.js : JTW 적용 미들웨어
- utils/responseMessage.js : 응답 메세지 집합
- utils/statusCode.js : 상태코드 집합
- utils/utils.js : 응답 메세지 포맷 집합

### routes
- Auth : 계정 관리 라우트
- Boards : 게시글 관련 라우트
- Boards/Comments : 댓글 관련 라우트