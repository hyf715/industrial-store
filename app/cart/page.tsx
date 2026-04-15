import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export default async function CartPage() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value || 'default_session_' + Date.now();

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  const total = cart?.items.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0) || 0;

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
                🛒 购物车 ({cart?.items.length || 0})
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          购物车
        </h1>

        {cart && cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.cartId}-${item.productId}`} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 flex gap-4">
                  <div className="h-24 w-24 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`} className="text-lg font-semibold text-zinc-900 dark:text-white hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                      ¥{item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        -
                      </button>
                      <span className="text-sm text-zinc-900 dark:text-white">{item.quantity}</span>
                      <button className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        +
                      </button>
                      <button className="ml-auto text-sm text-red-600 hover:text-red-800">
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                订单摘要
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-600 dark:text-zinc-400">商品总价</span>
                <span className="text-zinc-900 dark:text-white">¥{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-600 dark:text-zinc-400">运费</span>
                <span className="text-zinc-900 dark:text-white">¥0.00</span>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 flex justify-between mb-6">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">合计</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">¥{total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors font-semibold">
                去结算
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
              购物车是空的
            </p>
            <Link href="/products" className="text-zinc-900 dark:text-white font-semibold hover:underline">
              去逛逛
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
