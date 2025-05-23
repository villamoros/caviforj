import Link from "next/link";

export function Footer() {
    return <footer className="py4- px-6 bg-white w-full">
        <div className="flex justify-between items-center text-sm text-slate-500">
            <p>2025 © CaViForj</p>
            <div className="flex gap-2 items-center">
                <Link href="/privacy-policy">Privacidad</Link>
                <Link href="/terms">Términos de uso</Link>
            </div>
        </div>
    </footer>
}