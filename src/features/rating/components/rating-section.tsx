import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useInfiniteRatings } from "../api/get-ratings";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";
import StarRating from "@/components/ui/star-rating";
import { useCreateRating } from "../api/create-rating";

const COMMENT_PREVIEW_LIMIT = 150;

interface RatingSectionProps {
  productId: number;
}

export const RatingSection: FC<RatingSectionProps> = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const createRatingMutation = useCreateRating();

  const handleSubmitComment = () => {
    createRatingMutation.mutate({ productId, star: rating, comment });
    setComment("");
    setRating(0);
  };

  const toggleComment = (id: number) => {
    setExpandedComments((prev) =>
      prev.includes(id)
        ? prev.filter((commentId) => commentId !== id)
        : [...prev, id]
    );
  };

  const ratingQuery = useInfiniteRatings({ productId });

  if (ratingQuery.isLoading) return <LoadingBlock />;

  if (ratingQuery.isError)
    return (
      <RequestFail
        retryRequest={ratingQuery.refetch}
        error={ratingQuery.error}
      />
    );

  const ratings = ratingQuery.data?.pages.flatMap((page) => page.data);

  if (ratings === undefined) return <div>No data</div>;

  return (
    <div className="w-full md:w-1/2 ml-20 mt-10 p-4 border-t-1">
      <h2 className="text-2xl font-bold mb-6">Ratings from customers</h2>

      {/* New comment section */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">Write a review</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          {/* Star rating container - for custom component */}
          <div className="flex items-center justify-end mt-2">
            <div className="star-rating-container">
              {/* User will insert their custom star rating component here */}
              <StarRating readOnly={false} onChange={setRating} value={rating}/>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitComment}>Submit Review</Button>
        </CardFooter>
      </Card>

      {/* Ratings list */}
      <div className="space-y-4">
        {ratings.map((rating) => (
          <Card key={rating.id} className="relative">
            {/* Star rating in top right */}
            <div className="absolute top-4 right-3 flex items-center">
              <div className="star-rating-container">
                {/* Placeholder for custom star component */}
                <StarRating value={rating.star} readOnly={true} />
              </div>
            </div>

            <CardContent className="pt-1">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={`${rating.user.firstname} ${rating.user.lastname}`}
                  />
                  <AvatarFallback>
                    {rating.user.firstname[0]}
                    {rating.user.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {rating.user.firstname} {rating.user.lastname}
                  </p>
                </div>
              </div>

              {/* Comment with expand/collapse functionality */}
              <div className="text-sm">
                {rating.comment.length > COMMENT_PREVIEW_LIMIT &&
                !expandedComments.includes(rating.id) ? (
                  <>
                    {rating.comment.substring(0, COMMENT_PREVIEW_LIMIT)}...
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm font-normal align-baseline text-gray-500 hover:text-gray-900"
                      onClick={() => toggleComment(rating.id)}
                    >
                      Read more
                    </Button>
                  </>
                ) : (
                  <>
                    {rating.comment}
                    {rating.comment.length > COMMENT_PREVIEW_LIMIT && (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm font-normal align-baseline text-gray-500 hover:text-gray-900"
                        onClick={() => toggleComment(rating.id)}
                      >
                        Show less
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
