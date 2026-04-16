import Link from 'next/link';

export default async function NewsPage() {
  const res = await fetch('http://localhost:3000/api/news', { cache: 'no-store' });
  const { news } = await res.json();

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
          {news.map((item: any) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-6xl">⚡</span>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm rounded-full mb-2">
                  {item.category}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                  {item.summary}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">
                    {item.date}
                  </span>
                  <Link href={`/news/${item.id}`} className="text-zinc-900 dark:text-white font-semibold hover:underline">
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
