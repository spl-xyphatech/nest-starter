import { prisma } from './prisma';

export async function seedRoles() {
  const roles = [
    {
      code: 'ADMIN',
      name: 'Administrator',
      description: 'Full system access',
    },
    {
      code: 'MERCHANT',
      name: 'Merchant',
      description: 'Merchant user role',
    },
    {
      code: 'CUSTOMER',
      name: 'Customer',
      description: 'Customer user role',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    });
  }

  console.log('✓ Roles seeded');
}
