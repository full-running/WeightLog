# ⚖️ WeightLog

날짜별 체중을 기록하고 BMI를 확인하는 **바닐라 JS 토이 프로젝트**입니다.
프레임워크 없이 JavaScript만으로 구현했습니다.

---

## 📌 서비스 소개

별도 회원가입 없이 브라우저에서 바로 체중을 기록하고 관리할 수 있는 웹 애플리케이션입니다.
LocalStorage를 활용해 데이터를 유지하며, 순수 JS만으로 관심사를 분리해 구현했습니다.

---

## ✅ 주요 기능

- 날짜 + 체중 입력 및 저장
- 기록 목록 조회 / 수정 / 삭제
- BMI 자동 계산 및 상태 표시
- LocalStorage 기반 데이터 유지

---

## 📂 프로젝트 구조
```
WeightLog/
├── index.html
├── css/
│   ├── reset.css     # 브라우저 기본 스타일 초기화
│   └── style.css     # 전체 스타일
└── js/
├── app.js        # 진입점, 이벤트 바인딩
├── storage.js    # LocalStorage 읽기/쓰기
├── bmi.js        # BMI 계산 로직
├── render.js     # DOM 렌더링
└── utils.js      # 날짜 포맷 등 공통 유틸
```

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)

---

## 🔗 Demo

https://hanyiseul.github.io/WeightLog/index.html
