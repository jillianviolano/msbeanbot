# MsBeanBot, a bot for playing Hangman with Chat!

### Inspiration

As a twitch streamer, a hobby I took on in March 2021, I wanted to combine my love for coding and streaming somehow. By advice of a friend, I built this bot. I wanted it to be a fun little game bot, as I had seen 'gambling' bots in other chats (StreamElements notabily has a command to use points accumulated on one's channel to do roulette, blackjack, or just basic coin flip betting) and seemed to draw the attention of viewers in chat.

At the time of building this bot, January 2022, the daily word game 'Wordle' was extremely popular. I also loved completing crossword puzzles and other word games, so I thought that hangman might be a simple way to implement my programming skills with my love for word games. Thus, MsBeanBot was born.

The words were taken from inside jokes with friends, their names, and popular games such as Minecraft, Dead by Daylight, Phasmophobia, and Kingdom Hearts.

**Special thank you to** Merlin, Koya, Law, Ferv, DMR, Hippo, Mitsuki, and Aki, for words and cheering me on!! 

## What's in this project?

← `README.md`: This file, describing the project.

← `public/style.css`: The styling rules for your pages and posts. Provided by Glitch.

← `bot.js`: The main bot script.

← `src/`: This folder holds page templates, additional scripts. Provided by Glitch.

← `LICENSE`: License of Glitch's use of the program. Provided by Glitch.

← `package.json`: json file that holds all the required content. Provided by Twitch Developers.

← `.env`: This holds all our enviroment variables that are otherwise sensitive for use

## How To Play

After booting up MsBeanBot, which is done using Glitch.com and just opening the file on the creators end (and thus boots up on a server from there), the user should use the command '!rollcall' in the twitch chat of the streamer who wants to utilize this bot to ensure that the bot is properly integrated into ones chat as appropiate.

To start a game, use **'!hm start'**.

To end a game in progress, use **'!hm end'**.

To guess a letter, use **'!hm [x]'** where [x] is replaced with a letter, without brackets. Ie: !hm A or !hm c

To guess the word, use **'!hm [word]'** where [word] is replaced with the word the user is guessing, without brackets. Ie: !hm ocelot

To see the words that have already been guessed, use **'!hm letters'**.

The bot will also give you a response that is appropiate for the entry. There are no word cases that utilize anything other than a-z letters, both uppercase and lowercase. 
When an argument is put in that is invalid, that is not consisiting of just [a-z] lettering, such as guessing a number or a symbol, the bot will tell you that it is an invalid entry.
The bot will also let you know if a game is in progress or not if you use the command to guess, and the game is not started. This is to prevent the bot from 'waiting', and reset the game when the viewers 
doing the other game are no longer present.

## Example Game



## Testing Process

In order to ensure that all edge cases were taken care of, I asked my friends to attempt to break my bot, and fixed it there after. 

**Special thanks to** Mitsuki_Nakamura, MerlinGaming69, Lawleise, and Hippopotamouse16 for testing and breaking my bot. This bot wouldn't be as well rounded without them.

## Sources:
Twitch Developers templates and help: https://dev.twitch.tv/docs/irc 

JavaScript help: https://w3schools.com/js/

Glitch platform: https://glitch.com
