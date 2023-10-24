import { Point } from "ol/geom";
import { RFeature, RFeatureUIEvent } from "rlayers";

export interface PointFeatureProps {
  point: Point;
}

function handleClick({ map, target }: RFeatureUIEvent) {
  map.getView().fit(target.getGeometry()!.getExtent(), {
    duration: 500,
    maxZoom: 12,
  });
}

function handlePointerEnter({ map }: RFeatureUIEvent) {
  map.getViewport().style.cursor = "pointer";
}

function handlePointerLeave({ map }: RFeatureUIEvent) {
  map.getViewport().style.cursor = "";
}

export default function PointFeature({ point }: PointFeatureProps) {
  return (
    <RFeature
      geometry={point}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    />
  );
}
