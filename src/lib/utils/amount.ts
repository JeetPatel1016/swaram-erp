export function numberToWords(num: number | null): string {
  if(!num) return "";
  if (isNaN(num) || num < 0) return "Invalid input";

  if (num === 0) return "zero";

  const units: string[] = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens: string[] = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const scales: { divisor: number; name: string }[] = [
    { divisor: 10000000, name: "crore" },
    { divisor: 100000, name: "lakh" },
    { divisor: 1000, name: "thousand" },
    { divisor: 100, name: "hundred" },
  ];

  function twoDigits(n: number): string {
    if (n < 20) return units[n];
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return tens[ten] + (unit ? " " + units[unit] : "");
  }

  function convert(n: number): string {
    if (n === 0) return "";
    let result = "";

    for (const scale of scales) {
      const scaleValue = Math.floor(n / scale.divisor);
      if (scaleValue > 0) {
        result += convert(scaleValue) + " " + scale.name + " ";
        n %= scale.divisor;
      }
    }

    if (n > 0) {
      if (result !== "") result += "and ";
      if (n < 100) {
        result += twoDigits(n);
      } else {
        result += units[Math.floor(n / 100)] + " hundred";
        if (n % 100 !== 0) result += " and " + twoDigits(n % 100);
      }
    }

    return result.trim();
  }

  return capitalize(convert(num));
}

function capitalize(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
