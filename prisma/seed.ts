import { BountyStatus, PaymentStatus, PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

const JOB_CATEGORIES = [
  { occupation: "Developer" },
  { occupation: "Writer" },
  { occupation: "Designer" },
];

const HUNTERS = 30;
const POSTERS = 30;

const bounties = [
  {
    title: "Create Youtube Thumbnail",
    category: "clbf696200000rp3wzrg4cmjh",
    requirement: "",
    coverPhoto: "",
    max: 5,
  },
  {
    title: "Create a Logo",
    category: "clbf696200000rp3wzrg4cmjh",
    requirement: "",
    coverPhoto: "",
    max: 10,
  },
  {
    title: "Proof read my copy writing",
    category: "clbf696210002rp3wd9qzwzoq",
    requirement: "",
    coverPhoto: "",
    max: 5,
  },
  {
    title: "Design 3 UI interfaces",
    category: "clbf696200000rp3wzrg4cmjh",
    requirement: "",
    coverPhoto: "",
    max: 4,
  },
  {
    title: "Create 3 apis using Node.js",
    category: "clbf696210001rp3wwqq2y9ho",
    requirement: "",
    coverPhoto: "",
    max: 5,
  },
];

const prices = [20, 30, 50, 100];

const randomJob = [];

const paypalEmail = "paypalEmail.com";
const websitePortfolio = "websitePortfolio.com";
const githubLink = "github.com";
const designLink = "dribbble.com";

async function generateCategories() {
  await prisma.category.createMany({
    data: [{ title: "Design" }, { title: "Development" }, { title: "Writing" }],
  });
}

async function generateBountyHunters() {
  for (let i = 0; i < HUNTERS; i++) {
    const { data } = await axios.get("https://randomuser.me/api/");

    const newUser = data.results[0];

    const pickRandomJob =
      JOB_CATEGORIES[Math.floor(Math.random() * JOB_CATEGORIES.length)];

    try {
      // Create user
      const user = await prisma.user.create({
        data: {
          name: `${newUser.name.first} ${newUser.name.last}`,
          email: newUser.email,
          image: newUser.picture.medium,
        },
      });

      // Create bounty hunter
      const hunter = await prisma.hunter.create({
        data: {
          title: "",
          occupation: pickRandomJob?.occupation!,
          githubLink: githubLink,
          designLink: designLink,
          paypalEmail: paypalEmail,
          websitePortfolio: websitePortfolio,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return true;
}

async function generateBountyPosters() {
  for (let i = 0; i < POSTERS; i++) {
    const { data } = await axios.get("https://randomuser.me/api/");

    const newUser = data.results[0];

    try {
      await prisma.user.create({
        data: {
          name: `${newUser.name.first} ${newUser.name.last}`,
          email: newUser.email,
          image: newUser.picture.medium,
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return true;
}

async function createBounties() {
  const users = await prisma.user.findMany();

  for (let i = 0; i < users.length; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    const bounty = bounties[Math.floor(Math.random() * bounties.length)];

    const d = new Date();

    d.setDate(d.getDate() + Math.random() * 10);

    await prisma.bounty.create({
      data: {
        title: bounty?.title!,
        coverPhoto: bounty?.coverPhoto!,
        dateline: d,
        price: randomPrice!,
        requirement: bounty?.requirement,
        maxHunters: 5,
        bountyStatus: BountyStatus.SUBMITTED,
        paymentStatus: PaymentStatus.PAID,
        category: {
          connect: {
            id: bounty?.category,
          },
        },
        user: {
          connect: {
            id: randomUser?.id,
          },
        },
      },
    });
  }
}

async function joinBounty() {
  const bounties = await prisma.bounty.findMany();
  const hunters = await prisma.hunter.findMany();

  let bountyCount = 0;
  let hunterCount = 0;

  while (bountyCount < bounties.length && hunterCount < hunters.length) {
    const updateBounty = await prisma.bounty.update({
      where: {
        id: bounties[bountyCount]?.id,
      },
      data: {
        hunters: {
          connect: {
            id: hunters[hunterCount]?.id,
          },
        },
        mission: {
          create: {
            hunter: {
              connect: { id: hunters[hunterCount]?.id },
            },
          },
        },
      },
      include: {
        mission: true,
      },
    });

    bountyCount++;
    hunterCount++;
  }
}

async function main() {
  // Create 3 categories
  await generateCategories();

  // Create 20 Bounty Posters
  // await generateBountyPosters();

  // // Create 20 Bounty Hunters
  // await generateBountyHunters();

  // // Create Bounties based on the number of users
  // await createBounties();

  // // Hunters will join bounty
  // await joinBounty();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
