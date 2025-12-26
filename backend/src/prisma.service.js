const { PrismaClient } = require('@prisma/client')
const { Injectable } = require('@nestjs/common')

@Injectable()
class PrismaService extends PrismaClient {
    async onModuleInit() {
        await this.$connect()
    }
}

module.exports = { PrismaService }
