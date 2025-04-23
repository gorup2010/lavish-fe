import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingBasicProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  iconSize?: number;
  maxStars?: number;
  readOnly?: boolean;
  unactive?: boolean; // New prop for unactive state
  color?: string;
}

const StarIcon = React.memo(
  ({
    iconSize,
    index,
    isInteractive,
    onClick,
    onMouseEnter,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
    iconSize: number;
    onClick: () => void;
    onMouseEnter: () => void;
    isInteractive: boolean;
  }) => (
    <Star
      key={index}
      size={iconSize}
      fill={style.fill}
      color={style.color}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "transition-colors duration-200",
        isInteractive && "cursor-pointer hover:scale-110",
        style.opacity && "opacity-50" // Apply opacity when specified in style
      )}
      style={style}
    />
  )
);
StarIcon.displayName = "StarIcon";

const StarRating = ({
  className,
  color = "black", // Changed default color to black
  iconSize = 24,
  maxStars = 5,
  onChange,
  readOnly = false,
  unactive = false, // Default value for unactive prop
  value,
}: StarRatingBasicProps) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const isInteractive = !readOnly && !unactive;

  const handleStarClick = React.useCallback(
    (index: number) => {
      if (!isInteractive || !onChange) return;
      const newRating = index + 1;
      onChange(newRating);
    },
    [isInteractive, onChange]
  );

  const handleStarHover = React.useCallback(
    (index: number) => {
      if (isInteractive) {
        setHoverRating(index + 1);
      }
    },
    [isInteractive]
  );

  const handleMouseLeave = React.useCallback(() => {
    if (isInteractive) {
      setHoverRating(null);
    }
  }, [isInteractive]);

  const getStarStyle = React.useCallback(
    (index: number) => {
      const ratingToUse =
        isInteractive && hoverRating !== null ? hoverRating : value;

      const style: React.CSSProperties = {
        color: ratingToUse > index ? color : "gray",
        fill: ratingToUse > index ? color : "transparent",
      };

      // Add opacity for unactive state
      if (unactive) {
        style.opacity = 0.5;
      }

      return style;
    },
    [isInteractive, hoverRating, value, color, unactive]
  );

  const stars = React.useMemo(() => {
    return Array.from({ length: maxStars }).map((_, index) => {
      const style = getStarStyle(index);
      return (
        <StarIcon
          key={index}
          index={index}
          style={style}
          iconSize={iconSize}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          isInteractive={isInteractive}
        />
      );
    });
  }, [
    maxStars,
    getStarStyle,
    iconSize,
    handleStarClick,
    handleStarHover,
    isInteractive,
  ]);

  return (
    <div
      className={cn(
        "flex items-center gap-x-0.5",
        unactive && "opacity-50",
        className
      )}
      onMouseLeave={handleMouseLeave}
    >
      {stars}
    </div>
  );
};

export default StarRating;
