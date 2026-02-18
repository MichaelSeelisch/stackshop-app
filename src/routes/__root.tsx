import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'

import {type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../components/Header'
import { client } from '../lib/appwrite'

import appCss from '../styles.css?url'

// export const Route = createRootRoute({
// 	head: () => ({
// 		meta: [
// 			{
// 				charSet: 'utf-8',
// 			},
// 			{
// 				name: 'viewport',
// 				content: 'width=device-width, initial-scale=1',
// 			},
// 			{
// 				title: 'TanStack Start Starter',
// 			},
// 		],
// 		links: [
// 			{
// 				rel: 'stylesheet',
// 				href: appCss
// 			}
// 		]
// 	}),

// 	shellComponent: RootDocument
// });

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
				title: 'StackShop',
			},
			{
				description:
					'StackShop is a platform for buying and selling products'
			}
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss
			}
		]
	}),

	shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { queryClient } = Route.useRouteContext();

	// Verify Appwrite connection on app startup
	useEffect(() => {
		client.ping().catch(err => {
			console.error('Failed to ping Appwrite:', err);
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
		<html lang="en">
			<head>
				<HeadContent />
			</head>

			<body>
				<div className='min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950d dark:text-white'>
					<Header />

					<main className='mx-auto max-w-6xl px-4 py-6'>
						{children}
					</main>
				</div>

				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />
						}
					]}
				/>

				<TanStackDevtools
					config={{
						position: 'bottom-right'
					}}
					plugins={[
						{
							name: 'TanStack Router',
							render: <TanStackRouterDevtoolsPanel />
						}
					]}
				/>

				<Scripts />
			</body>
		</html>
	</QueryClientProvider>
  )
}
