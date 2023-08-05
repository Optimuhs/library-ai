const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
async function main() {
  fs.readFile(
    "./UserAccountData.json",
    "utf-8",
    async (err: string, data: string) => {
      if (err) {
        console.error(err);
        return;
      }
      const jsonData = JSON.parse(data);

      for (const userData of jsonData) {
        const user = await prisma.user.create({
          data: userData,
        });
        console.log(user);
      }
    }
  );
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
