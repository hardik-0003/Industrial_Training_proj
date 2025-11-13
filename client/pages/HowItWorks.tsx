import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Zap,
  Brain,
  FileText,
  BarChart3,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Write Your Review",
      description:
        "Simply paste or type any product review. No special formatting needed - we handle informal language, typos, and slang naturally.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced sentiment analysis engine instantly processes your review, understanding context and nuance even in casual language.",
    },
    {
      icon: BarChart3,
      title: "Get Insights",
      description:
        "Receive detailed sentiment breakdown with confidence scores and emotion analysis to understand the review's true meaning.",
    },
    {
      icon: CheckCircle,
      title: "Save & Compare",
      description:
        "Store reviews in your history and track sentiment patterns over time. Perfect for monitoring product performance.",
    },
  ];

  const benefits = [
    {
      title: "Handles Real Language",
      description:
        "We understand abbreviations, emojis, slang, and common typos that traditional tools miss.",
      icon: Zap,
    },
    {
      title: "Lightning Fast",
      description:
        "Get sentiment analysis in milliseconds. Real-time feedback as you type.",
      icon: Clock,
    },
    {
      title: "Easy to Use",
      description:
        "No login required, no setup needed. Just paste a review and hit analyze. That's it.",
      icon: Shield,
    },
    {
      title: "Detailed Insights",
      description:
        "Beyond positive/negative, understand satisfaction, trust, and value perception with detailed breakdowns.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="font-bold text-lg">How It Works</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro Section */}
        <section className="mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Writing and Analyzing Reviews{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            ReviewAnalyzer transforms how you understand product feedback. We
            make it effortless to write, analyze, and learn from reviews in
            real-time.
          </p>
        </section>

        {/* Step-by-Step Process */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center">
            4 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <step.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Why ReviewAnalyzer?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <benefit.icon className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-20 bg-slate-800/50 border border-slate-700 rounded-xl p-10">
          <h3 className="text-2xl font-bold mb-8">What Makes Us Different</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Understands Informal Language
                </h4>
                <p className="text-slate-300">
                  Traditional tools struggle with real-world reviews filled with
                  abbreviations, slang, and typos. Our AI is trained to
                  understand how people actually write, not formal English.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Instant Feedback</h4>
                <p className="text-slate-300">
                  No waiting, no processing delays. Analyze reviews as you write
                  them. Our real-time engine delivers insights in milliseconds,
                  perfect for quick decision-making.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  No Setup Required
                </h4>
                <p className="text-slate-300">
                  Unlike complex analytics platforms, ReviewAnalyzer requires
                  zero setup. No accounts, no API keys, no configuration. Just
                  paste a review and analyze.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Track Patterns Over Time
                </h4>
                <p className="text-slate-300">
                  Save and review your analysis history. Identify sentiment
                  trends, spot issues early, and celebrate positive feedback
                  patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Start analyzing product reviews today and unlock insights you never
            knew existed.
          </p>
          <Link to="/analyzer">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-6 text-lg gap-2">
              Launch Sentiment Analyzer <Zap className="w-5 h-5" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
