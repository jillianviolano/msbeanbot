//source for bones of the Twitch API code- https://dev.twitch.tv/docs/irc
//rest of the content is written by Jillian Violano, with the help of W3 school's courses on 
//javascript and testing extensively with friends using the bot. Basically, I challenged them
//to break my bot, and where they did, I would fix, for a more well adjusted bot.

const tmi = require("tmi.js");

//initialize boolean that there is not a game running on at boot up of the bot.
let hmgame = false;

//initializing an array of words to choose from for the game. These words are inside jokes, 
//favorite characters, friends names, or references to popular games, 
//such as Dead by Daylight, Minecraft, Phasmophobia, and Kingdom Hearts
const words = [
  "jellybean",
  "ferveras",
  "rats",
  "simping",
  "hippopotamouse",
  "merlingaming",
  "mitsuki",
  "purgatory",
  "phasmophobia",
  "banshee",
  "demon",
  "goryo",
  "hantu",
  "jinn",
  "mare",
  "myling",
  "obake",
  "oni",
  "onryo",
  "phantom",
  "poltergeist",
  "raiju",
  "revenant",
  "shade",
  "spirit",
  "twins",
  "wraith",
  "yurei",
  "yokai",
  "mimic",
  "shigaraki",
  "trickster",
  "beamer",
  "firewall",
  "bomberman",
  "megaman",
  "voodoo",
  "mirror",
  "music",
  "summoning",
  "circle",
  "writing",
  "ghost",
  "tarot",
  "hangman",
  "priestess",
  "death",
  "devil",
  "luigi",
  "ouija",
  "dots",
  "projector",
  "candle",
  "emf",
  "reader",
  "flashlight",
  "book",
  "camera",
  "photo",
  "video",
  "ultraviolet",
  "lights",
  "crucifix",
  "glowstick",
  "mounted",
  "head",
  "lighter",
  "motion",
  "sensor",
  "parabolic",
  "microphone",
  "salt",
  "shaker",
  "sanity",
  "smudge",
  "pills",
  "sticks",
  "strong",
  "thermometer",
  "tripod",
  "haunted",
  "freezing",
  "temperature",
  "fingerprints",
  "five",
  "orbs",
  "voice",
  "hunt",
  "event",
  "interaction",
  "child",
  "adult",
  "old",
  "kill",
  "murder",
  "pickles",
  "hide",
  "quiet",
  "chain",
  "spooky",
  "yoink",
  "yote",
  "espeon",
  "marbles",
  "uwu",
  "sign",
  "yeet",
  "starbucks",
  "gnome",
  "drama",
  "villain",
  "incredible",
  "burger",
  "zoinks",
  "family",
  "rose",
  "astrid",
  "hazel",
  "haddie",
  "sally",
  "banjo",
  "lady",
  "butt",
  "coco",
  "cooper",
  "daisy",
  "peanut",
  "key",
  "hatch",
  "basement",
  "bloodpoints",
  "bloodweb",
  "charms",
  "chests",
  "perks",
  "items",
  "pneumonoultramicroscopicsilicovolcanoconiosis",
  "flashlights",
  "generator",
  "healing",
  "healthy",
  "injured",
  "pallets",
  "aura",
  "build",
  "camp",
  "demo",
  "exposed",
  "farming",
  "gate",
  "heartbeat",
  "loop",
  "moonwalk",
  "mori",
  "sandbag",
  "tunnel",
  "photobomb",
  "totem",
  "hook",
  "trapper",
  "nurse",
  "hag",
  "doctor",
  "huntress",
  "clown",
  "cannibal",
  "plague",
  "demogorgon",
  "deathslinger",
  "executioner",
  "blight",
  "nemesis",
  "artist",
  "cenobite",
  "achievements",
  "charms",
  "perks",
  "offerings",
  "items",
  "bloodpoints",
  "grades",
  "levels",
  "ranks",
  "crows",
  "lockers",
  "windows",
  "dwight",
  "meg",
  "claudette",
  "jake",
  "feng",
  "kate",
  "nancy",
  "steve",
  "minecraft",
  "dungeons",
  "equipment",
  "skins",
  "pets",
  "adventure",
  "players",
  "resources",
  "leaves",
  "decay",
  "regenerates",
  "bedrock",
  "enderman",
  "blocks",
  "furnaces",
  "wood",
  "woodland",
  "iron",
  "diamond",
  "snow",
  "golems",
  "boats",
  "java",
  "leashed",
  "logs",
  "survival",
  "hardcore",
  "creative",
  "demo",
  "crafting",
  "smelting",
  "brewing",
  "upgrading",
  "redstone",
  "enchanting",
  "trading",
  "anvil",
  "farming",
  "technical",
  "story",
  "difficulties",
  "weapons",
  "armor",
  "artifacts",
  "consumables",
  "souls",
  "trials",
  "beginner",
  "biomes",
  "mobs",
  "effects",
  "packs",
  "location",
  "emeralds",
  "bees",
  "hostile",
  "passive",
  "summoned",
  "powerful",
  "ambush",
  "story",
  "villages",
  "chaos",
  "quest",
  "celebrate",
  "evil",
  "kindness",
  "save",
  "orb",
  "rebuild",
  "jungle",
  "fragments",
  "monsters",
  "flora",
  "destroy",
  "shard",
  "winter",
  "island",
  "mountain",
  "beta",
  "outbreak",
  "game",
  "ran",
  "closed",
  "multiplayer",
  "scrolls",
  "console",
  "development",
  "mojang",
  "void",
  "heart",
  "obsidian",
  "end",
  "destruction",
  "threatening",
  "shattered",
  "keyblade",
  "speedrun"
];

