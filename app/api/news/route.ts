import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 模拟抓取今日能源科技新闻
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
      {
        id: 4,
        title: '清洁能源技术突破',
        summary: '新型太阳能电池效率突破30%，成本降低20%',
        date: '2026-04-15',
        category: '清洁能源',
        image: '/images/news/solar-tech.jpg',
      },
      {
        id: 5,
        title: '电网现代化改造计划',
        summary: '美国能源部发布电网现代化改造计划，投资100亿美元',
        date: '2026-04-14',
        category: '电网建设',
        image: '/images/news/grid-modernization.jpg',
      },
    ];

    return NextResponse.json({ news: newsItems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
