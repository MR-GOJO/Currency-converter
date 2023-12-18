const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let choices = document.querySelectorAll(".choice select");
let button = document.querySelector("button");
const fromCountry = document.querySelector(".from select");
const toCountry = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (select of choices) {
  for (country in countryList) {
    let newChoice = document.createElement("option");
    newChoice.textContent = country;
    newChoice.value = country;
    select.append(newChoice);

    if (select.name === "from" && country === "USD") {
      newChoice.selected = "selected";
    } else if (select.name === "to" && country === "INR") {
      newChoice.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (e) => {
  let country = e.value;
  let countryCode = countryList[country];
  console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCountry.value.toLowerCase()}/${toCountry.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCountry.value.toLowerCase()];

  let finalAmt = rate * amtVal
console.log(finalAmt);

msg.textContent = `${amtVal} ${fromCountry.value} = ${finalAmt} ${toCountry.value}`
};

button.addEventListener("click", () => {
  updateExchangeRate();
});
