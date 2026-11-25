import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
            <AuthForm mode="register" />
        </div>
    );
}