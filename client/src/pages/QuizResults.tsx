import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Mail, Clock, Target } from "lucide-react";

interface QuizSession {
  id: string;
  email: string;
  firstName: string | null;
  resultProgramId: number | null;
  completedAt: Date;
}

interface QuizProgram {
  id: number;
  slug: string;
  title: string;
  description: string;
  targetConditions: string[];
  dayPlan: Array<{
    day: number;
    title: string;
    exercises: string[];
    tips: string[];
    duration: string;
  }>;
  recommendedProducts: string[];
}

export default function QuizResults() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: session, isLoading: sessionLoading } = useQuery<QuizSession>({
    queryKey: ["/api/quiz/sessions", id],
  });

  const { data: program, isLoading: programLoading } = useQuery<QuizProgram>({
    queryKey: ["/api/quiz/programs", session?.resultProgramId],
    enabled: !!session?.resultProgramId,
  });

  const isLoading = sessionLoading || programLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown mx-auto mb-4"></div>
          <p className="text-charcoal-navy">Loading your personalized plan...</p>
        </div>
      </div>
    );
  }

  if (!session || !program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-charcoal-navy">
            Results Not Found
          </h1>
          <p className="text-gray-600">
            We couldn't find your quiz results. Please try taking the quiz again.
          </p>
          <Button
            onClick={() => setLocation("/quiz")}
            className="bg-brown hover:bg-brown/90 text-white"
            data-testid="button-retake-quiz"
          >
            Take Quiz
          </Button>
        </div>
      </div>
    );
  }

  const firstName = session.firstName || "there";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Check className="w-4 h-4 mr-1" />
            Quiz Complete
          </Badge>
          <h1 className="font-['Biski_Trial',_'Open_Sans',_sans-serif] text-5xl md:text-6xl font-bold text-charcoal-navy">
            Your Personalized Plan, {firstName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your responses, we've created a custom 7-day program designed specifically for your needs
          </p>
        </div>

        {/* Program Overview */}
        <Card className="p-8 mb-8 bg-cream border-tan">
          <div className="space-y-4">
            <h2 className="font-['Biski_Trial',_'Open_Sans',_sans-serif] text-3xl font-bold text-charcoal-navy">
              {program.title}
            </h2>
            <p className="text-gray-700 text-lg">{program.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brown" />
                <span>7-day program</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-brown" />
                <span>Podiatrist-designed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brown" />
                <span>Results sent to {session.email}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 7-Day Plan */}
        <div className="space-y-6 mb-12">
          <h3 className="font-['Biski_Trial',_'Open_Sans',_sans-serif] text-2xl font-bold text-charcoal-navy">
            Your 7-Day Journey
          </h3>
          <div className="grid gap-6">
            {program.dayPlan.map((day) => (
              <Card
                key={day.day}
                className="p-6 hover-elevate"
                data-testid={`day-plan-${day.day}`}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-brown text-white flex items-center justify-center font-bold text-xl">
                      {day.day}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-bold text-xl text-charcoal-navy mb-1">
                        Day {day.day}: {day.title}
                      </h4>
                      <p className="text-sm text-gray-600">{day.duration}</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-charcoal-navy mb-2">
                        Exercises
                      </h5>
                      <ul className="space-y-1">
                        {day.exercises.map((exercise, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-700"
                          >
                            <Check className="w-4 h-4 text-brown mr-2 mt-1 flex-shrink-0" />
                            <span>{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-charcoal-navy mb-2">
                        Tips
                      </h5>
                      <ul className="space-y-1">
                        {day.tips.map((tip, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-600 text-sm"
                          >
                            <span className="text-brown mr-2">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.print()}
            data-testid="button-download-plan"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Plan
          </Button>
          <Button
            size="lg"
            className="bg-brown hover:bg-brown/90 text-white"
            onClick={() => setLocation("/shop")}
            data-testid="button-shop-products"
          >
            Shop Recommended Products
          </Button>
        </div>

        {/* Email Confirmation */}
        <div className="mt-12 text-center">
          <Card className="p-6 bg-cream border-tan inline-block">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brown" />
              <p className="text-gray-700">
                A copy of your personalized plan has been sent to{" "}
                <span className="font-semibold">{session.email}</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
