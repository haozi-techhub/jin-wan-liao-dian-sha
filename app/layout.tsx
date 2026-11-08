import type { Metadata, Viewport } from 'next';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const viewport: Viewport = { themeColor: '#0f0f14' };

export const metadata: Metadata = {
  metadataBase: new URL('https://games-khane.vercel.app'),
  title: '今晚聊点啥',
  description: '朋友聚会小游戏合集。玩真心话大冒险、二选一、猜谜、幸运转盘，随时开一局。',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  openGraph: {
    title: '今晚聊点啥',
    description: '选个玩法，把手机传给下一位，朋友聚会随时开一局。',
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: '/android-icon-192x192.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '今晚聊点啥',
    description: '随时开一局的朋友聚会小游戏合集。',
    images: ['/android-icon-192x192.png']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <div className="site-content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
