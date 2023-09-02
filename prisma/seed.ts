const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
async function main() {
  await generateUsers();
  await generateAuthors();
  await generateBooks();
}

async function generateUsers() {
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
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            idNumber: userData.idNumber,
            isStudent: userData.isStudent,
            currentReadingLevel: userData.currentReadingLevel,
            email: userData.email,
          },
        });
        console.log(user);
      }
    }
  );
}

async function generateAuthors() {
  fs.readFile(
    "./AuthorData.json",
    "utf-8",
    async (err: string, data: string) => {
      if (err) {
        console.error(err);
        return;
      }
      const jsonData = JSON.parse(data);

      for (const authorData of jsonData) {
        const author = await prisma.author.create({
          data: authorData,
        });
        console.log(author);
      }
    }
  );
}

async function generateBooks() {
  fs.readFile("./BookData.json", "utf-8", async (err: string, data: string) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);

    for (const bookData of jsonData) {
      const book = await prisma.book.create({
        data: {
          isbn: bookData.isbn,
          title: bookData.title,
          shelfLocation: bookData.shelfLocation,
          bookLevel: bookData.bookLevel,
          bookLevelColor: bookData.bookLevelColor,
        },
      });
      console.log(book);
    }
  });
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
