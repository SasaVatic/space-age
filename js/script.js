const orbitalPeriodsEarthYears = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};
const EARTH_ORBIT_SECONDS = 31557600;
const calculatorElement = document.querySelector('.calculator');
const selectElement = document.querySelector('select');
const dateInput = document.querySelector('input[type=date]');
const btnCalculate = document.querySelector('.btn-calculate');
const resultElement = document.querySelector('.result');
const dateErrorTxt = document.querySelector('.date-error');
const planetErrorTxt = document.querySelector('.planet-error');
let dateValue;
let planetName;
let isCalculated = false;
let timeoutHandler;

const date = new Date(Date.now());
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
dateInput.max = `${year}-${month}-${day < 10 ? '0' + day : day}`;

function renderPlanetOptions() {
  const selectOptions = ['<option value="">--Choose--</option>'];
  let capitalizedName;

  for (const [key, value] of Object.entries(orbitalPeriodsEarthYears)) {
    capitalizedName = key.slice(0, 1).toUpperCase() + key.slice(1);

    selectOptions.push(`<option value="${key}">${capitalizedName}</option>`);
  }

  selectElement.innerHTML = selectOptions.join('');
}

function validateInputs() {
  dateValue = dateInput.value;
  planetName = selectElement.value;

  if (!dateValue || !planetName) {
    if (!dateValue) {
      dateErrorTxt.classList.remove('hidden');
    } else {
      dateErrorTxt.classList.add('hidden');
    }
    if (!planetName) {
      planetErrorTxt.classList.remove('hidden');
    } else {
      planetErrorTxt.classList.add('hidden');
    }
    return false;
  }

  dateErrorTxt.classList.add('hidden');
  planetErrorTxt.classList.add('hidden');

  return true;
}

function calculateAge() {
  if (!validateInputs()) {
    return;
  }

  const birthDate = new Date(dateInput.value);
  const birthDateToSeconds = (Date.now() - birthDate.getTime()) * 0.001;

  const years = parseFloat(
    (
      birthDateToSeconds /
      (orbitalPeriodsEarthYears[planetName.toLowerCase()] * EARTH_ORBIT_SECONDS)
    ).toFixed(2)
  );

  const capitalizePlanetName = `${
    planetName.slice(0, 1).toUpperCase() + planetName.slice(1)
  }`;
  resultElement.innerHTML = `<p class="text-xl">Your ${capitalizePlanetName} age is: <span class="font-black">${years}</span> years</p>`;
  resultElement.classList.add('translate-y-[95%]');

  timeoutHandler = setTimeout(() => {
    isCalculated = true;
  }, 300);
}

renderPlanetOptions();

btnCalculate.onclick = () => {
  calculateAge();
};

calculatorElement.onclick = () => {
  if (isCalculated) {
    resultElement.classList.remove('translate-y-[95%]');
    isCalculated = false;
    clearTimeout(timeoutHandler);
  }
};
