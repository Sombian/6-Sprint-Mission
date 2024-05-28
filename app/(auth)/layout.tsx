export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>)
{
	return (
		<main class="flex flex-col h-screen">
		{
			children
		}
		</main>
	);
}
