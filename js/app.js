"use strict";

// app.js
// 진입점 — 이벤트 바인딩 및 앱 초기화 담당
// 직접 계산/저장/렌더링하지 않고 각 모듈 함수를 호출하는 역할만 함

// 수정 중인 기록의 id를 임시 보관
// null이면 새 기록 추가, 값이 있으면 수정 모드
let currentEditingId = null;

// =====================
// 초기화
// =====================

const initializeApp = () => {
  const userInfo = loadUserInfo();

  if (userInfo === null) {
    // 기본정보 없으면 setup 화면 표시
    showSetupSection();
  } else {
    // 기본정보 있으면 메인 화면 바로 표시
    showMainSection();
    renderRecordList(loadAllRecords(), userInfo.heightCm);
  }

  // date-input 기본값을 오늘 날짜로 세팅
  document.getElementById("date-input").value = getTodayDateString();

  bindEvents();
};

// =====================
// 이벤트 바인딩
// =====================

const bindEvents = () => {
  // 기본정보 저장 버튼
  document
    .getElementById("setup-save-btn")
    .addEventListener("click", handleSetupSave);

  // 체중 기록 추가/수정 버튼
  document
    .getElementById("weight-save-btn")
    .addEventListener("click", handleWeightSave);

  // 기록 목록 수정/삭제 — 이벤트 위임으로 처리
  document
    .getElementById("weight-list")
    .addEventListener("click", handleRecordAction);
};

// =====================
// 핸들러
// =====================

// 기본정보 저장
const handleSetupSave = () => {
  const selectedGender = document.querySelector("input[name='gender']:checked");
  const heightInput = document.getElementById("height-input").value;

  if (selectedGender === null) {
    alert("성별을 선택해주세요.");
    return;
  }

  if (!isValidHeight(heightInput)) {
    alert("키를 올바르게 입력해주세요. (100cm ~ 250cm)");
    return;
  }

  const userInfo = {
    gender: selectedGender.value,
    heightCm: parseFloat(heightInput),
  };

  saveUserInfo(userInfo);
  showMainSection();
  renderRecordList(loadAllRecords(), userInfo.heightCm);
};

// 체중 기록 추가 또는 수정
const handleWeightSave = () => {
  const dateValue = document.getElementById("date-input").value;
  const weightValue = document.getElementById("weight-input").value;

  if (!dateValue) {
    alert("날짜를 선택해주세요.");
    return;
  }

  if (!isValidWeight(weightValue)) {
    alert("체중을 올바르게 입력해주세요. (10kg ~ 300kg)");
    return;
  }

  const userInfo = loadUserInfo();

  if (currentEditingId !== null) {
    // 수정 모드
    updateRecord(currentEditingId, {
      date: dateValue,
      weight: parseFloat(weightValue),
    });
    currentEditingId = null;
    document.getElementById("weight-save-btn").textContent = "기록 추가";
  } else {
    // 추가 모드
    const newRecord = {
      id: generateUniqueId(),
      date: dateValue,
      weight: parseFloat(weightValue),
    };
    addRecord(newRecord);
  }

  clearForm();
  renderRecordList(loadAllRecords(), userInfo.heightCm);
};

// 수정 / 삭제 버튼 — 이벤트 위임
const handleRecordAction = (event) => {
  const clickedButton = event.target;
  const targetId = clickedButton.dataset.id;

  if (clickedButton.classList.contains("delete-btn")) {
    deleteRecord(targetId);
    renderRecordList(loadAllRecords(), loadUserInfo().heightCm);
  }

  if (clickedButton.classList.contains("edit-btn")) {
    const allRecords = loadAllRecords();
    const targetRecord = allRecords.find((record) => record.id === targetId);

    if (targetRecord) {
      fillFormForEdit(targetRecord);
      currentEditingId = targetId;
      document.getElementById("weight-save-btn").textContent = "수정 완료";
    }
  }
};

// =====================
// 앱 시작
// =====================

initializeApp();
