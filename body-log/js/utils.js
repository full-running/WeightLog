"use strict";

// utils.js
// 특정 기능에 종속되지 않는 공통 유틸 함수 모음
// 날짜 포맷, 입력값 유효성 검사 등 여러 파일에서 공통으로 사용

// Date 객체를 "YYYY-MM-DD" 형식 문자열로 변환
// input[type="date"]의 value 형식과 맞추기 위해 사용
const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 오늘 날짜를 "YYYY-MM-DD" 형식으로 반환
// date-input 초기값 세팅에 사용
const getTodayDateString = () => {
  return formatDateToString(new Date());
};

// 고유 id 생성 — 타임스탬프 기반
// 기록 추가 시 각 항목을 구분하는 id로 사용
const generateUniqueId = () => {
  return Date.now().toString();
};

// 숫자 입력값 유효성 검사
// 빈 값, 0 이하, 숫자가 아닌 값이면 false 반환
const isValidNumber = (value) => {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && parsedValue > 0;
};

// 체중 유효성 검사 (10kg ~ 300kg 범위)
const isValidWeight = (weight) => {
  const parsedWeight = parseFloat(weight);
  return (
    isValidNumber(parsedWeight) && parsedWeight >= 10 && parsedWeight <= 300
  );
};

// 키 유효성 검사 (100cm ~ 250cm 범위)
const isValidHeight = (height) => {
  const parsedHeight = parseFloat(height);
  return (
    isValidNumber(parsedHeight) && parsedHeight >= 100 && parsedHeight <= 250
  );
};
