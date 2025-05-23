import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg mt-2">Página no encontrada</p>
        <Button asChild>
            <Link href="/" className="mt-4">Volver al inicio</Link>
        </Button>
    </div>
}