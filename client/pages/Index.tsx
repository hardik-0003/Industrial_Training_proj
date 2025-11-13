import { ArrowRight, Sparkles, Zap, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center font-bold text-slate-900">
              RA
            </div>
            <span className="font-bold text-lg">ReviewAnalyzer</span>
          </div>
          <Link to="/analyzer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Launch App
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">
                Instant Sentiment Intelligence
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Understand Customer{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sentiment
              </span>{" "}
              in Seconds
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Instantly analyze and classify the sentiment of any product review.
              Powered by advanced AI, our tool cuts through informal language,
              slang, and typos to deliver accurate insights in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/analyzer" className="flex">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg gap-2">
                  Start Analyzing <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800/50 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-12 text-slate-400">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">10M+</span>
                <span className="text-sm">Reviews Analyzed</span>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">99%</span>
                <span className="text-sm">Accuracy Rate</span>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">&lt;100ms</span>
                <span className="text-sm">Response Time</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <p className="text-sm text-slate-400 mb-2">Example Review</p>
                  <p className="text-slate-200">
                    "Amazing quality! Shipping was super fast and the product exceeded my expectations. Highly recommend!"
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">92%</div>
                    <div className="text-xs text-slate-400 mt-1">Positive</div>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">6%</div>
                    <div className="text-xs text-slate-400 mt-1">Neutral</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">2%</div>
                    <div className="text-xs text-slate-400 mt-1">Negative</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800/50 border-t border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for accuracy and ease of use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Real-Time Analysis",
                description:
                  "Instant sentiment classification as you type your review",
              },
              {
                icon: Shield,
                title: "Handles Slang & Typos",
                description:
                  "Advanced NLP that understands informal language and common misspellings",
              },
              {
                icon: BarChart3,
                title: "Detailed Insights",
                description:
                  "Understand confidence scores and sentiment distribution",
              },
              {
                icon: Sparkles,
                title: "No Setup Required",
                description:
                  "Start analyzing reviews immediately without login or configuration",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Analyze Reviews?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start understanding customer sentiment instantly. No credit card
            required.
          </p>
          <Link to="/analyzer">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg">
              Launch Sentiment Analyzer <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>
            © 2024 ReviewAnalyzer. Intelligent Sentiment Analysis for Modern
            E-commerce.
          </p>
        </div>
      </footer>
    </div>
  );
}
