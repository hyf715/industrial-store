import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function NewsPage() {
  // 获取能源科技新闻（模拟数据）
  const newsItems = [
    {
      id: 1,
      title: 'NESE天然气管道奠基仪式',
      summary: '美国能源部官员在纽约市为NESE管道项目奠基，旨在向东北部提供可靠、廉价的天然气',
      date: '2026-04-14',
      category: '天然气',
      image: '/images/news/nese-pipeline.jpg',
    },
    {
      id: 2,
      title: '本土医疗同位素制造设施',
      summary: '能源部能源优势融资办公室宣布对本土医疗同位素制造设施的有条件承诺',
      date: '2026-04-09',
      category: '医疗同位素',
      image: '/images/news/medical-isotopes.jpg',
    },
    {
      id: 3,
      title: '科罗拉多煤炭电厂维持运营',
      summary: '特朗普政府维持科罗拉多州煤炭电厂运营，确保电价实惠可靠',
      date: '2026-03-30',
      category: '煤炭能源',
      image: '/images/news/colorado-coal.jpg',
    },
  ];

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
              <Link href="/news" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                📰 能源新闻
              </Link>
              <Link href="/cart" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                🛒 购物车
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* News Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          能源科技新闻
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300">
          掌握最新能源科技动态，了解行业发展趋势
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div key={news.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-6xl">⚡</span>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm rounded-full mb-2">
                  {news.category}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {news.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                  {news.summary}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">
                    {news.date}
                  </span>
                  <Link href={`/news/${news.id}`} className="text-zinc-900 dark:text-white font-semibold hover:underline">
                    阅读更多 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
