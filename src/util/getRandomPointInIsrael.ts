import { random } from "lodash";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

const ISRAEL_SOUTH_WEST = [34.23, 29.5] as const;
const ISRAEL_NORTH_EAST = [35.88, 33.34] as const;

export default function getRandomPointInIsrael(): Point {
  const lon = random(ISRAEL_SOUTH_WEST[0], ISRAEL_NORTH_EAST[0]);
  const lat = random(ISRAEL_SOUTH_WEST[1], ISRAEL_NORTH_EAST[1]);
  return new Point(fromLonLat([lon, lat]));
}
