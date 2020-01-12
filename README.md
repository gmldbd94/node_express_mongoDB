# Dyeong_RESTful_project

# DB
MongoDB

## 기능
- User :
    - 유저 회원가입
    - 유저 로그인
    - 유저 보기
    - 유저 삭제
        - 게시글 삭제
        - 댓글 (안보이기)

- Board :
    - 게시글 생성
    - 게시글 모두보기(페이지네이션)
    - 특정 게시글 보기
    - 게시글 삭제
        - 댓글 삭제
    - 게시글 업데이트

- Comment : 
    - 댓글 생성
    - 대댓글 생성
    - 댓글 삭제
        - 대댓글 있을 시 content 삭제
        - 대댓글 없을 시 댓글 삭제

- Like : 
    - 좋아요 toggle