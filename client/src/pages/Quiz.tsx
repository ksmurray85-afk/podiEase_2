import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { type Product } from "@shared/schema";
import { ProductCard } from "@/components/ProductCard";
import { CheckCircle2, ArrowLeft, Footprints } from "lucide-react";
import { Link } from "wouter";

interface QuizProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

interface QuizAnswers {
  painLevel?: string;
  painLocation?: string;
  activityLevel?: string;
  footType?: string;
  treatmentGoal?: string;
}

export default function Quiz({ products, onAddToCart }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: "painLevel",
      question: "How would you describe your heel pain level?",
      options: [
        { value: "mild", label: "Mild - Slight discomfort, doesn't limit activities" },
        { value: "moderate", label: "Moderate - Noticeable pain, some activity limitations" },
        { value: "severe", label: "Severe - Significant pain, major activity limitations" },
      ],
    },
    {
      id: "painLocation",
      question: "Where is your pain primarily located?",
      options: [
        { value: "heel", label: "Bottom of heel, especially first steps in morning" },
        { value: "arch", label: "Along the arch of the foot" },
        { value: "both", label: "Both heel and arch" },
      ],
    },
    {
      id: "activityLevel",
      question: "What's your typical activity level?",
      options: [
        { value: "sedentary", label: "Mostly sitting, minimal walking" },
        { value: "moderate", label: "Regular walking, some standing during the day" },
        { value: "active", label: "Very active, running, sports, or standing job" },
      ],
    },
    {
      id: "footType",
      question: "Which best describes your feet?",
      options: [
        { value: "flat", label: "Flat feet or low arches" },
        { value: "normal", label: "Normal/medium arches" },
        { value: "high", label: "High arches" },
      ],
    },
    {
      id: "treatmentGoal",
      question: "What's your primary treatment goal?",
      options: [
        { value: "immediate", label: "Immediate pain relief for daily activities" },
        { value: "recovery", label: "Long-term healing and recovery" },
        { value: "prevention", label: "Prevent flare-ups and maintain comfort" },
      ],
    },
  ];

  const getRecommendations = (): Product[] => {
    const { painLevel, painLocation, activityLevel, footType, treatmentGoal } = answers;
    let scores = new Map<string, number>();

    products.forEach((product) => {
      let score = 0;
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();

      // Pain level scoring
      if (painLevel === "severe") {
        if (title.includes("orthotic") || title.includes("splint")) score += 3;
        if (title.includes("gel") || title.includes("cushion")) score += 2;
      } else if (painLevel === "moderate") {
        if (title.includes("orthotic")) score += 3;
        if (title.includes("gel") || title.includes("compression")) score += 2;
      } else if (painLevel === "mild") {
        if (title.includes("massage") || title.includes("compression")) score += 2;
      }

      // Pain location scoring
      if (painLocation === "heel") {
        if (title.includes("heel") || title.includes("cushion")) score += 3;
      } else if (painLocation === "arch") {
        if (title.includes("arch") || title.includes("orthotic")) score += 3;
      } else if (painLocation === "both") {
        if (title.includes("orthotic") || title.includes("insole")) score += 3;
      }

      // Activity level scoring
      if (activityLevel === "active") {
        if (title.includes("orthotic") || title.includes("compression")) score += 2;
      } else if (activityLevel === "sedentary") {
        if (title.includes("cushion") || title.includes("massage")) score += 2;
      }

      // Foot type scoring
      if (footType === "flat") {
        if (title.includes("arch") || title.includes("orthotic")) score += 3;
      } else if (footType === "high") {
        if (title.includes("cushion") || title.includes("gel")) score += 2;
      }

      // Treatment goal scoring
      if (treatmentGoal === "immediate") {
        if (title.includes("gel") || title.includes("cushion")) score += 2;
      } else if (treatmentGoal === "recovery") {
        if (title.includes("splint") || title.includes("orthotic")) score += 3;
      } else if (treatmentGoal === "prevention") {
        if (title.includes("compression") || title.includes("massage")) score += 2;
      }

      // Bonus for podiatrist picks
      if (product.isPodiatristPick) score += 1;

      scores.set(product.id, score);
    });

    // Sort products by score and return top 3
    return products
      .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0))
      .slice(0, 3);
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((step + 1) / questions.length) * 100;
  const currentQuestion = questions[step];
  const currentAnswer = answers[currentQuestion?.id as keyof QuizAnswers];
  const recommendations = showResults ? getRecommendations() : [];

  if (showResults) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-green-600/10 rounded-full mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-section-mobile md:text-section text-foreground mb-4">
              Your Personalized Recommendations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Based on your answers, our podiatry algorithm recommends these products for optimal relief
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleRestart} data-testid="button-retake-quiz">
              Retake Quiz
            </Button>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-browse-all">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Footprints className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Find Your Perfect Solution
          </h1>
          <p className="text-lg text-muted-foreground">
            Answer a few questions to get personalized product recommendations
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {step + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      currentAnswer === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAnswer(option.value)}
                    data-testid={`option-${option.value}`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-next"
              >
                {step === questions.length - 1 ? "See Results" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
