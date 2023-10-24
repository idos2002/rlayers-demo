import { useSetAtom } from "jotai";
import { random } from "lodash";
import { useEffect } from "react";

import { pointsAtom } from "@/atoms/points";
import getRandomPointInIsrael from "@/util/getRandomPointInIsrael";

export default function Data() {
  const setPoints = useSetAtom(pointsAtom);

  useEffect(() => {
    const id = setInterval(() => {
      const newPoint = getRandomPointInIsrael();
      setPoints((points) => {
        const index = random(0, points.length - 1);
        return points.map((point, i) => (i === index ? newPoint : point));
      });
    }, 500);

    return () => clearInterval(id);
  }, [setPoints]);

  return <></>;
}
