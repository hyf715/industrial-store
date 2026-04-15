const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 创建分类
  const categories = await prisma.category.createMany({
    data: [
      { name: '五金工具', slug: 'hardware-tools', image: '/images/category/hardware.jpg' },
      { name: '电气设备', slug: 'electrical-equipment', image: '/images/category/electrical.jpg' },
      { name: '安防产品', slug: 'security-products', image: '/images/category/security.jpg' },
      { name: '工业耗材', slug: 'industrial-consumables', image: '/images/category/consumables.jpg' },
    ]
  });

  // 创建产品
  const products = await prisma.product.createMany({
    data: [
      { name: '电动螺丝刀套装', slug: 'electric-screwdriver-set', description: '专业级电动螺丝刀，含5种头', price: 129.00, stock: 50, categoryId: 1, images: '["/images/products/screwdriver.jpg"]' },
      { name: '工业级万用表', slug: 'industrial-multimeter', description: '高精度数字万用表，支持电压/电流/电阻测量', price: 299.00, stock: 30, categoryId: 2, images: '["/images/products/multimeter.jpg"]' },
      { name: '安全警示带', slug: 'safety-warning-tape', description: '反光警示带，100米/卷', price: 49.00, stock: 200, categoryId: 3, images: '["/images/products/warning-tape.jpg"]' },
      { name: '工业手套（防切割）', slug: 'industrial-cut-resistant-gloves', description: '防切割等级5级工业手套，10双/包', price: 89.00, stock: 100, categoryId: 4, images: '["/images/products/gloves.jpg"]' },
      { name: '金属卷尺5米', slug: 'metal-tape-measure-5m', description: '高强度金属卷尺，5米', price: 39.00, stock: 150, categoryId: 1, images: '["/images/products/tape-measure.jpg"]' },
    ]
  });

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
