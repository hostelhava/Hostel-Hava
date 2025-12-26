const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require('dotenv').config();
const prisma = new PrismaClient({});
async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.admin.upsert({
        where: {
            email: "nagamohan765@gmail.com"
        },
        update: {},
        create: {
            name: "Super Admin",
            email: "nagamohan765@gmail.com",
            password: hashedPassword
        },
    });
    console.log({ admin });
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
