import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const packs = await prisma.pack.findMany({
  include: { owner: true, seats: true },
  orderBy: { slug: "asc" },
});

const lauren = packs.find(
  (pack) => pack.owner.githubLogin === "poteto" && pack.slug === "lauren"
);
if (!lauren) {
  console.error("prisma.pack.findMany did not return poteto/lauren");
  process.exit(1);
}

const visit = await prisma.packVisit.create({
  data: {
    packId: lauren.id,
    packOwner: "poteto",
    packSlug: "lauren",
    source: "add_to_grok",
    seatName: "prisma-catalog-check",
  },
});
const counted = await prisma.packVisit.count({ where: { id: visit.id } });
await prisma.packVisit.delete({ where: { id: visit.id } });
if (counted !== 1) {
  console.error("prisma.packVisit.create did not persist");
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      packs: packs.length,
      lauren: {
        id: lauren.id,
        owner: lauren.owner.githubLogin,
        slug: lauren.slug,
        seats: lauren.seats.length,
      },
      visitWrite: true,
    },
    null,
    2
  )
);

await prisma.$disconnect();