//initializing a hangman game class
class hangman {
  constructor() {
    //lives are how many letter attempts
    this.lives = 10;
    // i is a random number generator to pick a word for the game
    this.i = Math.floor(Math.random() * words.length);
    this.word = words[this.i];
    //hidden is our word hidden and to be revealed
    this.hidden = "_";
    for (let step = 1; step < this.word.length; step++) {
      this.hidden += "_";
    }
    //initialization of the letters we have already guessed,
    //since the guesses may get lost in chat or a refresh of chat
    this.letters = [];
  }
  //command to end the game and reset the content to play again.
  end() {
    hmgame = false;
    this.lives = 10;
    this.i = Math.floor(Math.random() * words.length);
    this.word = words[this.i];
    this.hidden = "_";
    for (let step = 1; step < this.word.length; step++) {
      this.hidden += "_";
    }
    this.letters = [];
  }
  // guess method, used to guess a letter and implement a correct
  //or wrong guess.
  guess(letter) {
    //correct guess and replace the underscores with guessed letter
    //in correct spots
    if (this.word.includes(letter)) {
      for (let step = 0; step < this.hidden.length; step++) {
        if (this.word[step] === letter) {
          this.hidden = this.hidden.replaceAt(step, letter);
        }
      }
    }  else { //incorrect guess
      this.lives -= 1;
    }
    //add already guessed letters to letter list
    this.letters = this.letters + letter;
  }
}

//checks that expression is correct type of entry
const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    //my personal twitch channel for testing
    "SodiumFreeSalts"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

//initialize a new hangman game
let hm = new hangman();

