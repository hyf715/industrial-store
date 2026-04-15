import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const categories = await prisma.category.findMany();

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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            工业品一站式采购平台
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300">
            专业供应五金工具、电气设备、安防产品、工业耗材
          </p>
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
            产品分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                    点击查看 {category.name} 分类下的所有产品
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
