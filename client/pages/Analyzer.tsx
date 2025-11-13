import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Zap,
  Brain,
  TrendingUp,
  Copy,
  Check,
} from "lucide-react";

interface SentimentResult {
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  emotions: {
    name: string;
    score: number;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    textColor: string;
  }[];
}

// Mock sentiment analysis - replace with real API call
const analyzeSentiment = (text: string): SentimentResult => {
  if (!text.trim()) {
    return {
      sentiment: "neutral",
      confidence: 0,
      emotions: [],
    };
  }

  const positiveWords = new Map([
    ["amazing", 2],
    ["excellent", 2],
    ["fantastic", 2],
    ["superb", 2],
    ["outstanding", 2],
    ["exceptional", 2],
    ["wonderful", 2],
    ["perfect", 2],
    ["brilliant", 2],
    ["phenomenal", 2],
    ["incredible", 2],
    ["great", 1.5],
    ["awesome", 1.5],
    ["good", 1.5],
    ["love", 1.5],
    ["best", 1.5],
    ["beautiful", 1.5],
    ["impressive", 1.5],
    ["nice", 1.5],
    ["fine", 1.5],
    ["terrific", 1.5],
    ["splendid", 1.5],
    ["durable", 1.5],
    ["reliable", 1.5],
    ["quality", 1.5],
    ["useful", 1.5],
    ["helpful", 1.5],
    ["easy", 1.5],
    ["simple", 1.5],
    ["smooth", 1.5],
    ["fast", 1.5],
    ["quick", 1.5],
    ["efficient", 1.5],
    ["effective", 1.5],
    ["happy", 1.5],
    ["satisfied", 1.5],
    ["pleased", 1.5],
    ["delighted", 1.5],
    ["impressed", 1.5],
    ["recommend", 1.5],
    ["worth", 1.5],
    ["value", 1.5],
    ["ok", 1],
    ["okay", 1],
    ["decent", 1],
    ["adequate", 1],
    ["acceptable", 1],
    ["like", 1],
    ["enjoy", 1],
  ]);

  const negativeWords = new Map([
    ["awful", 2],
    ["terrible", 2],
    ["horrible", 2],
    ["worst", 2],
    ["disgusting", 2],
    ["atrocious", 2],
    ["abysmal", 2],
    ["bad", 1.5],
    ["hate", 1.5],
    ["poor", 1.5],
    ["disappointing", 1.5],
    ["useless", 1.5],
    ["waste", 1.5],
    ["broken", 1.5],
    ["defective", 1.5],
    ["cheap", 1.5],
    ["fragile", 1.5],
    ["slow", 1.5],
    ["unreliable", 1.5],
    ["unhappy", 1.5],
    ["unsatisfied", 1.5],
    ["regret", 1.5],
    ["wrong", 1.5],
    ["problem", 1.5],
    ["issue", 1.5],
    ["complaint", 1.5],
    ["fail", 1.5],
    ["failed", 1.5],
    ["meh", 1],
    ["mediocre", 1],
    ["average", 1],
  ]);

  const intensifiers = new Map([
    ["very", 1.3],
    ["extremely", 1.3],
    ["incredibly", 1.3],
    ["absolutely", 1.3],
    ["really", 1.2],
    ["quite", 1.1],
    ["so", 1.2],
  ]);

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  let positiveScore = 0;
  let negativeScore = 0;
  let lastIntensifier = 1;

  words.forEach((word) => {
    const cleanWord = word.replace(/[^a-z]/g, "");

    if (intensifiers.has(cleanWord)) {
      lastIntensifier = intensifiers.get(cleanWord) || 1;
    } else {
      if (positiveWords.has(cleanWord)) {
        positiveScore += (positiveWords.get(cleanWord) || 1) * lastIntensifier;
      } else if (negativeWords.has(cleanWord)) {
        negativeScore += (negativeWords.get(cleanWord) || 1) * lastIntensifier;
      }
      lastIntensifier = 1;
    }
  });

  const total = positiveScore + negativeScore;
  let sentiment: "positive" | "neutral" | "negative" = "neutral";
  let confidence = 0;

  if (total > 0) {
    const positiveRatio = positiveScore / total;
    if (positiveRatio >= 0.65) {
      sentiment = "positive";
      confidence = Math.min(95, Math.round(65 + positiveRatio * 30));
    } else if (positiveRatio <= 0.35) {
      sentiment = "negative";
      confidence = Math.min(95, Math.round(65 + (1 - positiveRatio) * 30));
    } else {
      sentiment = "neutral";
      confidence = Math.round(50 + Math.abs(0.5 - positiveRatio) * 20);
    }
  } else {
    if (text.includes("!")) {
      sentiment = "positive";
      confidence = 55;
    } else if (text.includes("?")) {
      sentiment = "neutral";
      confidence = 45;
    } else {
      sentiment = "neutral";
      confidence = 40;
    }
  }

  return {
    sentiment,
    confidence: Math.round(confidence),
    emotions: [
      {
        name: "Satisfaction",
        score: Math.round(50 + Math.random() * 45),
        color: "emerald",
        gradientFrom: "from-emerald-500",
        gradientTo: "to-emerald-400",
        textColor: "text-emerald-400",
      },
      {
        name: "Trust",
        score: Math.round(45 + Math.random() * 50),
        color: "blue",
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-400",
        textColor: "text-blue-400",
      },
      {
        name: "Value",
        score: Math.round(40 + Math.random() * 55),
        color: "purple",
        gradientFrom: "from-purple-500",
        gradientTo: "to-purple-400",
        textColor: "text-purple-400",
      },
    ],
  };
};

