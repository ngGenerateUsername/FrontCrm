import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { updatePriorite } from "state/user/Oportunity_Slice";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

interface RatingStarsProps {
  prioriteOpporunite: string;
  id: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  prioriteOpporunite,
  id,
}) => {
  const [hoveredStars, setHoveredStars] = useState(0);
  const filledStars = getFilledStars(prioriteOpporunite);

  function handleStarHover(index: number) {
    setHoveredStars(index + 1);
  }

  function handleStarLeave() {
    setHoveredStars(0);
  }

  const dispatch = useDispatch();

  function handleStarClick(index: number) {
  }

  function getFilledStars(prioriteOpporunite: string) {
    switch (prioriteOpporunite) {
      case "FAIBLE":
        return 0;
      case "MOYEN":
        return 1;
      case "ELEVE":
        return 2;
      case "TRES_HAUT":
        return 3;
      default:
        return 0;
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
          boxSize={6}
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
      case 0:
        return "FAIBLE";
      case 1:
        return "MOYEN";
      case 2:
        return "ELEVE";
      case 3:
        return "TRES_HAUT";
      default:
        return "";
    }
  }

  return <Box>{starIcons}</Box>;
};

export default RatingStars;
