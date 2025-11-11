import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Video, BookOpen, Dumbbell, Shield } from "lucide-react";

export default function Resources() {
  const downloadables = [
    {
      title: "Plantar Fasciitis Exercise Guide",
      description: "A comprehensive PDF guide with illustrated stretching and strengthening exercises",
      icon: Dumbbell,
      size: "2.4 MB",
      format: "PDF",
    },
    {
      title: "Daily Care Routine Checklist",
      description: "Track your daily treatment routine with our printable checklist",
      icon: BookOpen,
      size: "156 KB",
      format: "PDF",
    },
    {
      title: "Prevention & Recovery Timeline",
      description: "Visual guide showing what to expect during your recovery journey",
      icon: Shield,
      size: "890 KB",
      format: "PDF",
    },
  ];

  const videos = [
    {
      title: "Morning Stretching Routine",
      duration: "8 mins",
      description: "Essential stretches to perform before getting out of bed",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
    },
    {
      title: "Proper Footwear Selection",
      duration: "6 mins",
      description: "Learn what to look for when choosing supportive shoes",
      thumbnail: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=450&fit=crop",
    },
    {
      title: "Calf Strengthening Exercises",
      duration: "10 mins",
      description: "Build strength to prevent future plantar fasciitis",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
    },
  ];

  const exercises = [
    {
      title: "Calf Stretch",
      difficulty: "Beginner",
      duration: "30 seconds per side",
      steps: [
        "Stand facing a wall with hands at shoulder height",
        "Step one foot back, keeping it straight",
        "Bend front knee while keeping back heel on ground",
        "Hold stretch for 30 seconds, then switch sides",
      ],
    },
    {
      title: "Towel Stretch",
      difficulty: "Beginner",
      duration: "30 seconds per side",
      steps: [
        "Sit with legs extended in front of you",
        "Loop a towel around the ball of your foot",
        "Gently pull towel towards you, keeping knee straight",
        "Hold for 30 seconds, then switch sides",
      ],
    },
    {
      title: "Plantar Fascia Massage",
      difficulty: "Beginner",
      duration: "2-3 minutes per foot",
      steps: [
        "Sit comfortably and cross one ankle over opposite knee",
        "Use thumb to apply firm pressure along arch",
        "Massage from heel to toes with deep, slow strokes",
        "Repeat on other foot",
      ],
    },
    {
      title: "Toe Curls",
      difficulty: "Intermediate",
      duration: "3 sets of 10 reps",
      steps: [
        "Sit in chair with feet flat on floor",
        "Place small towel under feet",
        "Use toes to scrunch and pull towel toward you",
        "Release and repeat for 10 reps",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-blue/5 py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary">Free Resources</span>
          </div>
          <h1 className="text-section-mobile md:text-section text-foreground mb-6">
            Educational Resources & Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert-created content to support your journey to pain-free living
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="downloads" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="downloads" data-testid="tab-downloads">
              <Download className="h-4 w-4 mr-2" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="videos" data-testid="tab-videos">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="exercises" data-testid="tab-exercises">
              <Dumbbell className="h-4 w-4 mr-2" />
              Exercises
            </TabsTrigger>
          </TabsList>

          <TabsContent value="downloads" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Downloadable Guides</h2>
              <p className="text-muted-foreground">
                Free PDF resources to help you understand and manage plantar fasciitis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadables.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover-elevate">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">{resource.format}</span>
                        <span className="text-xs text-muted-foreground">{resource.size}</span>
                      </div>
                      <Button className="w-full" variant="outline" data-testid={`button-download-${index}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Guide
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Video Tutorials</h2>
              <p className="text-muted-foreground">
                Follow along with our podiatrist-guided exercise demonstrations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="overflow-hidden hover-elevate">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Video className="h-8 w-8 text-primary ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {video.description}
                    </p>
                    <Button className="w-full" data-testid={`button-watch-${index}`}>
                      <Video className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Exercise Library</h2>
              <p className="text-muted-foreground">
                Step-by-step instructions for effective plantar fasciitis exercises
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{exercise.title}</CardTitle>
                      <Badge variant="secondary">{exercise.difficulty}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Duration: {exercise.duration}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {exercise.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need More Support?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Browse our podiatrist-approved products designed to complement these exercises and accelerate your recovery
          </p>
          <a href="/shop">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Shop Relief Products
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className, variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "secondary" }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variant === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"} ${className}`}>
      {children}
    </span>
  );
}
