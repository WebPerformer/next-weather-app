import Head from "next/head"

// Font
import { Poppins } from "next/font/google"
const poppins = Poppins({
  weight: ["200", "400", "600"],
  style: "normal",
  subsets: ["latin"]
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={poppins.className}>
            <Head>
                <title>Weather App</title>
            </Head>
            <header></header>
            <main className="">
                {children}
            </main>
            <footer></footer>
        </div>
    )
}