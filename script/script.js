const monthTotal = document.querySelector(".total-amount");
const lastMonthTotal = document.querySelector(".total-percent");
const moneySpent = document.querySelectorAll(".column__value");
const moneygraph = document.querySelectorAll(".column__graph");
const graphDay = document.querySelectorAll(".column__day");
const chart = document.querySelector(".chart");
const lastMonth = 466.86;

// How to Obtain the information in an external File.
async function dayData() {
  return (await fetch("./script/data.json")).json();
}

document.addEventListener("DOMContentLoaded", async () => {
  let data;
  try {
    data = await dayData();
  } catch (e) {
    console.log("error");
  }

  // CALCULATE MONTH TOTAL
  const total = data.reduce(function (amt, dt) {
    return dt.amount + amt;
  }, 0);

  monthTotal.textContent = `$ ${total}`;

  // CALULATE INCREASE OR DECREASE FROM LAST MONTH
  lastMonthTotal.textContent = `${total < lastMonth ? "-" : "+"}${(
    (total / lastMonth) *
    100
  ).toFixed(1)}%`;

  // GENERATE HEIGHT OF GRAPH
  moneygraph.forEach(function (mg, i) {
    document.getElementById(mg.id).style.height = `${Math.trunc(
      data.at(i).amount * 2.8
    )}px`;
  });

  // PRINT GRAPH VALUE
  moneySpent.forEach(function (ms, i) {
    ms.textContent = `$${data.at(i).amount}`;
    //ms.classList.add("hidden"); //add "hidden" class on all the "column__value" classes.
  });

  // PRINT GRAPH DAY
  graphDay.forEach(function (gd, i) {
    gd.textContent = data.at(i).day;
  });

  // TODAY'S DATE
  const day = new Date().getDay();

  moneygraph.forEach(function (mg) {
    mg.classList.remove("today"); //remove "today" class on all the "column__graph" classes.
  });

  document
    .getElementById(`column__graph--${day === 0 ? 7 : day}`)
    .classList.add("today");

  // REVEAL GRAPH VALUE
  const revealValue = function (e) {
    const value = e.target.closest(".column");
    if (!value) return;

    if (this == 1) {
      value.querySelector(".column__value").classList.add("reveal");
    } else {
      value.querySelector(".column__value").classList.remove("reveal");
    }
  };

  chart.addEventListener("mouseover", revealValue.bind(1));
  chart.addEventListener("mouseout", revealValue.bind(0));
});
