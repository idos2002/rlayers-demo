import { FeatureLike } from "ol/Feature";
import { Extent, createEmpty, extend } from "ol/extent";

export default function getFeaturesExtent(features: FeatureLike[]): Extent {
  const extent = createEmpty();

  features.forEach((feature) => {
    const featureExtent = feature.getGeometry()?.getExtent();
    if (!featureExtent) return;

    extend(extent, featureExtent);
  });

  return extent;
}
