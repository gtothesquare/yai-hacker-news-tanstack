import type { ReactNode } from 'react';
import appCss from '~/styles/app.css?url';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
//import { Analytics } from '@vercel/analytics/react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundry';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Yet another Hacker News',
      },
    ],
    links: [
      {
        rel: 'icon',
        sizes: '16x16',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        sizes: '512x512',
        href: '/icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon.png',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => {
    return (
      <h1 className="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16 text-center">
        Not Found
      </h1>
    );
  },
});

function RootComponent() {
  return (
    <RootDocument>
      {/*      <Analytics />*/}
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-dvh">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full flex-col bg-base-100 text-slate-50 bg-gray-800">
        <div className="flex flex-col grow">{children}</div>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
