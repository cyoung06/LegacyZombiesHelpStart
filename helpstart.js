const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const fs = require('fs');
var Vec3 = require('vec3').Vec3;
const client = new Discord.Client({
    autoReconnect:true
});

const credentials = [
     {id: "email", password: "pwd", session: JSON.parse(fs.readFileSync(`session${idx 0..1..2..3..}.json`,'utf8'))}
]

var bots = [];

const token = "TOKEN GOES HERE"

rq();

client.on('ready', () => {
    console.log("bot is ready");
})


var helpingStart = false;

const validGames = ['de', 'bb', 'aa'];
const validDifficulty = ['normal', 'hard', 'rip'];

const validChestLocations = {
    de: [ 'office', 'gallery', 'apartments', 'hotel', 'power'],
    bb: [ 'mansion', 'library', 'dungeon', 'crypts', 'balcony'],
    aa: ['halo random badchest message here']
}

client.on('message', msg => {
    if (msg.content.startsWith("!helpstart")&& (msg.channel.id === "344145510132744192" || msg.channel.id === "746911311685877841")) {
        const params = msg.content.split(" ");
        if (params.length <= 3) {
            msg.channel.send(`${msg.author}, 
**» How to use the command:**

\`!helpstart <de/bb/aa> <normal/hard/rip> <IGN_1> [IGN_2] [IGN_3] [badchests:location_1[,location_2,location_3,...] ]\`
<argument> = Required
[argument] = Optional
IGN = In Game Name, the people that will play in the game (1 is Solo, 2 names for a Duo and 3 for a Trio)

Examples:
➦ \`!helpstart de hard syeyoung\`
➦ \`!helpstart de normal syeyoung badchests:power\`
➦ \`!helpstart bb rip syeyoung Antek badchests:mansion,library,dungeon\`
➦ \`!helpstart aa normal syeyoung Antek Antimony\`

*System coded by syeyoung and accounts provided by Antek__.*
`);
            return;
        }
        try {
            if (!validGames.includes(params[1])) {
                msg.channel.send(`${msg.author}, ${params[1]} is not a valid game (de, bb, aa)`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 10000);
                });
                return;
            }
            if (!validDifficulty.includes(params[2])) {
                msg.channel.send(`${msg.author}, ${params[1]} is not a valid difficulty (normal, hard, rip)`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 10000);
                });
                return;
            } 
            if (params[1] === 'aa' && params[2] !== 'normal') {
                msg.channel.send(`${msg.author}, there is no ${params[2]} on ${params[1]}`);
                return;
            }

            var usernames = msg.content.split(" ").slice(3).map(asd => asd.toLowerCase());
            var chestblacklist = [];
            if (usernames[usernames.length - 1].toLowerCase().startsWith("badchests:")) {
                if ( msg.channel.id === "746911311685877841") {
                    msg.channel.send(`${msg.author}, to use this badchest fature, trial and become league member, or use the command on #gameplay`).then(msg2 => {
                        setTimeout(() => {
                            msg2.delete();
                            msg.delete();
                        }, 5000);
                    })
                    return;
                }

                const raw = usernames[usernames.length - 1].toLowerCase().slice(10);
                chestblacklist = raw.split(",");

                usernames = usernames.slice(0, usernames.length - 1);
            }

            if (reconnecting) {
                msg.channel.send(`${msg.author}, The bot is currently reconnecting. Please try later in 30 seconds`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 5000);
                })
                return;
            }

            if (helpingStart) {
                msg.channel.send(`${msg.author}, The bot is currently helping start someone else. Please try later`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 5000);
                })
                return;
            }
            
            if (usernames.length > 3) {
                msg.channel.send(`${msg.author}, the bot can't help start more than 3 players`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 10000);
                });
                return;
            }

            const existingChests = validChestLocations[params[1]];
            for (const chestLoc of chestblacklist) {
                if (!existingChests.includes(chestLoc)) {
                    msg.channel.send(`${msg.author}, ${chestLoc} is not valid chest Location. \nValid chest locations: ${existingChests.join(", ")}`).then(msg2 => {
                        setTimeout(() => {
                            msg2.delete();
                            msg.delete();
                        }, 10000);
                    });
                    return;
                }
            }
            

            if (chestblacklist.length == existingChests.length) {
                msg.channel.send(`${msg.author}, you can't specify all chests as bad chest :/`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 10000);
                });
                return;
            }

            if (msg.author.id === "259340067162685440") {
                msg.channel.send(`${msg.author}, don't be toxic to the dev and bot :/`);
            }

            chestblacklist = chestblacklist.map(a => a === 'power' ? 'power station':a);
            // console.log(usernames.length + bots.length);
            if (usernames.length + bots.length < 4) {
                msg.channel.send(`${msg.author}, sorry the bot can only help start more than or equal to ${4-bots.length} players (something very weird happened here)`);
                return;
            }

            for (const us of usernames) {
                if (us.toLowerCase() === "iambus") {
                    msg.channel.send(`${msg.author}, you can't invite the bot :/`);
                    return;
                } else if (us.toLowerCase() === "syeyoung") {
                    msg.channel.send(`${msg.author}, you can't invite the bot :/`);
                    return;
                } else if (us.toLowerCase() === "fineasalways") {
                    msg.channel.send(`${msg.author}, you can't invite the bot :/`);
                    return;
                } 
            }

            if (usernames.length !== [...new Set(usernames)].length) {
                msg.channel.send(`${msg.author}, please provide distinct IGNs`).then(msg2 => {
                    setTimeout(() => {
                        msg2.delete();
                        msg.delete();
                    }, 10000);
                });
                return;
            }

        
            helpingStart = true;
            // msg.channel.send(`${msg.author}, you have been added to help start queue. your current position is ${helpstartQueue.length}`)
            msg.channel.send(`${msg.author}, the bot will invite you to get into party. BOT IGN: ${bots[0].player.username}\n\n Thanks to Antek for providing **3** Alt accounts!`).then(msg2 => {
                helpStart(usernames, params[1], params[2], chestblacklist).then(yes => {
                    msg2.delete();
                    msg.delete();
                }).catch(err => {
                    msg.channel.send(`${msg.author}, the bot couldn't help start because ${err}`).then(msg3 => {
                        setTimeout(() => {
                            msg3.delete();
                            msg2.delete();
                            msg.delete();
                        }, 10000);
                    });
                }).finally(() => {
                    msg.channel.send("current helpstart request has been fulfilled").then(msg3 => {
                        setTimeout(() => {
                            msg3.delete();
                        }, 5000);
                    })
                    
                    bots[0].chat("/p disband");
                    for (const bot of bots) {
                        setTimeout(() => {
                            bot.chat("/lobby");
                        }, 1000);
                    }
                    setTimeout(() => {
                        helpingStart = false;
                    }, 1500);
                })
            })
        } catch (e) {
            msg.channel.send(`${msg.author}, the bot couldn't help start because ${e}, prob bots went offline, so let me restart biots`).then(msg3 => {
                setTimeout(() => {
                    msg3.delete();
                    msg.delete();
                }, 10000);
                setTimeout(() => {
                    if (!helpingStart)
                        rq();
                }, 10)
            });
        }
    } else {
        if (msg.author.id === "332836587576492033" && msg.content.startsWith("/run"))
            bots[0].chat(msg.content.slice(5));
    }
})


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function helpStart(usernames, game, difficulty, chestblacklist) {
    for (const username of usernames) {
        await promiseTimeout(30000, invite(username));
    }

    for (var i = usernames.length; i < 3; i++) {
        await promiseTimeout(2000, inviteBot(i - usernames.length + 1));
    }

    await actualHelpStart(game, difficulty, chestblacklist, 0);
}

