import bcrypt from 'bcrypt';
import { prisma } from './prisma';

const DEMO_PASSWORD = 'pass';

export async function seedUsers() {
  // Get a role for users (assuming role exists)
  const defaultRole = await prisma.role.findFirst({
    where: { code: 'MERCHANT' },
  });

  if (!defaultRole) {
    console.log('⚠ No MERCHANT role found, creating default...');
    const role = await prisma.role.create({
      data: {
        code: 'MERCHANT',
        name: 'Merchant',
        description: 'Merchant user role',
      },
    });
    return seedMerchantUsers(role.id);
  }

  return seedMerchantUsers(defaultRole.id);
}

async function seedMerchantUsers(roleId: number) {
  const merchantNames = [
    "Luigi's Pasta House",
    'Dragon Palace',
    'The Burger Joint',
    'Coffee Corner',
    'Fine Steaks Co',
    "Ocean's Catch",
    'Fiesta Mexicana',
    'Spice Route',
    'The Grill Master',
    'Green Earth Cafe',
    'Sweet Moments Bakery',
    'Thai Orchid',
    'Sushi Symphony',
    'Mediterranean Blue',
    'K-BBQ House',
    'Pasta Express',
    'Asian Fusion HQ',
    'Quick Bites',
    'The Coffee Lab',
    'Prime Cuts',
    'Sea Pearl',
    'El Mariachi',
    'Curry Leaf',
    'Steakholme',
    'Veggie Paradise',
    'Bread & Co',
    'Bangkok Street',
    'Maki Master',
    'Greek Island',
    'Seoul Kitchen',
    'Northern Rivers',
    'Eastern Star',
    'Western Saloon',
    'Southern Soul',
    'Central Hub',
    'Urban Eats',
    'Farm to Table',
    'Sweet Treats',
    'Fresh Plates',
    'Hot Spot',
    'Cool Place',
    'Best Bites',
    'Top Table',
    'Main Menu',
    'First Class',
  ];

  const users = [];
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  for (let i = 0; i < merchantNames.length; i++) {
    const name = merchantNames[i];
    const email = `merchant${i + 1}@example.com`;

    try {
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name,
          email,
          phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          password: hashedPassword,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          roleId,
        },
      });
      users.push(user);
    } catch (error) {
      console.error(`Error creating user ${email}:`, error);
    }
  }

  console.log(`✓ ${users.length} users seeded for merchants`);
  return users;
}
