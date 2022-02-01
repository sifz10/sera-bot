const http = require("http");
const express = require("express");
// const keepAlive = require("./server");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

/**
 * Module Imports
 */
const Discord = require("discord.js");
const Canvas = require("canvas");
const {
  TOKEN,
  WelcomeChannel,
  WelcomeMessage,
  AutoRole,
  AutoRoleName,
  SetStatus,
  DM,
  DMMessage
} = require("./config.json");
const client = new Discord.Client({ disableEveryone: true });

// keepAlive();
client.login(TOKEN);


/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(SetStatus, { type: 'PLAYING' });
 // client.user.setStatus("idle"); // YOU CAN CHOUSE: online, idle, invisible, dnd (do not disturb)
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

client.on("message", (msg) => {
  if(msg.content === "Ping"){
    msg.reply("Hudday  Ping  Ping Chodau ken!")
  }
});


/**
 * CODE OF THE BOT
 */
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.get(WelcomeChannel);
  if (!channel) return;
  let role = member.guild.roles.cache.find(role => role.name == AutoRoleName);
  let background = await Canvas.loadImage("https://media.discordapp.net/attachments/693465490760400987/937470952034414693/Screenshot_69.png?width=1187&height=671");
  let avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );
  let canvas = Canvas.createCanvas(1300, 700);
  let ctx = canvas.getContext("2d");
  ctx.patternQuality = "bilinear";
  ctx.filter = "bilinear";
  ctx.antialias = "subpixel";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.drawImage(background, 0, 0, 1300, 700);
  ctx.font = "70px Arial";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.tag, 980, 430);
  ctx.font = "40px Arial Bold";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(`Members No #${member.guild.memberCount}`, 980, 500);
  ctx.fillText(`Joined At #${member.joinedAt.toDateString()}`, 980, 600);
  ctx.beginPath();
  ctx.arc(967, 235.5, 110, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 830, 125, 260, 260);
  var welcomeMsg = WelcomeMessage.replace("[[user]]", member.user);
  welcomeMsg = welcomeMsg.replace("[[server]]", member.guild.name);
  welcomeMsg = welcomeMsg.replace("[[members]]",member.guild.memberCount);
  let file = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
  setTimeout(() => {
    channel.send(welcomeMsg, file);
  }, 2000);
  
if(AutoRole === true){
if (!role)return console.log("**Couldn't find that role**");
if (role) return member.roles.add(role);    
}
if(DM === true){
if (DMMessage) return member.send(DMMessage);    
}else return;  
});
