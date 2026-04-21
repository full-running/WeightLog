"use strict";

// storage.js
// LocalStorage CRUD 전담 모듈
// 다른 파일에서 localStorage를 직접 건드리지 않고 이 파일을 통해서만 접근
// 키 문자열이 바뀌거나 저장 방식이 바뀔 때 이 파일만 수정하면 됨

// 키 상수를 한 곳에서 관리 — 오타로 인한 버그 방지
const STORAGE_KEY = {
  USER_INFO: "weightlog_user_info",
  RECORDS: "weightlog_records",
};

// 기본정보 저장 (성별, 키)
const saveUserInfo = (userInfo) => {
  localStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify(userInfo));
};

// 기본정보 불러오기
// 없으면 null 반환 → app.js에서 첫 방문 여부 판단에 사용
const loadUserInfo = () => {
  const storedUserInfo = localStorage.getItem(STORAGE_KEY.USER_INFO);
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
};

// 체중 기록 전체 불러오기
// 없으면 빈 배열 반환 → render.js에서 null 체크 없이 바로 순회 가능
const loadAllRecords = () => {
  const storedRecords = localStorage.getItem(STORAGE_KEY.RECORDS);
  return storedRecords ? JSON.parse(storedRecords) : [];
};

// 전체 덮어쓰기 방식으로 저장
// add / delete / update 모두 이 함수를 통해서 저장 → 저장 로직 단일화
const saveAllRecords = (records) => {
  localStorage.setItem(STORAGE_KEY.RECORDS, JSON.stringify(records));
};

// 체중 기록 추가
const addRecord = (newRecord) => {
  const existingRecords = loadAllRecords();
  existingRecords.push(newRecord);
  saveAllRecords(existingRecords);
};

// 체중 기록 삭제 (id 기준)
// filter로 해당 id만 제외한 배열을 새로 만들어 저장
const deleteRecord = (targetId) => {
  const filteredRecords = loadAllRecords().filter(
    (record) => record.id !== targetId,
  );
  saveAllRecords(filteredRecords);
};

// 체중 기록 수정 (id 기준)
// map으로 해당 id만 교체 — 나머지 기록은 그대로 유지
const updateRecord = (targetId, updatedFields) => {
  const updatedRecords = loadAllRecords().map((record) =>
    record.id === targetId ? { ...record, ...updatedFields } : record,
  );
  saveAllRecords(updatedRecords);
};
