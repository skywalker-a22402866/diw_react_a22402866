import Link from "next/link";
import MagiaDoJSX from "./components/MagiaDoJSX/MagiaDoJSX";

export default function page() {
return (
<div>
    <header className="flex flex-col items-center">
        <h1>React & Next.js</h1>
        <nav className="flex gap-4">
            <Link href="/">Intro</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/projetos">Projetos</Link>
        </nav>
        </header>
    <h2>Interfaces Modernos</h2>
    <p>Bem vindo À minha app em React e Next.js.</p>
    <MagiaDoJSX />
</div>)
}