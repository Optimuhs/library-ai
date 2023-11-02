const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient();
async function main() {
  try {
    await generateUsers();
    await generateAuthors();
    await generateBooks();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function generateUsers() {
  try {
    const data = await fs.readFile("./UserAccountData.json", "utf-8");
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
  } catch (error) {
    console.error(error);
  }
}

async function generateAuthors() {
  try {
    const data = await fs.readFile("./AuthorData.json", "utf-8");
    const jsonData = JSON.parse(data);

    for (const authorData of jsonData) {
      const author = await prisma.author.create({
        data: authorData,
      });
      console.log(author);
    }
  } catch (error) {
    console.error(error);
  }
}

async function generateBooks() {
  try {
    const data = await fs.readFile("./BookData.json", "utf-8");
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
  } catch (error) {
    console.error(error);
  }
}

main();
