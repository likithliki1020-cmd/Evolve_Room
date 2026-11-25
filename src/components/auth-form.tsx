"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
    const isRegister = mode === "register";
    const router = useRouter();
    const { data: session, status } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    // Show errors that NextAuth sends back in the URL (e.g. Google failed)
    useEffect(() => {
        const err = new URLSearchParams(window.location.search).get("error");
        if (err) setError("Sign-in failed. Please try again.");
    }, []);

    // Already signed in -> go to the right dashboard
    useEffect(() => {
        if (status === "authenticated" && !busy) {
            router.replace(session?.user?.isAdmin ? "/admin" : "/dashboard");
        }
    }, [status, busy, session, router]);

    const signInWithCredentials = async () => {
        const res = await signIn("credentials", {
            email: email.trim().toLowerCase(),
            password,
            redirect: false,
        });
        if (res?.error) setError("Incorrect email or password.");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setBusy(true);
        try {
            if (isRegister) {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });
                const json = await res.json();
                if (!res.ok) {
                    setError(json.error || "Could not create the account.");
                    return;
                }
            }
            await signInWithCredentials();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setBusy(false);
        }
    };

    const handleGoogle = async () => {
        setError("");
        setBusy(true);
        // Returns to /login, which then routes admin -> /admin, others -> /dashboard
        await signIn("google", { callbackUrl: "/login" });
    };

    return (
        <div className="w-full max-w-md border border-border/50 bg-card p-8 md:p-10 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-headline font-bold text-primary">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-sm text-muted-foreground italic">
                    {isRegister
                        ? "Register to track your sessions, payments and receipts."
                        : "Sign in to view your sessions, payments and receipts."}
                </p>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={handleGoogle}
                disabled={busy}
                className="w-full h-12 rounded-none uppercase tracking-widest text-xs font-bold border-primary text-primary"
            >
                Continue with Google
            </Button>

            <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
                <div className="h-px flex-1 bg-border" />
                or
                <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={isRegister ? 8 : undefined}
                        autoComplete={isRegister ? "new-password" : "current-password"}
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                    type="submit"
                    disabled={busy}
                    className="w-full h-12 rounded-none uppercase tracking-widest text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {busy ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                {isRegister ? "Already have an account?" : "New here?"}{" "}
                <Link href={isRegister ? "/login" : "/register"} className="text-primary font-bold hover:underline">
                    {isRegister ? "Sign in" : "Create an account"}
                </Link>
            </p>
        </div>
    );
}