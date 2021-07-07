"use strict";

const {
  db,
  models: { User, Annotation, LineAnnotated }
} = require("../server/db");

const lines = [
  {
    linesAnnotated: `Herakleitos`,
    poem: "Burnt Norton"
  },
  {
    linesAnnotated: "Time present and time past\nAre both perhaps present in time future",
    poem: "Burnt Norton"
  }
];

const users = [
  {
    id: 1,
    password: "123",
    email: "cricks@c.com",
    admin: true
  }
];

const annotations = [
  {
    poem: "Burnt Norton",
    content: "Heraclitus was a pre-Socratic philosopher known for his cryptic aphorisms",
    userId: 1,
    lineId: 1
  },
  {
    poem: "Burnt Norton",
    content: "Nietzsche liked Heraclitus",
    userId: 1,
    lineId: 1
  },
  {
    poem: "Burnt Norton",
    content: "The opening lines of the poem are about time",
    userId: 1,
    lineId: 2
  },
  {
    poem: "Burnt Norton",
    content: "Time is like really deep man",
    userId: 1,
    lineId: 2
  }
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  for (let user of users) {
    await User.create(user)
  }

  for (let line of lines) {
    await LineAnnotated.create(line)
  }

  for (let annotation of annotations) {
    await Annotation.create(annotation)
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${lines.length} lines annotated`);
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
