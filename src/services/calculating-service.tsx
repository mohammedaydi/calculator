export const symbols: string[] = [
  "CE",
  "<",
  ".",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "(",
  "0",
  ")",
  "=",
  "%",
];

interface operation {
  sign: string;
  part: string;
}

const calculateSection = (equation: string): number => {
  let pmOperations: operation[] = [];

  const level1 = equation.split("+");
  console.log(level1);
  level1?.forEach((part) => {
    let arr: operation[] = [{ part: part, sign: "+" }];

    while (arr.length !== 0) {
      let flag = 0;

      for (let index = 0; index < arr[0].part.length; index++) {
        if (
          index !== 0 &&
          arr[0].part[index] === "-" &&
          arr[0].part[index - 1] !== "x" &&
          arr[0].part[index - 1] !== "/"
        ) {
          let leftSection = arr[0].part.slice(0, index);
          let rightSection = arr[0].part.slice(index + 1);

          let leftSign = arr[0].sign === "-" ? "-" : "+";
          arr.push({
            part: leftSection,
            sign: leftSign,
          });
          let rightSign;
          if (rightSection[0] === "-") {
            rightSign = "+";
            rightSection = rightSection.slice(1);
          } else {
            rightSign = "-";
          }

          arr.push({
            part: rightSection,
            sign: rightSign,
          });
          flag = 1;
          break;
        }
      }
      if (flag === 0) {
        console.log("--------------------");
        console.log({ sign: arr[0].sign, part: arr[0].part });
        console.log("--------------------");
        pmOperations.push({ sign: arr[0].sign, part: arr[0].part });
      }

      arr.shift();
      console.log(arr);
    }
  });

  let finalOps: operation[] = [];
  pmOperations.forEach(({ part, sign }) => {
    if (part.includes("x")) {
      let mulOperations: number[] = [];

      const muls = part.split("x");

      muls.forEach((p) => {
        if (!p.includes("/")) {
          if (p.includes("%")) {
            mulOperations.push(+p.slice(0, -1) / 100);
          } else {
            mulOperations.push(+p);
          }
        } else {
          const divs = p.split("/");
          let res = +divs[0];

          if (divs[0].includes("%")) {
            res = +divs[0].slice(0, -1) / 100;
          }

          divs.forEach((div, index) => {
            if (index !== 0) {
              let tmp: number;
              if (div.includes("%")) {
                tmp = +div.slice(0, -1) / 100;
              } else {
                tmp = +div;
              }
              res /= +tmp;
            }
          });
          mulOperations.push(res);
        }
      });
      let sectionResult = 1;

      mulOperations.forEach((item) => {
        sectionResult *= item;
      });
      console.log(part + " ------ " + sectionResult.toString());
      finalOps.push({ part: sectionResult.toString(), sign: sign });
    } else if (part.includes("/")) {
      const divs = part.split("/");
      let res = +divs[0];
      divs.forEach((div, index) => {
        if (index !== 0) {
          res /= +div;
        }
      });

      finalOps.push({ part: res.toString(), sign: sign });
    } else {
      if (part.includes("%")) {
        let f = +part.slice(0, -1) / 100;
        finalOps.push({ part: f.toString(), sign: sign });
      } else {
        finalOps.push({ part: part, sign: sign });
      }
    }
  });
  let finalRes = 0;

  finalOps.forEach(({ part, sign }) => {
    console.log(part);
    finalRes += sign === "+" ? +part : +-part;
  });
  return finalRes;
};

const modifyEquation = (
  equation: string,
  b1: number,
  b2: number,
  value: number
): string => {
  let part1 = equation.slice(0, b1);
  let part2 = value.toString();
  let part3 = equation.slice(b2 + 1);
  return part1 + part2 + part3;
};

const findBrackets = (equation: string) => {
  let rightb = -1;
  let eq = equation;

  while (eq.includes("(") || eq.includes(")")) {
    rightb = -1;
    for (let index = eq.length; index >= 0; index--) {
      const element = eq[index];
      if (element === "(" && rightb === -1) {
        alert("Error");
        return "";
      } else if (element === "(" && rightb !== -1) {
        const val = calculateSection(eq.slice(index + 1, rightb));
        eq = modifyEquation(eq, index, rightb, val);
        break;
      } else if (element === ")") {
        rightb = index;
      }
    }
  }

  return eq;
};

export const calculateResult = (equation: string) => {
  equation = equation.trim().replace(" ", "");

  const bracketFreeEquation = findBrackets(equation);
  let result = 0;
  if (bracketFreeEquation) {
    console.log(calculateSection(bracketFreeEquation));
  }

  return result.toString();
};
