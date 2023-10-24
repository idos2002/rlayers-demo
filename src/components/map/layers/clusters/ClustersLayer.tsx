import { useAtomValue } from "jotai";
import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";
import LRUCache from "ol/structs/LRUCache";
import { Circle, Fill, Icon, Style } from "ol/style";
import { RFeature, RFeatureUIEvent, RLayerCluster } from "rlayers";

import locationIcon from "@/assets/locationIcon.svg";
import { pointsAtom } from "@/atoms/points";
import getFeaturesExtent from "@/util/getFeaturesExtent";

const stylesCache = new LRUCache<Style | Style[]>(1024);

function getCacheId(feature: FeatureLike): string {
  const features: Feature[] = feature.get("features");
  if (features.length === 1) {
    return "feature";
  }
  return `cluster:${features.length}`;
}

function style(feature: FeatureLike) {
  const cacheId = getCacheId(feature);

  if (stylesCache.containsKey(cacheId)) {
    return stylesCache.get(cacheId);
  }

  const size: number = feature.get("features").length;

  const style =
    size === 1
      ? new Style({
          image: new Icon({
            src: locationIcon,
            scale: 0.8,
          }),
        })
      : [
          new Style({
            image: new Circle({
              radius: 20,
              fill: new Fill({ color: "white" }),
            }),
          }),
          new Style({
            image: new Icon({
              src: locationIcon,
              scale: 0.6,
            }),
          }),
        ];

  stylesCache.set(cacheId, style);

  return style;
}

function handleClick({ map, target }: RFeatureUIEvent) {
  const features: Feature[] = target.get("features");
  const extent = getFeaturesExtent(features);

  map.getView().fit(extent, {
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

export default function ClustersLayer() {
  const points = useAtomValue(pointsAtom);

  return (
    <RLayerCluster
      zIndex={10}
      distance={25}
      style={style}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {points.map((point) => (
        <RFeature
          key={JSON.stringify(point.getCoordinates())}
          geometry={point}
        />
      ))}
    </RLayerCluster>
  );
}
