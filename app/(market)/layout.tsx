import Header from "@/app/_widgets/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>)
{
	return (
		<main class="flex flex-col h-screen overflow-x-hidden">
			<Header>
			{[
				{
					name: "자유게시판", href: "/additem",
				},
				{
					name: "중고마켓", href: "/items",
				},
			]}
			</Header>
			{
				children
			}
		</main>
	);
}
