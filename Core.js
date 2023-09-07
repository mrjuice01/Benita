process.on("uncaughtException", console.error);
require("./config");

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { exec } = require("child_process");
const moment = require("moment-timezone");
const { EmojiAPI } = require("emoji-api");
const { addBalance } = require("./lib/limit.js");

const _ = require("lodash");
const yargs = require("yargs/yargs");
var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB");

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb/.test(opts["db"])
    ? new mongoDB(opts["db"])
    : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db)
  global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    ...(global.db || {}),
  };

let pendaftar = JSON.parse(fs.readFileSync("./storage/user/user.json"));
let balance = JSON.parse(fs.readFileSync("./database/balance.json"));
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
let _sewa = require("./lib/sewa");
const sewa = JSON.parse(fs.readFileSync("./database/sewa.json"));
var myHari = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var tgel = new Date();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();

module.exports = Stalker = async (Stalker, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    const prefix = global.prefa;
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(1).trim().split(" ")[0].toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await Stalker.decodeJid(Stalker.user.id);
    const from = m.chat;
    const isUser = pendaftar.includes(m.sender);

    autoreadsw = true;
    _sewa.expiredCheck(Stalker, sewa);

    const reply = (teks) => {
      Stalker.sendMessage(m.chat, { text: teks }, { quoted: m });
    };

    const replay = (teks) => {
      Stalker.sendMessage(m.chat, { text: teks }, { quoted: m });
    };

    function randomNomor(angka) {
      return Math.floor(Math.random() * angka) + 1;
    }

    if (m.message) {
      addBalance(m.sender, randomNomor(574), balance);
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? pushname : "Private Chat", m.chat)
      );
    }

    if (isCmd && !isUser) {
      pendaftar.push(m.sender);
      fs.writeFileSync("./storage/user/user.json", JSON.stringify(pendaftar));
    }

    if (autoreadsw) {
      if (from === "status@broadcast") {
        Stalker.chatRead(from);
      }
    }

    if (global.autoreadpmngc) {
      if (command) {
        await Stalker.sendPresenceUpdate("composing", m.chat);
        Stalker.sendReadReceipt(from, m.sender, [m.key.id]);
      }
    }
    /*
  if (global.autoReadGc) {
  if (m.isGroup) { Stalker.sendReadReceipt(m.chat, m.sender, [m.key.id]) }
}
*/

    if (global.autoReadAll) {
      if (m.chat) {
        Stalker.sendReadReceipt(m.chat, m.sender, [m.key.id]);
      }
    }

    if (global.autoRecord) {
      if (m.chat) {
        Stalker.sendPresenceUpdate("recording", m.chat);
      }
    }

    if (global.autoTyping) {
      if (m.chat) {
        Stalker.sendPresenceUpdate("composing", m.chat);
      }
    }

    if (global.available) {
      if (m.chat) {
        Stalker.sendPresenceUpdate("available", m.chat);
      }
    }

    const hariRaya = new Date("6 1, 2022 00:00:00");
    const sekarang = new Date().getTime();
    const Selisih = hariRaya - sekarang;
    const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor(
      (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mmmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    const ddetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    const ultah = `${jhari}Day ${jjam}Hour ${mmmenit}Minute ${ddetik}Second`;

    async function hitungmundur(bulan, tanggal) {
      let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
      let now = Date.now();
      let distance = from - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return (
        days +
        "Day " +
        hours +
        "Hour " +
        minutes +
        "Minute " +
        seconds +
        "Second"
      );
    }
    // Using without prefix

    switch (userInput) {
      case "help":
      case "menu":
      case "bot":
        txt = `Hello👋🏻 *${pushname}* Im Baymax AI. 
Made on earth by Mr Juice

Here Is My Menu

➩ Images🖼️

❐ #img, #draw
[generates image]

➩ PDF sending 📄

❐ #accounting, #business, #english, #geography, #history, #math,  #science

➩ Education📗

❐ #cauculate, #define, #rephrase, #simplify,

➩ English literature📔

❐ #write a story, #write a essay, #write a latter, #write a poem

➩ Exams Side📚

❐ #download exam

➩ Novels📖

❐ #download novel

➩ News & Weather🗞️

❐ #weather, #news, #updates about, #information about

➩ Fun🤣😅

❐ #joke, #bedtime story #romantic story, #advice

Note📝: Use # before asking bot to generate images or to download papers or get news updates.

Note📝: Bot Can be conversational so you can chat like a human

Note📝: Share our bot contact to all your friends`;
        reply(txt);
        break;

      /*case "dalle":
        async function generateImage(prompt) {
          const API_URL = "https://api.openai.com/v1/images/generations";

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${global.openAiAPI}`,
          };

          const data = {
            model: "image-alpha-001",
            prompt: prompt,
            n: 1,
            size: "256x256",
          };

          try {
            const response = await axios.post(API_URL, data, {
              headers: headers,
            });
            return response.data.data[0].url;
          } catch (error) {
            console.error("Error generating image:", error);
            return null;
          }
        }

        generateImage(inputText)
          .then((imageUrl) => {
            if (!imageUrl) {
              return reply("Failed to generate an image. Please try again.");
            }
            client.sendMessage(
              m.chat,
              { image: { url: imageUrl }, caption: inputText },
              { quoted: m }
            );
          })
          .catch((error) => {
            console.error("Error getting image:", error);
          });
        break;*/

      case "accounting":
        pdf2 = fs.readFileSync("./PDFs/Accounting/accounting-2018-2.pdf");
        pdf = fs.readFileSync("./PDFs/Accounting/accounting-2018.pdf");
        pdf3 = fs.readFileSync("./PDFs/Accounting/accounting-2020.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "accounting-2018.pdf" },
          { quoted: m }
        );
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf2, fileName: "accounting-2018-2.pdf" },
            { quoted: m }
          );
        }, 2000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "accounting-2020.pdf" },
            { quoted: m }
          );
        }, 4000);
        break;

      case "business":
        pdf = fs.readFileSync("./PDFs/Business/business-2020.pdf");
        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "business-2020.pdf" },
          { quoted: m }
        );
        break;

      case "english":
        pdf = fs.readFileSync("./PDFs/English/english-2018.pdf");
        pdf2 = fs.readFileSync("./PDFs/English/english-2019.pdf");
        pdf3 = fs.readFileSync("./PDFs/English/english-2019-2.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "english-2018.pdf" },
          { quoted: m }
        );
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf2, fileName: "english-2019.pdf" },
            { quoted: m }
          );
        }, 2000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "english-2019-2.pdf" },
            { quoted: m }
          );
        }, 4000);

        break;

      case "geography":
        pdf = fs.readFileSync("./PDFs/Geography/geography-2018.pdf");
        pdf2 = fs.readFileSync("./PDFs/Geography/geography-2018-2.pdf");
        pdf3 = fs.readFileSync("./PDFs/Geography/geography-2019.pdf");
        pdf4 = fs.readFileSync("./PDFs/Geography/geography-2019-2.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "geography-2018.pdf" },
          { quoted: m }
        );
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf2, fileName: "geography-2018-2.pdf" },
            { quoted: m }
          );
        }, 2000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "geography-2019.pdf" },
            { quoted: m }
          );
        }, 4000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf4, fileName: "geography-2019-2.pdf" },
            { quoted: m }
          );
        }, 6000);
        break;

      case "history":
        pdf = fs.readFileSync("./PDFs/History/history-2018.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "history-2018.pdf" },
          { quoted: m }
        );

        break;

      case "math":
      case "mathematics":
        pdf = fs.readFileSync("./PDFs/Mathematics/mathematics-2018.pdf");
        pdf2 = fs.readFileSync("./PDFs/Mathematics/mathematics-2019.pdf");
        pdf3 = fs.readFileSync("./PDFs/Mathematics/mathematics-2019-2.pdf");
        pdf4 = fs.readFileSync("./PDFs/Mathematics/mathematics-2020.pdf");
        pdf5 = fs.readFileSync("./PDFs/Mathematics/mathematics-2021.pdf");
        pdf6 = fs.readFileSync("./PDFs/Mathematics/mathematics-2022.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "mathematics-2018.pdf" },
          { quoted: m }
        );
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf2, fileName: "mathematics-2019.pdf" },
            { quoted: m }
          );
        }, 2000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "mathematics-2019-2.pdf" },
            { quoted: m }
          );
        }, 4000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf4, fileName: "mathematics-2020.pdf" },
            { quoted: m }
          );
        }, 6000);

        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "mathematics-2021.pdf" },
            { quoted: m }
          );
        }, 8000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf4, fileName: "mathematics-2022.pdf" },
            { quoted: m }
          );
        }, 10000);

        break;

      case "science":
        pdf = fs.readFileSync("./PDFs/Science/science-2018.pdf");
        pdf2 = fs.readFileSync("./PDFs/Science/science-2018-2.pdf");
        pdf3 = fs.readFileSync("./PDFs/Science/science-2019.pdf");
        pdf4 = fs.readFileSync("./PDFs/Science/science-2019-2.pdf");
        pdf5 = fs.readFileSync("./PDFs/Science/science-2020.pdf");

        await client.sendMessage(
          m.chat,
          { document: pdf, fileName: "science-2018.pdf" },
          { quoted: m }
        );
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf2, fileName: "science-2018-2.pdf" },
            { quoted: m }
          );
        }, 2000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf3, fileName: "science-2019.pdf" },
            { quoted: m }
          );
        }, 4000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf4, fileName: "science-2019-2.pdf" },
            { quoted: m }
          );
        }, 6000);
        setTimeout(() => {
          client.sendMessage(
            m.chat,
            { document: pdf5, fileName: "science-2020.pdf" },
            { quoted: m }
          );
        }, 8000);
        break;

      default:
        /*const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        async function generateResponse(prompt, retries = 2) {
          try {
            const completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
            });

            console.log("API Key:", global.openAiAPI);

            return completion.data.choices[0].message.content.trim();
          } catch (error) {
            if (
              error.response &&
              error.response.status === 429 &&
              retries > 0
            ) {
              const retryAfter =
                error.response.headers["retry-after"] * 1000 || 5000;
              reply(
                `Rate limit exceeded. Retrying in ${retryAfter / 1000
                } seconds...`
              );
              await sleep(retryAfter);
              return generateResponse(prompt, retries - 1);
            } else {
              console.error(error);
              return "Error occurred while generating response";
            }
          }
        }

        generateResponse(inputText)
          .then((response) => {
            return client.sendMessage(m.chat, { text: response }, { quoted: m });
          })
          .catch((error) => {
            console.error("Error getting response:", error);
          });*/

        break;
    }
    switch (command) {
      case "nowa":
      case "stalk":
      case "stalknumber":
        {
          if (!args[0])
            return reply(
              `Use command like: ${prefix}stalk 2637806999××\n\nWhere, 91 is country code and x is missing digits of number`
            );
          var inputnumber = args[0];
          if (!inputnumber.includes("x"))
            return reply("You didnot added x\n\nExample: -stalk 2637806999××");
          reply(
            `Searching for WhatsApp account in given range...\n\nPlease wait while i fetch details...`
          );
          function countInstances(string, word) {
            return string.split(word).length - 1;
          }
          var number0 = inputnumber.split("x")[0];
          var number1 = inputnumber.split("x")[countInstances(inputnumber, "x")]
            ? inputnumber.split("x")[countInstances(inputnumber, "x")]
            : "";
          var random_length = countInstances(inputnumber, "x");
          var randomxx;
          if (random_length == 1) {
            randomxx = 10;
          } else if (random_length == 2) {
            randomxx = 100;
          } else if (random_length == 3) {
            randomxx = 1000;
          } else if (random_length == 4) {
            randomxx = 10000;
          }
          var nomerny = `*『 List of Whatsapp Numbers 』*\n\n`;
          var nobio = `\n*Bio:*  "Hey there! I am using WhatsApp".\n`;
          var nowhatsapp = `\n*Numbers with no WhatsApp account within the range you provided*\n`;
          for (let i = 0; i < randomxx; i++) {
            var nu = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var status1 = nu[Math.floor(Math.random() * nu.length)];
            var status2 = nu[Math.floor(Math.random() * nu.length)];
            var status3 = nu[Math.floor(Math.random() * nu.length)];
            var status4 = nu[Math.floor(Math.random() * nu.length)];
            var dom4 = nu[Math.floor(Math.random() * nu.length)];
            var rndm;
            if (random_length == 1) {
              rndm = `${status1}`;
            } else if (random_length == 2) {
              rndm = `${status1}${status2}`;
            } else if (random_length == 3) {
              rndm = `${status1}${status2}${status3}`;
            } else if (random_length == 4) {
              rndm = `${status1}${status2}${status3}${status4}`;
            } else if (random_length == 5) {
              rndm = `${status1}${status2}${status3}${status4}${dom4}`;
            }

            var anu = await Stalker.onWhatsApp(
              `${number0}${i}${number1}@s.whatsapp.net`
            );
            var anuu = anu.length !== 0 ? anu : false;
            try {
              try {
                var anu1 = await Stalker.fetchStatus(anu[0].jid);
              } catch {
                var anu1 = "401";
              }
              if (anu1 == "401" || anu1.status.length == 0) {
                nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
              } else {
                nomerny += `🎀 *Number:* wa.me/${
                  anu[0].jid.split("@")[0]
                }\n🔹 *Bio :* ${anu1.status}\n🔸 *Updated On :* ${moment(
                  anu1.setAt
                )
                  .tz("Asia/Kolkata")
                  .format("DD/MM/YYYY")}\n\n`;
              }
            } catch {
              nowhatsapp += `${number0}${i}${number1}\n`;
            }
          }
          reply(`${nomerny}${nobio}${nowhatsapp}`);
        }
        break;

      default:
        if (budy.startsWith("=>")) {
          if (!isCreator) return reply(mess.botowner);
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return reply(bang);
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)));
          } catch (e) {
            Stalker.sendMessage(
              from,
              { image: ErrorPic, caption: String(e) },
              { quoted: m }
            );
          }
        }

        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.database;
          if (!(budy.toLowerCase() in msgs)) return;
          Stalker.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    Stalker.sendMessage(`${ownertag}@s.whatsapp.net`, util.format(err), {
      quoted: m,
    });
    console.log(err);
  }
};