export default function Analyzer() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<
    Array<{ review: string; result: SentimentResult }>
  >([]);

  const handleAnalyze = async () => {
    if (!review.trim()) return;

    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newResult = analyzeSentiment(review);
    setResult(newResult);
    setHistory([{ review, result: newResult }, ...history.slice(0, 4)]);

    // Save to localStorage
    const newReviewEntry = {
      id: Date.now().toString(),
      text: review,
      sentiment: newResult.sentiment,
      confidence: newResult.confidence,
      timestamp: new Date().toISOString(),
    };

    try {
      const existingReviews = localStorage.getItem("reviewHistory");
      const reviews = existingReviews ? JSON.parse(existingReviews) : [];
      reviews.unshift(newReviewEntry);
      localStorage.setItem("reviewHistory", JSON.stringify(reviews));
    } catch (error) {
      console.error("Error saving review:", error);
    }

    setIsAnalyzing(false);
  };

  const copyToClipboard = async () => {
    if (result) {
      const text = `Sentiment: ${result.sentiment.toUpperCase()}
Confidence: ${result.confidence}%`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setReview("");
    setResult(null);
  };

  const sentimentConfig = {
    positive: {
      color: "emerald",
      bgColor: "bg-emerald-900/20",
      borderColor: "border-emerald-700/50",
      textColor: "text-emerald-400",
      label: "Positive",
      icon: "😊",
    },
    neutral: {
      color: "amber",
      bgColor: "bg-amber-900/20",
      borderColor: "border-amber-700/50",
      textColor: "text-amber-400",
      label: "Neutral",
      icon: "😐",
    },
    negative: {
      color: "red",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-700/50",
      textColor: "text-red-400",
      label: "Negative",
      icon: "😞",
    },
  };

  const config = sentimentConfig[result?.sentiment || "neutral"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-lg">Sentiment Analyzer</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analyzer */}
          <div className="lg:col-span-2">
            {/* Input Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <label className="text-lg font-semibold">
                  Paste Your Review
                </label>
              </div>

              <Textarea
                placeholder="Enter any product review to analyze its sentiment. We handle informal language, typos, and slang..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-48 bg-slate-900/50 border-slate-600 text-white placeholder-slate-500 rounded-lg mb-6 focus:border-cyan-500 focus:ring-cyan-500/20"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={!review.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1 py-6 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="animate-spin mr-2">⚙️</span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Analyze Sentiment
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClear}
                  disabled={!review.trim()}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800/50 px-6"
                >
                  Clear
                </Button>
              </div>

              <p className="text-sm text-slate-400 mt-4">
                💡 Tip: Longer reviews with more detail tend to produce more
                accurate sentiment analysis
              </p>
            </div>

            {/* Results Section */}
            {result && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Sentiment Badge */}
                <div
                  className={`${config.bgColor} border ${config.borderColor} rounded-xl p-8 backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl mb-4">{config.icon}</div>
                      <div className="text-sm text-slate-400 mb-2">
                        SENTIMENT
                      </div>
                      <div className={`text-4xl font-bold ${config.textColor}`}>
                        {config.label}
                      </div>
                      <div className="text-lg text-slate-300 mt-3">
                        Confidence: <span className="font-bold">{result.confidence}%</span>
                      </div>
                    </div>

                    {/* Confidence Visualization */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 120 120"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="55"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-slate-700"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="55"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className={`text-${config.color}-400 transition-all duration-1000`}
                            strokeDasharray={`${3.14 * 110 * (result.confidence / 100)} ${3.14 * 110}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <div
                            className={`text-3xl font-bold ${config.textColor}`}
                          >
                            {result.confidence}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotions */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">Emotion Breakdown</h3>
                  </div>

                  <div className="space-y-5">
                    {result.emotions.map((emotion, index) => {
                      const emotionColors: Record<
                        string,
                        {
                          textColor: string;
                          bgGradient: string;
                        }
                      > = {
                        emerald: {
                          textColor: "text-emerald-400",
                          bgGradient: "bg-gradient-to-r from-emerald-500 to-emerald-400",
                        },
                        blue: {
                          textColor: "text-blue-400",
                          bgGradient: "bg-gradient-to-r from-blue-500 to-blue-400",
                        },
                        purple: {
                          textColor: "text-purple-400",
                          bgGradient: "bg-gradient-to-r from-purple-500 to-purple-400",
                        },
                      };

                      const colors = emotionColors[emotion.color] || emotionColors.blue;

                      return (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-200">
                              {emotion.name}
                            </span>
                            <span className={`${colors.textColor} font-bold`}>
                              {emotion.score}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full ${colors.bgGradient} transition-all duration-1000`}
                              style={{ width: `${emotion.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Copy Button */}
                <Button
                  onClick={copyToClipboard}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Results
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Analysis History</h3>

              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((entry, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setReview(entry.review);
                        setResult(entry.result);
                      }}
                      className="w-full text-left bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg p-4 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          {entry.result.sentiment}
                        </span>
                        <span className="text-xs text-slate-500">
                          {entry.result.confidence}%
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-2 group-hover:text-slate-200">
                        {entry.review}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-400 py-8">
                  <p className="text-sm">No analysis history yet</p>
                  <p className="text-xs mt-2">
                    Your recent analyses will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
