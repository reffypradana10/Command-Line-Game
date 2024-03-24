import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playername;
let nilai = 0;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowtitle = chalkAnimation.rainbow("Siapa yang mau menjadi kaya \n");

  await sleep();
  rainbowtitle.stop();

  console.log(`
  ${chalk.bgBlue.bold("Cara Bermain")}
  Jawab semua Pertanyaan
  Jika kamu menjawab salah, aku ${chalk.bgRed("akan mengakhiri ujian")}
  Jadi, Jawablah dengan Benar ...
  `);
}
async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Siapa namamu?",
    default() {
      return "Pelajar";
    },
  });
  playername = answer.player_name;
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Javascript dibuat dalam 10 hari sebelum dirilis \n",
    choices: ["May 23 1995", "Nov 24 1995", "Des 4 1995", "Des 17 1996"],
  });

  const jawaban = answer.question_1 === "Des 4 1995";
  if (jawaban === true) {
    nilai += 1;
  }
  return handleAnswer(jawaban);
}
async function question2() {
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Kapan hari kemerdekaan indonesia \n",
    choices: ["17 agustus 1946", "18 agustus 1992", "17 agustus 1945", "18 agustus 1945"],
  });
  const jawaban = answer.question_2 === "17 agustus 1945";
  if (jawaban === true) {
    nilai += 1;
  }
  return handleAnswer(jawaban);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Cek jawaban").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Kerja Bagus ${playername}` });
  } else {
    spinner.error({ text: `Game Over, kamu kalah ${playername}` });
    console.log("Soal yang benar : " + nilai + "/2");
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Selamat, ${playername} ! \n Nilai 100 UNTUKMU`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    process.exit(0);
  });
}
await welcome();
await askName();
await question1();
await question2();
await winner();
