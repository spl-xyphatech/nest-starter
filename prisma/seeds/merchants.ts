import { prisma } from './prisma';

export async function seedMerchants() {
  // Get all users created for merchants
  const users = await prisma.user.findMany({
    where: {
      role: {
        code: 'MERCHANT',
      },
    },
    take: 40,
  });

  if (users.length === 0) {
    console.log('⚠ No merchant users found');
    return;
  }

  // Get all categories and tags
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  if (categories.length === 0 || tags.length === 0) {
    console.log('⚠ Categories and tags must be seeded first');
    return;
  }

  const merchantAddresses = [
    '123 Main St, Downtown District',
    '456 Oak Ave, Shopping Mall',
    '789 Pine Rd, Business Park',
    '321 Elm Street, Residential Area',
    '654 Maple Lane, City Center',
    '987 Cedar Blvd, Waterfront',
    '111 Oak Place, Old Town',
    '222 Birch Way, New District',
    '333 Walnut St, Tech Hub',
    '444 Spruce Lane, Market Square',
  ];

  const merchantDescriptions = [
    'Premium dining experience with authentic flavors',
    'Fast casual concept with quality ingredients',
    'Cozy neighborhood spot perfect for gatherings',
    'Family-friendly atmosphere with diverse menu',
    'Modern take on traditional cuisine',
    'Sustainable and locally-sourced ingredients',
    'Award-winning chef curated menu',
    'Romantic setting ideal for special occasions',
    'Casual dining with excellent service',
    'Health-conscious nutritious options',
  ];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const address = merchantAddresses[i % merchantAddresses.length];
    const description = merchantDescriptions[i % merchantDescriptions.length];
    const status =
      i % 5 === 0 ? 'REJECTED' : i % 3 === 0 ? 'PENDING' : 'APPROVED';

    try {
      const merchant = await prisma.merchant.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          name: user.name,
          description,
          address,
          phone: user.phone,
          status,
          approvedAt:
            status === 'APPROVED'
              ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
              : null,
          approvedBy: status === 'APPROVED' ? 'admin@example.com' : null,
        },
      });

      // Add random categories to merchant (1-3 categories per merchant)
      const numCategories = Math.floor(Math.random() * 3) + 1;
      const selectedCategories = categories
        .sort(() => Math.random() - 0.5)
        .slice(0, numCategories);

      for (const category of selectedCategories) {
        await prisma.merchantCategory.upsert({
          where: {
            merchantId_categoryId: {
              merchantId: merchant.id,
              categoryId: category.id,
            },
          },
          update: {},
          create: {
            merchantId: merchant.id,
            categoryId: category.id,
          },
        });
      }

      // Add random tags to merchant (2-5 tags per merchant)
      const numTags = Math.floor(Math.random() * 4) + 2;
      const selectedTags = tags
        .sort(() => Math.random() - 0.5)
        .slice(0, numTags);

      for (const tag of selectedTags) {
        await prisma.merchantTag.upsert({
          where: {
            merchantId_tagId: {
              merchantId: merchant.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            merchantId: merchant.id,
            tagId: tag.id,
          },
        });
      }
    } catch (error) {
      console.error(`Error creating merchant for user ${user.id}:`, error);
    }
  }

  console.log(`✓ ${users.length} merchants seeded with categories and tags`);
}
