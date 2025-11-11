import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, CheckCircle2, Activity, Clock, TrendingDown, Footprints, Moon, Dumbbell, BookOpen } from "lucide-react";

function FootDiagram() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-12">
      <div className="bg-gradient-to-br from-primary/5 to-blue/5 rounded-2xl p-8 md:p-12">
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Understanding Plantar Fasciitis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-md flex items-center justify-center">
            <img
              src={new URL('@assets/istockphoto-2151402825-640x640_1762676373324.avif', import.meta.url).href}
              alt="Foot anatomy diagram"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md flex items-center justify-center">
            <img
              src={new URL('@assets/istockphoto-2154412570-612x612_1762676373328.jpg', import.meta.url).href}
              alt="Plantar fasciitis diagram showing inflammation"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
          The plantar fascia is a thick band of tissue connecting your heel to your toes. Inflammation at the heel attachment causes the characteristic heel pain.
        </p>
      </div>
    </div>
  );
}

function TreatmentJourney() {
  const stages = [
    {
      icon: AlertCircle,
      title: "Symptom Recognition",
      description: "Sharp heel pain, especially in morning",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Activity,
      title: "Start Treatment",
      description: "Orthotics, stretching, rest",
      color: "text-blue",
      bgColor: "bg-blue/10",
    },
    {
      icon: TrendingDown,
      title: "Pain Reduction",
      description: "Gradual improvement over weeks",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: CheckCircle2,
      title: "Full Recovery",
      description: "Return to normal activities",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
  ];

  return (
    <div className="my-16">
      <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Your Recovery Journey</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={index} className="relative">
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/40 to-primary/20 z-0" />
              )}
              <div className="relative z-10">
                <div className={`${stage.bgColor} rounded-xl p-6 text-center h-full hover-elevate transition-all`}>
                  <div className={`w-16 h-16 ${stage.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-background`}>
                    <Icon className={`h-8 w-8 ${stage.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Learn() {
  const treatments = [
    {
      icon: Footprints,
      title: "Orthotic Insoles",
      description: "Medical-grade arch support reduces strain on plantar fascia",
      effectiveness: "Most Effective",
    },
    {
      icon: Activity,
      title: "Stretching Protocol",
      description: "Daily exercises improve flexibility and reduce morning pain",
      effectiveness: "Highly Recommended",
    },
    {
      icon: Moon,
      title: "Night Splints",
      description: "Maintain proper foot position during sleep for faster healing",
      effectiveness: "Accelerates Recovery",
    },
    {
      icon: Dumbbell,
      title: "Strengthening",
      description: "Targeted exercises build foot and calf strength",
      effectiveness: "Long-term Prevention",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-blue/5 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary">Evidence-Based Information</span>
          </div>
          <h1 className="text-section-mobile md:text-section text-foreground mb-6" data-testid="text-learn-headline">
            Understanding Plantar Fasciitis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-learn-intro">
            Expert podiatry insights to help you recognize, treat, and overcome heel pain effectively
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Anatomy Diagram */}
        <FootDiagram />

        {/* What is Plantar Fasciitis - Enhanced */}
        <Card className="border-2 border-primary/20" data-testid="card-what-is">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="text-2xl">What is Plantar Fasciitis?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground pt-6">
            <p className="text-lg leading-relaxed">
              Plantar fasciitis is one of the most common causes of heel pain, affecting millions of people worldwide. It involves inflammation of the <strong className="text-foreground">plantar fascia</strong>—a thick, fibrous band of tissue that runs along the bottom of your foot, connecting your heel bone to your toes.
            </p>
            <div className="bg-blue/5 border-l-4 border-blue p-4 rounded">
              <p className="text-foreground">
                <Clock className="inline h-5 w-5 text-blue mr-2" />
                <strong>Typical Pattern:</strong> Stabbing pain that's usually worst with the first steps in the morning. The pain normally decreases as you move around, but may return after prolonged standing or rising from sitting.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms - Two Column Layout */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Recognizing the Symptoms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-elevate" data-testid="card-symptoms">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-6 w-6" />
                  Common Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Sharp, stabbing pain in bottom of foot near heel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Pain worse after waking or long periods of rest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Increased discomfort after exercise or activity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Foot stiffness and reduced flexibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Age between 40-60 years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Prolonged standing or walking on hard surfaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Flat feet, high arches, or abnormal gait</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Being overweight or sudden weight gain</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Treatment Journey Visualization */}
        <TreatmentJourney />

        {/* Evidence-Based Treatments - Enhanced Grid */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Proven Treatment Methods</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Research shows that a multi-faceted approach delivers the best results for plantar fasciitis relief
          </p>
          
          <div className="grid md:grid-cols-2 gap-6" data-testid="card-treatment">
            {treatments.map((treatment, index) => {
              const Icon = treatment.icon;
              return (
                <Card key={index} className="hover-elevate border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{treatment.title}</h3>
                          <span className="text-xs bg-green-600/10 text-green-600 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                            {treatment.effectiveness}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{treatment.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Free Resources Section */}
        <Card className="border-2 border-blue/30 bg-gradient-to-br from-blue/5 to-transparent">
          <CardContent className="p-8 md:p-10 text-center">
            <div className="inline-block p-3 bg-blue/10 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-blue" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Free Educational Resources
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Download our treatment guides, watch exercise tutorials, and access a complete library of resources created by podiatrists
            </p>
            <Link href="/resources">
              <Button size="lg" className="bg-blue hover:bg-blue/90 text-white" data-testid="button-view-resources">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Resources
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Professional Help CTA - Enhanced */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-10 md:p-12 text-center overflow-hidden" data-testid="card-professional-help">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              When to Seek Professional Help
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              While our podiatrist-approved products provide significant relief, consult a healthcare professional if pain persists beyond a few weeks or significantly impacts your daily life.
            </p>
            <Link href="/shop">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8" 
                data-testid="button-browse-solutions"
              >
                Browse Relief Solutions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
