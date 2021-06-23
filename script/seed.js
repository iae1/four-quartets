"use strict";

const {
  db,
  models: { Poem, Line, User, Annotation }
} = require("../server/db");

const poems = [
  {
    title: "Four Quartets: Burnt Norton",
    author: "T.S. Eliot"
  }
];

// const lines = [
//   {
//     content: `τοῦ λόγου δὲ ἐόντος ξυνοῦ ζώουσιν οἱ πολλοί ὡς ἰδίαν ἔχοντες φρόνησιν\nI. p. 77. Fr. 2.`,
//     number: 1,
//     poemId: 1
//   },
//   {
//     content: `I. p. 77. Fr. 2.`,
//     number: 2,
//     poemId: 1
//   },
//   {
//     content: `ὁδὸς ἄνω κάτω μία καὶ ὡυτή`,
//     number: 3,
//     poemId: 1
//   },
//   {
//     content: `I. p. 89 Fr. 60.`,
//     number: 4,
//     poemId: 1
//   },
//   {
//     content: `Diels: Die Fragmente der Vorsokratiker (Herakleitos)`,
//     number: 5,
//     poemId: 1
//   },
//   {
//     content: `Time present and time past`,
//     number: 6,
//     poemId: 1
//   },
//   {
//     content: `Are both perhaps present in time future`,
//     number: 7,
//     poemId: 1
//   },
//   {
//     content: `And time future contained in time past.`,
//     number: 8,
//     poemId: 1
//   },
//   {
//     content: `If all time is eternally present`,
//     number: 9,
//     poemId: 1
//   },
//   {
//     content: `All time is unredeemable.`,
//     number: 10,
//     poemId: 1
//   },
//   {
//     content: `What might have been is an abstraction`,
//     number: 11,
//     poemId: 1
//   },
//   {
//     content: `Remaining a perpetual possibility`,
//     number: 12,
//     poemId: 1
//   },
//   {
//     content: `Only in a world of speculation.`,
//     number: 13,
//     poemId: 1
//   },
//   {
//     content: `What might have been and what has been`,
//     number: 14,
//     poemId: 1
//   },
//   {
//     content: `Point to one end, which is always present.`,
//     number: 15,
//     poemId: 1
//   },
//   {
//     content: `Footfalls echo in the memory`,
//     number: 16,
//     poemId: 1
//   },
//   {
//     content: `Down the passage which we did not take`,
//     number: 17,
//     poemId: 1
//   },
//   {
//     content: `Towards the door we never opened`,
//     number: 18,
//     poemId: 1
//   },
//   {
//     content: `Into the rose-garden. My words echo`,
//     number: 19,
//     poemId: 1
//   },
//   {
//     content: `Thus, in your mind.`,
//     number: 20,
//     poemId: 1
//   },
//   {
//     content: `But to what purpose`,
//     number: 21,
//     poemId: 1
//   },
//   {
//     content: `Disturbing the dust on a bowl of rose-leaves`,
//     number: 22,
//     poemId: 1
//   },
//   {
//     content: `I do not know.`,
//     number: 23,
//     poemId: 1
//   },
//   {
//     content: `Other echoes`,
//     number: 24,
//     poemId: 1
//   },
//   {
//     content: `Inhabit the garden. Shall we follow?`,
//     number: 25,
//     poemId: 1
//   },
//   {
//     content: `Quick, said the bird, find them, find them,`,
//     number: 26,
//     poemId: 1
//   },
//   {
//     content: `Into our first world, shall we follow`,
//     number: 27,
//     poemId: 1
//   },
//   {
//     content: `The deception of the thrush? Into our first world.`,
//     number: 28,
//     poemId: 1
//   },
//   {
//     content: `There they were, dignified, invisible,`,
//     number: 29,
//     poemId: 1
//   },
//   {
//     content: `Moving without pressure, over the dead leaves,`,
//     number: 30,
//     poemId: 1
//   },
//   {
//     content: `In the autumn heat, through the vibrant air,`,
//     number: 31,
//     poemId: 1
//   },
//   {
//     content: `The unheard music hidden in the shrubbery,`,
//     number: 32,
//     poemId: 1
//   },
//   {
//     content: `Had the look of flowers that are looked at.`,
//     number: 33,
//     poemId: 1
//   },
//   {
//     content: `There they were as our guests, accepted and accepting.`,
//     number: 34,
//     poemId: 1
//   },
//   {
//     content: `So we moved, and they, in a formal pattern,`,
//     number: 35,
//     poemId: 1
//   },
//   {
//     content: `Along the empty alley, into the box circle,`,
//     number: 36,
//     poemId: 1
//   },
//   {
//     content: `To look down into the drained pool.`,
//     number: 37,
//     poemId: 1
//   },
//   {
//     content: `Dry the pool, dry concrete, brown edged,`,
//     number: 38,
//     poemId: 1
//   },
//   {
//     content: `And the pool was filled with water out of sunlight,`,
//     number: 39,
//     poemId: 1
//   },
//   {
//     content: `And the lotos rose, quietly, quietly,`,
//     number: 40,
//     poemId: 1
//   },
//   {
//     content: `The surface glittered out of heart of light,`,
//     number: 41,
//     poemId: 1
//   },
//   {
//     content: `And they were behind us, reflected in the pool.`,
//     number: 42,
//     poemId: 1
//   },
//   {
//     content: `Then a cloud passed, and the pool was empty.`,
//     number: 43,
//     poemId: 1
//   },
//   {
//     content: `Go, said the bird, for the leaves were full of children,`,
//     number: 44,
//     poemId: 1
//   },
//   {
//     content: `Hidden excitedly, containing laughter.`,
//     number: 45,
//     poemId: 1
//   },
//   {
//     content: `Go, go, go, said the bird: human kind`,
//     number: 46,
//     poemId: 1
//   },
//   {
//     content: `Cannot bear very much reality.`,
//     number: 47,
//     poemId: 1
//   },
//   {
//     content: `Time past and time future`,
//     number: 48,
//     poemId: 1
//   },
//   {
//     content: `What might have been and what has been`,
//     number: 49,
//     poemId: 1
//   },
//   {
//     content: `Point to one end, which is always present.`,
//     number: 50,
//     poemId: 1
//   }
// ]

