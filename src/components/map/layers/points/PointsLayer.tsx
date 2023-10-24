import { useAtomValue } from "jotai";
import { RLayerVector, RStyle } from "rlayers";

import locationIcon from "@/assets/locationIcon.svg";
import { pointsAtom } from "@/atoms/points";

import PointFeature from "./PointFeature";

export default function PointsLayer() {
  const points = useAtomValue(pointsAtom);

  return (
    <RLayerVector zIndex={10}>
      <RStyle.RStyle>
        <RStyle.RIcon src={locationIcon} scale={0.8} />
      </RStyle.RStyle>

      {points.map((point) => (
        <PointFeature
          key={JSON.stringify(point.getCoordinates())}
          point={point}
        />
      ))}
    </RLayerVector>
  );
}
