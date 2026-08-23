'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, Clock, Users } from "lucide-react";
import { RazorpayCheckoutButton } from "@/components/razorpay-checkout-button";

/**
 * Course enrollment currently uses dummy user data.
 * In production, integrate with your authentication system to get real user data.
 */
const DUMMY_USER = {
  email: "user@example.com",
  name: "User Name",
};

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001";

export default function CoursesPage() {
  const courses = [
    { id: "life-coaching-mastery", name: "Life Coaching Mastery", duration: "12 Weeks", audience: "Aspiring Coaches", amount: 45000, badge: "Live Program" },
    { id: "hooponopono-intensive", name: "Ho'oponopono Intensive", duration: "4 Weeks", audience: "Inner Healing Seekers", amount: 12000, badge: "Bestseller" },
    { id: "eft-anxiety", name: "EFT for Anxiety", duration: "6 Modules", audience: "Emotional Wellness", amount: 8500, badge: "Self-Paced" },
    { id: "nlp-practitioner", name: "NLP Practitioner", duration: "10 Weeks", audience: "Mindset Enthusiasts", amount: 35000, badge: "Live" },
    { id: "chakra-alignment", name: "Chakra Alignment", duration: "7 Modules", audience: "Energy Workers", amount: 9900, badge: "New" },
    { id: "graphology", name: "Subconscious Graphology", duration: "6 Weeks", audience: "Self-Discovery", amount: 15000, badge: "Popular" },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Transformational Education</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Courses & Programs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Self-paced and live programs designed for deep individual evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group flex flex-col bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <div className="h-48 bg-gold-subtle relative flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-none rounded-none tracking-widest uppercase text-[10px]">{course.badge}</Badge>
              </div>
              <div className="p-8 flex-1 flex flex-col space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest min-h-[3rem]">{course.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3" />
                    <span>{course.audience}</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xl font-bold text-primary"><span className="currency-symbol">₹</span>{course.amount.toLocaleString('en-IN')}</span>
                  <RazorpayCheckoutButton
                    courseId={course.id}
                    courseName={course.name}
                    amount={course.amount}
                    userEmail={DUMMY_USER.email}
                    userName={DUMMY_USER.name}
                    backendApiUrl={BACKEND_API_URL}
                    buttonLabel="Enroll Now"
                    variant="link"
                    className="text-foreground group-hover:text-primary transition-colors p-0"
                    onSuccess={(paymentId) => {
                      // Handle successful payment - redirect to dashboard or show success message
                      console.log('Payment successful:', paymentId);
                      // Example: window.location.href = '/dashboard';
                    }}
                    onError={(error) => {
                      console.error('Payment error:', error);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}