"use strict";

// bmi.js
// BMI 계산 및 상태 판정 전담 모듈
// 계산 로직을 분리해서 render.js나 app.js가 결과값만 받아서 사용하도록 구성

// BMI 계산 공식: 체중(kg) / (키(m) * 키(m))
// 소수점 둘째 자리까지 반환
const calculateBmi = (weightKg, heightCm) => {
  const heightMeter = heightCm / 100;
  const bmi = weightKg / (heightMeter * heightMeter);
  return Math.round(bmi * 100) / 100;
};

// BMI 수치에 따른 상태 문자열 반환
// 기준: 대한비만학회 기준
// 저체중 < 18.5 / 정상 18.5 ~ 22.9 / 과체중 23 ~ 24.9 / 비만 25 이상
const getBmiStatus = (bmi) => {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "과체중";
  return "비만";
};

// BMI 계산 + 상태 판정을 묶어서 반환
// render.js에서 이 함수 하나만 호출하면 수치와 상태를 모두 받을 수 있음
const getBmiResult = (weightKg, heightCm) => {
  const bmiValue = calculateBmi(weightKg, heightCm);
  const bmiStatus = getBmiStatus(bmiValue);
  return { bmiValue, bmiStatus };
};