const lines = [
  {
    content: `τοῦ λόγου δὲ ἐόντος ξυνοῦ ζώουσιν οἱ πολλοί ὡς ἰδίαν ἔχοντες φρόνησιν\nI. p. 77. Fr. 2.\nὁδὸς ἄνω κάτω μία καὶ ὡυτή\nI. p. 89 Fr. 60.\nDiels: Die Fragmente der Vorsokratiker (Herakleitos)\nTime present and time past\nAre both perhaps present in time future\nAnd time future contained in time past.\nIf all time is eternally present\nAll time is unredeemable.\nWhat might have been is an abstraction`,
    number: 1,
    poemId: 1
  }
];

const users = [
  {
    id: 1,
    username: "CRicks",
    password: "123",
    email: "cricks@c.com",
    admin: true
  }
];

// const annotations = [
//   {
//     id: 1,
//     lineId: 6,
//     userId: 1,
//     content: 'Time present: _The Cloud of Unknowing_ ch.4: "time is precious: for God, that is the giver of time, giveth never two times together, but each one after other" (scored in TSE\'s copy). Lancelot Andrews: "when all is done, we shallhave somewhat to do, to bring this to a Nunc, to a time present... Now, is the only sure part of our time. That which is past, is come and gone. That which is to come, may peradventure, never come", Ash-Wednesday Sermon 1619. TSE: "reason counsels us to avoid surrenduring ourselves either to a present which is already past or to a future which is unknown',
//     charStart: 0,
//     charEnd: 12,
//   },
//   {
//     id: 2,
//     lineId: 12,
//     userId: 1,
//     content: 'abstraction... dry concrete (ln 34): "The confused distinction which exists in most heads between \'abstract\' and \'concrete\' us dye bit si nycg ti a nabufest fact of the existence of two types of mind, an abstract and a concrete, as to the existence of another type of mind, the verbal, or philosophic", The Perfect Critic II (1920) (Ricks 257)'
//   },
//   {
//     id: 3,
//     lineId: 18,
//     userId: 1,
//     content: 'Towards: pronounced t\'ords in TSE\'s recording of 1946-47.'
//   },
//   {
//     id: 4,
//     lineId: 18,
//     userId: 1,
//     content: 'the door we never opened: Henry James: "if life was... but a chain of open doors through which endless connections danced there was yet no knowledge in the world on which one should wish a door closed", _The Sense ofthe Past bk. II. James\'s notes, published with the unfinished novel in 1917: "on opening the door of the house with his latchkey he let himself into the past"'
//   }
// ]

const annotations = [
  {
    id: 1,
    lineId: 1,
    userId: 1,
    content:
      'Time present: _The Cloud of Unknowing_ ch.4: "time is precious: for God, that is the giver of time, giveth never two times together, but each one after other" (scored in TSE\'s copy). Lancelot Andrews: "when all is done, we shallhave somewhat to do, to bring this to a Nunc, to a time present... Now, is the only sure part of our time. That which is past, is come and gone. That which is to come, may peradventure, never come", Ash-Wednesday Sermon 1619. TSE: "reason counsels us to avoid surrenduring ourselves either to a present which is already past or to a future which is unknown',
    charStart: 0,
    charEnd: 12
  }
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating users in order (not very efficient, but this guarantees that they have expected ids)
  for (let user of users) {
    await User.create(user);
  }

  // Creating Products in order (not very efficient, but this guarantees that they have expected ids)
  for (let poem of poems) {
    await Poem.create(poem);
  }

  // Creating Orders in order (not very efficient, but this guarantees that they have expected ids)
  for (let line of lines) {
    await Line.create(line);
  }

  // Creating OrdersDetails in order (not very efficient, but this guarantees that they have expected ids)
  await Promise.all(
    annotations.map(annotation => {
      return Annotation.create(annotation);
    })
  );

  console.log(`seeded ${lines.length} lines`);
  console.log(`seeded ${poems.length} poems`);
  console.log(`seeded ${annotations.length} annotations`);
  console.log(`seeded successfully`);
  return {
    users: {
      chris: users[0]
    }
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}
