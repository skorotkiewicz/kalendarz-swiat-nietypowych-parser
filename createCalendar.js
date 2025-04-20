import fetchCalendar from "./src/index.js";

(async () => {
  const list = await fetchCalendar();
  console.log(list);

  // array with objects like:
  // { month: 2, day: 2, year: 2020, name: 'Światowy Dzień Mokradeł' }
})();
