# 장볼레시피

레시피 보고 장바구니에 담는다!

# 개발이슈

1. 로그인 - 이슈없음
2. 회원가입 - 이슈없음
3. 로그아웃 - 이슈없음
4. 타이머 - 이슈없음
5. 레시피추가 - 빈값처리,부재료처리, 대표이미지처리, 이미지처리, 등록시순서보장, 식재료단위
6. 레시피조회 - 장바구니담기안됨
7. 레시피수정 - 수정안됨, 순서바꾸기안됨
8. 장볼리스트 - 레시피조회안됨, 카테고리별정렬, 부재료정리, 네이버쇼핑장바구니처럼
9. 요리세줄일기 - 준비중처리
10. 설정 - 준비중처리

# 설치이슈

1. bcrypt 이슈
- npm install --global windows-build-tools
- npm i -g node-pre-gyp
- npm i bcrypt@3.0.6

2. ffmpeg 이슈
- https://kyoko0825.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0-10%EC%97%90%EC%84%9C-ffmpeg-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

3. nohup node.js
- nohup node server.js &
- rm -rf nohup.out
- tail -1000f nohup.out+

4. pg 이슈 윈도우파워셀 관리자모드에서 실행 (해당경로안에서)
npm install --global --production windows-build-tools
npm install --global node-gyp
npm install -g pg-native