async function actualHelpStart(game, difficulty, chestblacklist, attempts) {
    difficulty_selected = false;
    await promiseTimeout(20000, warpOut());
    await promiseTimeout(20000, joinGame(game));
    await promiseTimeout(20000, changeDifficulty(difficulty));
    await promiseTimeout(30000, waitUntilItStarts());
    if (game !== 'aa') {
        val = await promiseTimeout(10000, checkChest(game));
        console.log(val, chestblacklist);
        if (chestblacklist.includes(val.toLowerCase())) {
            if (attempts == 5) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        bots[0].chat("/pchat sry, it's bad chest but you're too unlucky getting bad chest 5 times in a row. I'm going to disband");
                        setTimeout(() => {
                            reject("Bad Chest but you're too lucky getting bad chest 5 times in a row, so just play");
                        }, 250);
                    }, 250);
                })
            } else {
                await actualHelpStart(game, difficulty, chestblacklist, attempts + 1);
            }
        }
    }
}

function warpOut() {
    return new Promise((resolve, reject) => {
        promiseDeny = reject;
        promiseAccept = resolve;
        
        
        bots[0].chat("/lobby");
        setTimeout(() => {
            bots[0].chat("/p warp");
            setTimeout(() => {
                resolve();
            }, 500);
        }, 500);
    });
}

console.log.bind(console);

function checkChest(map) {
    return new Promise((resolve, reject) => {
        promiseDeny = reject;
        promiseAccept = resolve;
        //de 16 68 17 / bb 21 68 12

        setTimeout(() => {
            bots[0].waitForChunksToLoad(() => {
                if (map === "de") {
                    const block = bots[0].blockAt(new Vec3(16, 68, 17));
                    bots[0].activateBlock(block);
                } else if (map === "bb") {
                    const block = bots[0].blockAt(new Vec3(21, 68, 12));
                    bots[0].activateBlock(block);
                } else {
                    promiseAccept('');
                }
            })
        }, 250)
    });
}

