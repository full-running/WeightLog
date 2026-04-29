// 기본정보 저장
const handleSetupSave = () => {
  const selectedGender = document.querySelector("input[name='gender']:checked");
  const heightInput = document.getElementById("height-input").value;
  const selectedConsent = document.querySelector(
    "input[name='consent']:checked",
  );

  if (selectedGender === null) {
    alert("성별을 선택해주세요.");
    return;
  }

  if (!isValidHeight(heightInput)) {
    alert("키를 올바르게 입력해주세요. (100cm ~ 250cm)");
    return;
  }

  if (selectedConsent === null) {
    alert("정보 저장 방식을 선택해주세요.");
    return;
  }

  const userInfo = {
    gender: selectedGender.value,
    heightCm: parseFloat(heightInput),
  };

  // 동의 방식에 따라 저장 분기
  saveUserInfo(userInfo, selectedConsent.value);
  showMainSection();
  renderRecordList(loadAllRecords(), userInfo.heightCm);
};
