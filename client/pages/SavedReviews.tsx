import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Download, Plus } from "lucide-react";

interface SavedReview {
  id: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  timestamp: string;
}

export default function SavedReviews() {
  const [reviews, setReviews] = useState<SavedReview[]>([]);
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem("reviewHistory");
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error("Error parsing saved reviews:", error);
      }
    }
  }, []);

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem("reviewHistory", JSON.stringify(updated));
  };

  const deleteAllReviews = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all saved reviews? This cannot be undone."
      )
    ) {
      setReviews([]);
      localStorage.removeItem("reviewHistory");
    }
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(reviews, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `review-analysis-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const exportAsCSV = () => {
    const headers = ["Date", "Sentiment", "Confidence", "Review Text"];
    const rows = reviews.map((r) => [
      new Date(r.timestamp).toLocaleString(),
      r.sentiment,
      `${r.confidence}%`,
      `"${r.text.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `review-analysis-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const sentimentConfig = {
    positive: {
      bgColor: "bg-emerald-900/20",
      borderColor: "border-emerald-700/50",
      textColor: "text-emerald-400",
      label: "Positive",
      icon: "😊",
    },
    neutral: {
      bgColor: "bg-amber-900/20",
      borderColor: "border-amber-700/50",
      textColor: "text-amber-400",
      label: "Neutral",
      icon: "😐",
    },
    negative: {
      bgColor: "bg-red-900/20",
      borderColor: "border-red-700/50",
      textColor: "text-red-400",
      label: "Negative",
      icon: "😞",
    },
  };

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.sentiment === filter);

  const stats = {
    total: reviews.length,
    positive: reviews.filter((r) => r.sentiment === "positive").length,
    neutral: reviews.filter((r) => r.sentiment === "neutral").length,
    negative: reviews.filter((r) => r.sentiment === "negative").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="font-bold text-lg">Saved Reviews</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {reviews.length > 0 ? (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {stats.total}
                </div>
                <div className="text-sm text-slate-400">Total Reviews</div>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {stats.positive}
                </div>
                <div className="text-sm text-slate-400">Positive</div>
              </div>
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {stats.neutral}
                </div>
                <div className="text-sm text-slate-400">Neutral</div>
              </div>
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {stats.negative}
                </div>
                <div className="text-sm text-slate-400">Negative</div>
              </div>
            </div>

            {/* Controls Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Review Analysis History
                  </h2>
                  <p className="text-slate-400">
                    View and manage all your saved sentiment analyses
                  </p>
                </div>
                <Link to="/analyzer">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    New Analysis
                  </Button>
                </Link>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "all", label: "All Reviews" },
                    { key: "positive", label: "Positive" },
                    { key: "neutral", label: "Neutral" },
                    { key: "negative", label: "Negative" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === f.key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={exportAsJSON}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800/50 gap-2"
              >
                <Download className="w-4 h-4" />
                Export as JSON
              </Button>
              <Button
                onClick={exportAsCSV}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800/50 gap-2"
              >
                <Download className="w-4 h-4" />
                Export as CSV
              </Button>
              <Button
                onClick={deleteAllReviews}
                variant="outline"
                className="border-red-700/50 text-red-400 hover:bg-red-900/20 ml-auto gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete All
              </Button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => {
                  const config =
                    sentimentConfig[review.sentiment];
                  return (
                    <div
                      key={review.id}
                      className={`${config.bgColor} border ${config.borderColor} rounded-lg p-6 hover:border-slate-500 transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{config.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`font-bold ${config.textColor}`}>
                                {config.label}
                              </span>
                              <span className="text-sm text-slate-400">
                                {review.confidence}% confidence
                              </span>
                            </div>
                            <p className="text-slate-200 mb-3 line-clamp-2">
                              "{review.text}"
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(review.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-slate-900/30 rounded p-3 text-sm text-slate-300">
                        <p>"{review.text}"</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
                  <p className="text-slate-400 mb-2">
                    No {filter !== "all" ? filter : ""} reviews found
                  </p>
                  <p className="text-sm text-slate-500">
                    Try a different filter or analyze more reviews
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4">No Saved Reviews Yet</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start analyzing product reviews and they'll appear here. Your
              analysis history will be saved for future reference.
            </p>
            <Link to="/analyzer">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg gap-2">
                <Plus className="w-5 h-5" />
                Analyze Your First Review
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