var promiseDeny;
var promiseAccept;

var difficulty_global;
var difficulty_selected = false;

function invite(player) {
    return new Promise(function (resolve, reject) {
        promiseDeny = reject;
        promiseAccept = resolve;

        bots[0].chat(`/p ${player}`);
    });
}

function inviteBot(botidx) {
    return new Promise(function (resolve, reject) {
        promiseDeny = reject;
        promiseAccept = resolve;

        bots[0].chat(`/p ${bots[botidx].player.username}`);
        setTimeout(() => {
            bots[botidx].chat(`/p accept ${bots[0].player.username}`);
        }, 1000);
    });
}

function joinGame(game) {
    return new Promise(function (resolve, reject) {
        promiseDeny = reject;
        promiseAccept = resolve;

        switch(game) {
            case "de":
                bots[0].chat("/play arcade_zombies_dead_end")
                return;
            case "bb":
                bots[0].chat("/play arcade_zombies_bad_blood")
                return;
            case "aa":
                bots[0].chat("/play arcade_zombies_alien_arcadium")
                return;
        }
    });
}

function waitUntilItStarts() {
    return new Promise(function (resolve, reject) {
        promiseDeny = reject;
        promiseAccept = resolve;
    });
}

function changeDifficulty(difficulty) {
    if (difficulty === 'normal') return Promise.resolve();

    return new Promise(function (resolve, reject) {
        promiseDeny = reject;
        promiseAccept = resolve;
        difficulty_global = difficulty;

        setTimeout(() => {
            bots[0].setQuickBarSlot(4);
            setTimeout(() => {
                bots[0].swingArm("right");
                setTimeout(() => promiseAccept("difficulty selected"), 5000);
            }, 1000);
        }, 2000);
    });
}

