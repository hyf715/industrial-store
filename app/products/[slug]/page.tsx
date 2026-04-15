import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) {
    return <div className="text-center py-12">产品未找到</div>;
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
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                🛒 购物车
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4">
          ← 返回产品列表
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-9xl">📦</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                  ¥{product.price.toFixed(2)}
                </span>
                <span className="text-lg text-zinc-600 dark:text-zinc-400">
                  库存: {product.stock}
                </span>
              </div>
              <div className="flex gap-4 mb-6">
                <button className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors font-semibold">
                  加入购物车
                </button>
                <button className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white py-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors font-semibold">
                  立即购买
                </button>
              </div>
              <div className="text-sm text-zinc-500">
                <p>分类: {product.category.name}</p>
                <p>上架时间: {product.createdAt.toLocaleString('zh-CN')}</p>
                <p>更新时间: {product.updatedAt.toLocaleString('zh-CN')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
