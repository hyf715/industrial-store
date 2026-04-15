import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function ProductsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const categories = await prisma.category.findMany();
  const categoryId = searchParams?.category ? parseInt(searchParams.category) : undefined;
  
  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId } : undefined,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

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
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                🛒 购物车
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
          所有产品
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full ${!categoryId ? 'bg-zinc-900 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
          >
            全部
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`?category=${category.id}`}
              className={`px-4 py-2 rounded-full ${categoryId === category.id ? 'bg-zinc-900 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      ¥{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-zinc-500">
                      库存: {product.stock}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              暂无产品
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
