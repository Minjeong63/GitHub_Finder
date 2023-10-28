# github finder 만들어보기

- 주어진 사진만 보고 html, css, javascript 기능을 구현함

## 과정

### 1. html로 기본 구조 잡기

### 2. 인라인 스타일로 css 작업 후, 외부 스타일 시트에 하나로 모아놓기

### 3. js로 기능 구현

#### - github api를 사용해야 했는데 여기에서 시간이 엄청 오래 걸림

#### - https://github.com/octokit/octokit.js/#readme

#### - 위 링크의 Usage 부분 Browsers에 있는 코드로 성공했음

#### - repository 보여주는 부분 기능 구현 때문에 요소부터 css 클래스, data 넣어야 하는 부분을 하나하나 만들어줬음

#### - 새로고침 했을 때 데이터가 날아가지 않게 하기 위해 localStorage 사용

#### - 개인 엑세스 토큰 보관에 대해 고민중..
