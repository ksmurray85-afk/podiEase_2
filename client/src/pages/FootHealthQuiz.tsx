import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  type: "single-choice" | "multi-choice";
  order: number;
  choices: Array<{
    value: string;
    label: string;
    weight: Record<string, number>;
  }>;
}

const emailFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
  newsletterOptIn: z.boolean().default(true),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

export default function FootHealthQuiz() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { data: questions, isLoading } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz/questions"],
  });

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      newsletterOptIn: true,
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/quiz/sessions", data);
      return response.json();
    },
    onSuccess: (data: any) => {
      setSessionId(data.id);
      setCurrentStep(1);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitAnswersMutation = useMutation({
    mutationFn: async ({
      sessionId,
      answers,
    }: {
      sessionId: string;
      answers: Record<number, string | string[]>;
    }) => {
      // Convert answers to API format - server will calculate recommended program
      const answerData = Object.entries(answers).map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        value: Array.isArray(value) ? JSON.stringify(value) : value,
      }));

      return apiRequest("PATCH", `/api/quiz/sessions/${sessionId}`, {
        answers: answerData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quiz/sessions"] });
      if (sessionId) {
        setLocation(`/quiz/results/${sessionId}`);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit answers. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onEmailSubmit = form.handleSubmit((data) => {
    createSessionMutation.mutate(data);
  });

  const handleAnswer = (questionId: number, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (!questions) return;
    
    const currentQuestion = questions[currentStep - 1];
    if (!currentQuestion || !answers[currentQuestion.id]) {
      toast({
        title: "Please answer the question",
        description: "Select at least one option to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      if (sessionId) {
        submitAnswersMutation.mutate({ sessionId, answers });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown mx-auto mb-4"></div>
          <p className="text-charcoal-navy">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const totalSteps = (questions?.length || 0) + 1;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {currentStep === 0 ? (
          <div className="text-center space-y-8">
            <div>
              <h1 className="font-['Biski_Trial',_'Open_Sans',_sans-serif] text-5xl md:text-6xl font-bold text-charcoal-navy mb-4">
                Your Personalized Foot Health Plan
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Answer 6 quick questions and receive a customized 7-day program designed by podiatrists to address your specific foot concerns
              </p>
            </div>

            <Card className="p-8 text-left">
              <form onSubmit={onEmailSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-charcoal-navy font-medium">
                      First Name
                    </Label>
                    <Input
                      {...form.register("firstName")}
                      id="firstName"
                      placeholder="Enter your first name"
                      data-testid="input-firstName"
                      className="mt-2"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-charcoal-navy font-medium">
                      Email Address
                    </Label>
                    <Input
                      {...form.register("email")}
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      data-testid="input-email"
                      className="mt-2"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletterOptIn"
                      checked={form.watch("newsletterOptIn")}
                      onCheckedChange={(checked) =>
                        form.setValue("newsletterOptIn", checked as boolean)
                      }
                      data-testid="checkbox-newsletter"
                    />
                    <Label
                      htmlFor="newsletterOptIn"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Yes, send me foot health tips and exclusive offers
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brown hover:bg-brown/90 text-white"
                  disabled={createSessionMutation.isPending}
                  data-testid="button-start-quiz"
                >
                  {createSessionMutation.isPending ? "Starting..." : "Start Quiz"}
                </Button>
              </form>
            </Card>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-brown" />
                <span>Takes 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-brown" />
                <span>Podiatrist-designed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-brown" />
                <span>Personalized results</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentStep} of {questions?.length}
                </span>
                <span className="text-sm font-medium text-brown">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {questions && questions[currentStep - 1] && (
              <Card className="p-8">
                <div className="space-y-6">
                  <h2 className="font-['Biski_Trial',_'Open_Sans',_sans-serif] text-3xl font-bold text-charcoal-navy">
                    {questions[currentStep - 1].question}
                  </h2>

                  {questions[currentStep - 1].type === "single-choice" ? (
                    <RadioGroup
                      value={
                        typeof answers[questions[currentStep - 1].id] === "string"
                          ? (answers[questions[currentStep - 1].id] as string)
                          : ""
                      }
                      onValueChange={(value) =>
                        handleAnswer(questions[currentStep - 1].id, value)
                      }
                      className="space-y-3"
                    >
                      {questions[currentStep - 1].choices.map((choice) => (
                        <div
                          key={choice.value}
                          className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover-elevate cursor-pointer"
                          onClick={() =>
                            handleAnswer(questions[currentStep - 1].id, choice.value)
                          }
                          data-testid={`choice-${choice.value}`}
                        >
                          <RadioGroupItem value={choice.value} id={choice.value} />
                          <Label htmlFor={choice.value} className="flex-1 cursor-pointer">
                            {choice.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-3">
                      {questions[currentStep - 1].choices.map((choice) => {
                        const currentAnswers = answers[questions[currentStep - 1].id];
                        const isChecked = Array.isArray(currentAnswers)
                          ? currentAnswers.includes(choice.value)
                          : false;

                        return (
                          <div
                            key={choice.value}
                            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover-elevate cursor-pointer"
                            onClick={() => {
                              const currentAnswers = answers[questions[currentStep - 1].id];
                              const newAnswers = Array.isArray(currentAnswers)
                                ? currentAnswers.includes(choice.value)
                                  ? currentAnswers.filter((v) => v !== choice.value)
                                  : [...currentAnswers, choice.value]
                                : [choice.value];
                              handleAnswer(questions[currentStep - 1].id, newAnswers);
                            }}
                            data-testid={`choice-${choice.value}`}
                          >
                            <Checkbox
                              id={choice.value}
                              checked={isChecked}
                              onCheckedChange={() => {}}
                            />
                            <Label htmlFor={choice.value} className="flex-1 cursor-pointer">
                              {choice.label}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={submitAnswersMutation.isPending}
                data-testid="button-back"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-brown hover:bg-brown/90 text-white"
                disabled={submitAnswersMutation.isPending}
                data-testid="button-next"
              >
                {submitAnswersMutation.isPending
                  ? "Analyzing..."
                  : currentStep === questions?.length
                  ? "Get My Plan"
                  : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
