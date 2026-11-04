import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * ساخت کلاینت Prisma به‌صورت امن؛
 * روی هاست‌های سرورلس (مثل Vercel) که متغیر DATABASE_URL ندارند،
 * به‌جای خطای فلان بخش، null برمی‌گردد تا بقیه‌ی سایت سالم کار کند.
 */
function createClient(): PrismaClient | null {
  try {
    const client = new PrismaClient()
    // یک اتصال واقعی لازم نیست؛ فقط نباید constructor خطا بدهد
    return client
  } catch (error) {
    console.error(
      '[lib/db] Prisma Client ساخته نشد — دیتابیس در این محیط در دسترس نیست:',
      error
    )
    return null
  }
}

/** اگر null باشد یعنی دیتابیس در دسترس نیست (مثل هاست سرورلس) */
export const db: PrismaClient | null =
  globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production' && db) {
  globalForPrisma.prisma = db
}
