import { prisma } from './prisma';

export async function seedCategories() {
  const categories = [
    {
      code: 'CAT001',
      name: 'Italian',
      description: 'Italian food and cuisine',
    },
    {
      code: 'CAT002',
      name: 'Asian',
      description: 'Asian fusion and traditional',
    },
    {
      code: 'CAT003',
      name: 'Fast Food',
      description: 'Quick service restaurants',
    },
    { code: 'CAT004', name: 'Cafe', description: 'Coffee and cafe dining' },
    {
      code: 'CAT005',
      name: 'Fine Dining',
      description: 'Upscale dining experience',
    },
    {
      code: 'CAT006',
      name: 'Seafood',
      description: 'Fresh seafood specialties',
    },
    {
      code: 'CAT007',
      name: 'Mexican',
      description: 'Mexican and Latin American',
    },
    {
      code: 'CAT008',
      name: 'Indian',
      description: 'Indian spices and curries',
    },
    {
      code: 'CAT009',
      name: 'Steakhouse',
      description: 'Grilled meats and steaks',
    },
    { code: 'CAT010', name: 'Vegetarian', description: 'Plant-based cuisine' },
    { code: 'CAT011', name: 'Bakery', description: 'Fresh baked goods' },
    {
      code: 'CAT012',
      name: 'Thai',
      description: 'Thai street food and dishes',
    },
    {
      code: 'CAT013',
      name: 'Japanese',
      description: 'Sushi and ramen specialists',
    },
    {
      code: 'CAT014',
      name: 'Mediterranean',
      description: 'Mediterranean flavors',
    },
    {
      code: 'CAT015',
      name: 'Korean',
      description: 'Korean BBQ and street food',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { code: category.code },
      update: {},
      create: {
        ...category,
        isActive: true,
      },
    });
  }

  console.log('✓ Categories seeded');
}