String.prototype.replaceAt = function(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};
// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
  
  if (msg.startsWith("!")) {
    //let isMod = true;
    //client.say(target, `${target}, ${context[2]}, ${msg}, ${self}, ${isMod}`);
    const [raw, command, argument] = msg.match(regexpCommand);
    // Remove whitespace from chat message
    const commandName = msg.trim();
    
    //command name to ensure bot is currently running
    if (commandName === "!rollcall") {
      client.say(target, `MsBeanBot reporting for duty!!`);
    } else if (commandName === "!hm start" ) { //start a game of hangman
      //check to see if there is already a game in progress
      if (!hmgame) {
        hmgame = true;
        client.say(
          target,
          `New game started! PogChamp ${hm.lives} lives remaining. Guess a letter with !hm [letter].  ${hm.hidden} (${hm.word.length} letters)`
        );
      } else { 
        client.say(
          target,
          `There is already a game going. SeemsGood LUL There are ${hm.lives} lives remaining. Guess a letter with !hm [letter].  ${hm.hidden} (${hm.word.length} letters)`
        );
      }
    } else if (commandName == "!hm end") { //end game prematurely if a new game wants to be started
      hm.end(); 
      client.say(
        target,
        `The game has ended. Kappa Use !hmstart to start a new game!`
      );
    } else if (command === "hm") { //guessing command, where argument is guess
      if (!hmgame) {
        client.say(
          target,
          `There is no current hangman game. BibleThump Use !hm start to start a game.`
        );
      } else {
        //guess a letter, ex: !hm a (no quotes, just letter on its own) or !hm game where game is 
        //a guessed word
        if (argument) {
          //set to lowercase to avoid double counting the same letter
          const arg = argument.toLowerCase();
          //command to see letters that have already been guessed
          if (arg === "letters") {
            client.say(target, `Letters already guessed: ${hm.letters}`);
          } else if (hm.word.trim() === arg.trim()) { // if user guessed the word correctly
            client.say(
              target,
              `We won! The word was ${hm.word}! PogChamp To play again, do !hm start.`
            );
            hm.end();
          } else if (/[a-zA-Z]/.test(arg) & (arg.length == 1)) { //guessed one letter
            if (hm.letters.includes(arg)) { //checks if letter has been guessed already or not
              client.say(
                target,
                `The letter ${argument} has been guessed already. LUL Use !hm letters to see which letter have already been used.`
              );
            } else if (hm.hidden.trim() == hm.word.trim()) { //word already completed and ends the game
              client.say(
                target,
                `We won! The word was ${hm.word}! PogChamp To play again, do !hm start.`
              );
              hm.end();
            } else { //guess goes through
              hm.guess(arg);
              if (hm.hidden.trim() == hm.word.trim()) { //guessed letter completes the word
                client.say(
                  target,
                  `We won! The word was ${hm.word}! PogChamp To play again, do !hm start.`
                );
                hm.end();
              } else {
                //list of emotes twitch uses to keep the guess emotes fresh and non-repetitive
                const emotes = [
                  "RaccAttack",
                  "TriHard",
                  "BegWan",
                  "TehePelo",
                  "TPFufun",
                  "GivePLZ",
                  "OSFrog",
                  "SeriousSloth",
                  "OhMyDog",
                  "FrankerZ"
                ];
               //choose random emote 
                const emo = Math.floor(Math.random() * 10);
                //case where lives run out
                if (hm.lives == 0) {
                  client.say(
                    target,
                    `Game over, you were unable to guess the word. NotLikeThis NotLikeThis To play again, do !hm start.`
                  );
                  hm.end();
                } else { //case where a letter was guessed
                  client.say(
                    target,
                    `${argument} was guessed! ${emotes[emo]} ${hm.lives} lives remaining. Guess a letter with !hm [letter]. ${hm.hidden} (${hm.word.length} letters)`
                  );
                }
              }
            }
          } else { // if guess argument is anything other than a letter in the english alphabet
            client.say(
              target,
              `That is an invalid entry. LUL ${hm.lives} lives remaining. Guess a letter with !hm [letter]. ${hm.hidden} (${hm.word.length} letters)`
            );
          }
        } else { //if argument is not a recognized command after hm 
          client.say(
            target,
            `That is an invalid entry. LUL ${hm.lives} lives remaining. Guess a letter with !hm [letter]. ${hm.hidden} (${hm.word.length} letters)`
          );
        }
      }
    }
  }
} 

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
