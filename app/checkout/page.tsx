'use client';

import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export default async function CheckoutPage() {
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

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        ...formData,
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      // 支付成功后跳转到订单详情页
      window.location.href = `/orders/${result.order.orderNumber}`;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-zinc-900 dark:text-white">
                Industrial Store
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/cart" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                🛒 购物车 ({cart?.items.length || 0})
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Checkout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          结算
        </h1>

        {cart && cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                  收货信息
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      收货人姓名
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                      placeholder="请输入收货人姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      收货邮箱
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                      placeholder="请输入收货邮箱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      收货地址
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.customerAddress}
                      onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                      placeholder="请输入收货地址"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors font-semibold"
                  >
                    立即支付
                  </button>
                </form>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                订单摘要
              </h2>
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={`${item.cartId}-${item.productId}`} className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-zinc-900 dark:text-white">
                      ¥{item.quantity * Number(item.product.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 flex justify-between mb-6">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">合计</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">¥{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-zinc-500">
                支付完成后，您的订单将被提交并进入处理状态。
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
              购物车是空的
            </p>
            <a href="/products" className="text-zinc-900 dark:text-white font-semibold hover:underline">
              去逛逛
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
