import db from "./.cache/db.json" assert { type: "json" };

const groupedByDate = db.reduce((acc, item) => {
  const date = new Date(item.year, item.month - 1, item.day);
  const formattedDate = date.toLocaleDateString("pl-PL", {
    month: "long",
    day: "numeric",
  });
  if (!acc[formattedDate]) {
    acc[formattedDate] = [];
  }
  acc[formattedDate].push(item.name);
  return acc;
}, {});

// Funkcja pobierająca święta według podanej daty
function getHolidaysByDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toLocaleDateString("pl-PL", {
    month: "long",
    day: "numeric",
  });
  return groupedByDate[formattedDate] || [];
}

// Przykład użycia funkcji
console.log(getHolidaysByDate(2025, 4, 20)); // ["Międzynarodowy Dzień Wolnej Prasy", "urodziny Führera", "Międzynarodowy Dzień Marihuany"]
