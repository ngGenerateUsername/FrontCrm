import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { updatePriorite } from "state/user/Oportunity_Slice";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

interface RatingStarsProps {
  prioriteActivite: string;
  id: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  prioriteActivite,
  id,
}) => {
  const [hoveredStars, setHoveredStars] = useState(0);
  const filledStars = getFilledStars(prioriteActivite);

  function handleStarHover(index: number) {
    setHoveredStars(index + 1);
  }

  function handleStarLeave() {
    setHoveredStars(0);
  }

  const dispatch = useDispatch();

  function handleStarClick(index: number) {
  }

  function getFilledStars(prioriteActivite: string) {
    switch (prioriteActivite) {
      case "Faible":
        return 1;
      case "Moyen":
        return 2;
      case "Fort":
        return 3;
      default:
        return 1;
    }
  }

  const starIcons = [...Array(3)].map((_, index) => {
    const starIndex = index + 1;
    const isFilled = starIndex <= filledStars;
    const isHovered = starIndex <= hoveredStars;

    const starColor = isFilled ? "yellow.500" : "gray.400";
    const starState = getStarState(starIndex);

    return (
      <Tooltip key={index} label={starState}>
        <Icon
          as={StarIcon}
          boxSize={5}
          color={isHovered ? "yellow.500" : starColor}
          cursor="pointer"
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          onClick={() => handleStarClick(index)}
        />
      </Tooltip>
    );
  });

  function getStarState(starIndex: number): string {
    switch (starIndex) {
      case 1:
        return "Faible";
      case 2:
        return "Moyen";
      case 3:
        return "Fort";
      default:
        return "";
    }
  }

  return <Box>{starIcons}</Box>;
};

export default RatingStars;
