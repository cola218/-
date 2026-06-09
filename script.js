const SQM_PER_PING = 3.3058;

const landPrices = {
  "台北市": 120,
  "新北市": 60,
  "台中市": 40,
  "高雄市": 35,
  "其他縣市": 20
};

const regionInput = document.getElementById("region");
const areaInput = document.getElementById("area");
const unitInput = document.getElementById("unit");
const pingOutput = document.getElementById("pingOutput");
const priceOutput = document.getElementById("priceOutput");
const totalOutput = document.getElementById("totalOutput");

function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: digits
  }).format(value);
}

function getPingArea(area, unit) {
  if (unit === "sqm") {
    return area / SQM_PER_PING;
  }

  return area;
}

function calculateLandValue() {
  const selectedRegion = regionInput.value;
  const unit = unitInput.value;
  const area = Number(areaInput.value);
  const safeArea = Number.isFinite(area) && area > 0 ? area : 0;
  const pingArea = getPingArea(safeArea, unit);
  const pricePerPing = landPrices[selectedRegion] ?? landPrices["其他縣市"];
  const totalValue = pingArea * pricePerPing;

  pingOutput.textContent = `${formatNumber(pingArea)} 坪`;
  priceOutput.textContent = `${formatNumber(pricePerPing, 0)} 萬元/坪`;
  totalOutput.textContent = `${formatNumber(totalValue, 0)} 萬元`;
}

[regionInput, areaInput, unitInput].forEach((input) => {
  input.addEventListener("input", calculateLandValue);
  input.addEventListener("change", calculateLandValue);
});

calculateLandValue();
