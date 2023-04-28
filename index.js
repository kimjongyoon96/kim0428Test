import inquirer from "inquirer";
import fs from "fs";

function createFile(filetitle, contents) {
  fs.writeFile(`./result/${filetitle}.html`, contents, function(error) {
    if(error === null) {
      console.log('성공');
    } else {
      console.log('실패');
    }
  });
}

function makeHTML(title, data, useRootDiv) {
  let rootDiv = "";
  if (useRootDiv === "yes") {
    rootDiv = "<div id='root'>";
  }
  let htmlBox = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body>
        ${rootDiv}<p>${data}</p>${useRootDiv === "yes" ? "</div>" : ""}
      </body>
    </html>
    `;
  return htmlBox;
}

inquirer
  .prompt([
    {
      type: "input",
      name: "fileName",
      message: "HTML 파일 이름",
      validate: (input) => {
        if (!input) {
          return "HTML 파일 이름을 입력하세요.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "titleTag",
      message: "title 태그에 들어갈 내용을 입력하세요.",
      validate: (input) => {
        if (!input) {
          return "title 태그에 들어갈 내용을 입력하세요.";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "useRootDiv",
      message: "최상위 div 태그 사용 여부",
      choices: ["yes", "no"],
    },
    {
      type: "input",
      name: "detail",
      message: "본문을 작성하세요.",
      validate: (input) => {
        if (!input) {
          return "본문을 입력하세요.";
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "confirm",
      message: "제출하시겠습니까?",
    },
  ])
  .then((answers) => {
    if (answers.confirm) {
      createFile(
        answers.fileName,
        makeHTML(answers.titleTag, answers.detail, answers.useRootDiv)
      );
    }
  });