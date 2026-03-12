import { seedCategories } from './categories';
import { seedMerchants } from './merchants';
import { prisma } from './prisma';
import { seedRoles } from './roles';
import { seedTags } from './tags';
import { seedUsers } from './users';

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed in order of dependencies
    await seedRoles();
    await seedCategories();
    await seedTags();
    await seedUsers();
    await seedMerchants();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('📊 Seeded data summary:');
    console.log('  • Roles: 3 (Admin, Merchant, Customer)');
    console.log('  • Categories: 15');
    console.log('  • Tags: 20');
    console.log('  • Users: 40+');
    console.log('  • Merchants: 40+');
    console.log('  • Merchant-Category relations: 40-120');
    console.log('  • Merchant-Tag relations: 80-200');
    console.log('\n💡 Default merchant login:');
    console.log('  Email: merchant1@example.com');
    console.log('  Password: Demo@12345');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
