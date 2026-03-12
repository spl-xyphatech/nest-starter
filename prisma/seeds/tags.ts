import { prisma } from './prisma';

export async function seedTags() {
  const tags = [
    {
      code: 'TAG001',
      name: 'Smoking Area',
      description: 'Has designated smoking area',
    },
    { code: 'TAG002', name: 'WiFi', description: 'Free WiFi available' },
    {
      code: 'TAG003',
      name: 'Air Conditioning',
      description: 'Climate controlled space',
    },
    {
      code: 'TAG004',
      name: 'Outdoor Seating',
      description: 'Outdoor dining area',
    },
    {
      code: 'TAG005',
      name: 'Vegetarian Options',
      description: 'Vegetarian menu available',
    },
    {
      code: 'TAG006',
      name: 'Vegan Options',
      description: 'Vegan menu available',
    },
    {
      code: 'TAG007',
      name: 'Happy Hour',
      description: 'Special discounts available',
    },
    { code: 'TAG008', name: 'Live Music', description: 'Live entertainment' },
    {
      code: 'TAG009',
      name: 'Private Rooms',
      description: 'Private dining available',
    },
    { code: 'TAG010', name: 'Delivery', description: 'Food delivery service' },
    {
      code: 'TAG011',
      name: 'Takeout',
      description: 'Takeaway service available',
    },
    {
      code: 'TAG012',
      name: 'Family Friendly',
      description: 'Suitable for families',
    },
    {
      code: 'TAG013',
      name: 'Reservation Required',
      description: 'Booking recommended',
    },
    {
      code: 'TAG014',
      name: 'Wheelchair Accessible',
      description: 'ADA compliant',
    },
    { code: 'TAG015', name: 'Pet Friendly', description: 'Pets allowed' },
    {
      code: 'TAG016',
      name: 'Alcohol Served',
      description: 'Alcoholic beverages available',
    },
    { code: 'TAG017', name: 'Gluten Free', description: 'Gluten-free options' },
    {
      code: 'TAG018',
      name: 'Organic',
      description: 'Organic ingredients used',
    },
    {
      code: 'TAG019',
      name: 'Local',
      description: 'Local ingredients and sourcing',
    },
    {
      code: 'TAG020',
      name: 'Budget Friendly',
      description: 'Affordable prices',
    },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { code: tag.code },
      update: {},
      create: {
        ...tag,
        isActive: true,
      },
    });
  }

  console.log('✓ Tags seeded');
}