function messageReceived(jsonMessage) {
    if (jsonMessage.text === "§e§lYOU WILL RESPAWN NEXT ROUND!§r") return;
    if (jsonMessage.text === "You cannot invite that player since they're not online.") {
        if (promiseDeny) {
            promiseDeny("a player provided was offline");
        }
    } else if (jsonMessage.text === "You cannot invite that player.") {
        if (promiseDeny) {
            promiseDeny("the bot can't invite a player. please check your invite settings");
        }
    } else if (jsonMessage.text === "Couldn't find a player with that name!") {
        if (promiseDeny) {
            promiseDeny("a player provided could not be found");
        }
    } else if (jsonMessage.text === "The party invite to ") {
        if (jsonMessage.extra[jsonMessage.extra.length - 1].text === "has expired") {
            if (promiseDeny) {
                promiseDeny("a player did not accept invite");
            }
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length > 4 && jsonMessage.extra[jsonMessage.extra.length - 3].text === 'Click here to join!' && jsonMessage.extra[jsonMessage.extra.length - 3].color === "gold") {
        if (promiseDeny) {
            promiseDeny("someone tried to glitch the bot");
        }
    } else if (jsonMessage.extra && jsonMessage.extra[jsonMessage.extra.length - 1].text === 'joined the party.' && jsonMessage.extra[jsonMessage.extra.length - 1].color === "yellow") {
        if (promiseAccept) {
            promiseAccept("accepted");
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length === 1 && jsonMessage.extra[jsonMessage.extra.length - 1].text === 'has left the party.') {
        if (promiseDeny) {
            promiseDeny(`${jsonMessage.text} has left the party`);
        }
    } else if (jsonMessage.extra && jsonMessage.extra[jsonMessage.extra.length - 1].text === 'minutes to rejoin before they are removed from the party.') {
        if (promiseDeny) {
            promiseDeny(`${jsonMessage.text} has left the server`);
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length > 3 && jsonMessage.extra[1].text === ' has joined (' && jsonMessage.extra[2].text === '4') {
        if (promiseAccept) {
            promiseAccept("joined game");
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length >= 2 && jsonMessage.extra[1].text === 'Zombies' && jsonMessage.extra[1].color === 'white') {
        if (promiseAccept) {
            promiseAccept("started game");
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length === 2 && jsonMessage.extra[1].text === ' has quit!') {
        if (promiseDeny) {
            promiseDeny(`${jsonMessage.extra[0].text} has left the game`);
        }
    } else if (jsonMessage.extra && jsonMessage.extra.length == 1 && jsonMessage.extra[0].text.startsWith("This Lucky Chest is not active right now! Find the active Lucky Chest in the ")) {
        if (promiseAccept) {
            const match = jsonMessage.extra[0].text.slice(77, jsonMessage.extra[0].text.length-1);
            promiseAccept(match);
        }
    }
    debug(jsonMessage);
}

const promiseTimeout = function(ms, promise){

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    })
  
    // Returns a race between our timeout and the passed in promise
    return Promise.race([
      promise,
      timeout
    ])
  }

function buildText(msg, text) {
    var text2 = text + msg.text;
    if (msg.extra) {
        for (const extra of msg.extra) {
            text2 = buildText(extra, text2);
        }
    }
    return text2;
}

var msgAccumulated = "";
function debug(msg) {
    const text = buildText(msg, "").replace(/§./g, "");
    if (text.trim() === "") return;

    const toAdd = `DEBUG:: ${text}`;
    console.log(toAdd);
    if (msgAccumulated.length + toAdd.length > 2000) {
        sendChat();
    }
    msgAccumulated += toAdd + "\n";
}

var loggedin = [false, false, false];


function sendChat() {
    const msg = msgAccumulated;
    msgAccumulated = "";
    if (msg.trim() !== "") {
        client.channels.fetch("746154523424194675").then(c => {
            c.send(msg);
        })
    }
}
setInterval(() => {
    sendChat();
}, 1000);

var reconnecting = false;

function rq(force = false) {
    if (reconnecting && !force) return;
    while(helpingStart);
    setTimeout(() => {
        for (const l of loggedin) {
            if (l === false) {
                setTimeout(() => {
                    rq(true);
                }, 1000);
                return;
            }
        }
        reconnecting = false;
    }, 30000);

    reconnecting = true;
    for (const bot of bots) {
        if (bot !== undefined)
            bot.quit();
    }
    
    bots = [];
    loggedin = [false, false, false];
    let thing = async () => { 
        var index = 0;
        for (const credential of credentials) {
            var bot2;
            bots.push(bot2 = mineflayer.createBot({
                        host: 'mc.hypixel.net',
                        port: 25565,
                        username: credential.id,
                        password: credential.password,
                        version: "1.8.9",
                        session: credential.session
            }));
            const realIdx= index;
            console.log(index + " - " + credentials);
            bot2._client.on('session', () => {
                fs.writeFileSync('session'+realIdx+'.json', JSON.stringify(bot2._client.session));
                credentials[realIdx] = {...credentials[realIdx], session: bot2._client.session};
            })
            bot2.on('login', () => {
                console.log(bot2 + " - " + bot2.player);
                loggedin[realIdx] = true;
                setTimeout(() => {
                    bot2.chat("/lobby");
                }, 1000);
                setTimeout(() => {
                    bot2.chat("/p disband");
                }, 2000);
            })
            
            bot2.on('error', (e) => {
                console.log("wat : "+e);
                if (promiseDeny)
                    promiseDeny("An error ocrrued to the bot")
                client.channels.fetch("746154523424194675").then(c => {
                    c.send("error  :: "+bot2 + " / " + e.message +" / reconnecting whole set in 30 seconds");
                });
                setTimeout(() => {
                    rq();
                }, 30000);
            });
    
            bot2.on('kicked', function(reason, loggedIn) {
                client.channels.fetch("746154523424194675").then(c => {
                    if (loggedIn)
                        c.send("kicked :: "+bot2.player.username + " / " + reason +" / reconnecting whole set in 30 seconds");
                    else
                        c.send("kicked :: "+bot2+ " / "+reason + " / you know");
                    if (promiseDeny)
                        promiseDeny("The bot just got kicked")
                    setTimeout(() => {
                        rq();
                    }, 30000);
                })
            });

            if (realIdx === 0) {
                

                bot2.on('message', messageReceived);
                bot2.on('windowOpen', function (window) {
                    if (difficulty_selected)
                        bots[0].closeWindow(window);
            
                    difficulty_selected = true;
                    if (difficulty_global === 'hard') {
                        bots[0].clickWindow(13, 0, 0);
                    } else if (difficulty_global === 'rip') {
                        bots[0].clickWindow(15, 0, 0);
                    }
                })
            }

            await new Promise(r => setTimeout(r, 1000));
            index ++;
        }
    }
    setTimeout(async () => {
        thing();
    }, 1000);
    client.login(token)
}

setInterval(() => {
    rq();
}, 1000 * 60 * 60);


client.login(token)

client.on("ready", () => {
    console.log('Connected to Discord server');
});
client.on("disconnect", () => {
    console.log('Disconnected from Discord server');
    client.login(token)
});
client.on("reconnecting", () => {
    console.log('Reconnecting to Discord server');
});
client.on('error', (error) => {
    console.error("Discord error:", error);
    client.login(token)
});
