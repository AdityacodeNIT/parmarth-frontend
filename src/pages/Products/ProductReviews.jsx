// pages/Product/ProductReviews.jsx
import { FaStar } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProductReviews({
  reviews,
  avg,
  count,
  reviewDraft,
  setReviewDraft,
  loading,
  onSubmit,
  currentPage,
  totalPages,
  hasReviewed,
  onPrev,
  onNext,
}) {
  return (
    <section className="max-w-4xl mx-auto my-12 space-y-8">
      {/* ───────── Summary ───────── */}
      <div className="flex items-center gap-6">
        <div className="text-4xl font-semibold">{avg.toFixed(1)}</div>

        <div className="space-y-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(avg)
                    ? "text-yellow-400"
                    : "text-muted-foreground/40"
                }
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {count} verified reviews
          </p>
        </div>
      </div>

      <Separator />

      {/* ───────── Add Review ───────── */}
      <Card className="bg-white/5 backdrop-blur-xl border-none shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-center gap-2 text-2xl">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`cursor-pointer transition ${
                  i + 1 <= reviewDraft.rating
                    ? "text-yellow-400"
                    : "text-muted-foreground/40"
                }`}
                onClick={() =>
                  setReviewDraft((p) => ({ ...p, rating: i + 1 }))
                }
              />
            ))}
          </div>

          <textarea
            className="w-full min-h-[120px] rounded-lg bg-background/50 p-4 outline-none"
            placeholder="Write your honest experience…"
            value={reviewDraft.message}
            onChange={(e) =>
              setReviewDraft((p) => ({ ...p, message: e.target.value }))
            }
          />

          <Button
            onClick={onSubmit}
            disabled={hasReviewed||loading}
            className="w-full h-11"
          >
              {hasReviewed ? "Review already submitted" : "Submit Review"}
          </Button>
        </CardContent>
      </Card>

      {/* ───────── Reviews List ───────── */}
      <div className="grid gap-4">
        {reviews.map((rev) => (
          <Card
            key={rev._id}
            className="bg-white/5 backdrop-blur-md border-none shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium">
                {rev.userId?.fullName || "Anonymous"}
              </span>
              <Badge variant="secondary" className="text-xs">
                {new Date(rev.createdAt).toLocaleDateString("en-IN")}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rev.message}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ───────── Pagination ───────── */}
      <div className="flex justify-center gap-4">
        <Button variant="secondary" onClick={onPrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
