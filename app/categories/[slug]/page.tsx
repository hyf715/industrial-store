import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: { products: true },
  });

  if (!category) {
    return <div className="text-center py-12">分类未找到</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-white">
                Industrial Store
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          {category.name}
        </h1>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">
                    ¥{product.price.toFixed(2)}
                  </span>
                  <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
