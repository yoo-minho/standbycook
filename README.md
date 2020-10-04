# boiler-plate

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

1. antd - form.list data를 채우는 형태로 쓰기 힘드니 쓰지말것
2. update시 새로 추가되는 것과 수정되는 것을 구분하는 방법