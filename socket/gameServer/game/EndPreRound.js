const sendScore = require('./SendScore');

async function run(e) {
   const hokmSwit = e.hokm;
   let winner = {};
   let winnerScore = 0;
   e.table.preRound = 0; //reset table
   e.table.players.forEach(p => {
      const c = p.card;
      e.table.cards.push(c);
      c.isHokm = p.card.suit * 1 === hokmSwit * 1;
      c.isSuit = p.card.suit * 1 === e.table.suit * 1;
      c.score = c.num;
      if (c.isSuit === true) c.score = c.score + 100;
      if (c.isHokm === true) c.score = c.score + 10000;
      if (c.score > winnerScore) {
         winnerScore = c.score;
         winner = p;
      }
   });

   winner.location === 2 || winner.location === 0
      ? e.preRoundteamScore.topB++
      : e.preRoundteamScore.rightL++;

   await e.teamPush('toWaste', {
      location: winner.location,
      card: winner.card
   });

   sendScore(e);
   e.roundNum = 0;
   e.preRoundStarter = winner;
}
module.exports = run;
