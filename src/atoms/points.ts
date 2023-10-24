import { atom } from "jotai";
import { times } from "lodash";

import getRandomPointInIsrael from "@/util/getRandomPointInIsrael";

const DEFAULT_POINTS = times(1000, () => getRandomPointInIsrael());

export const pointsAtom = atom(DEFAULT_POINTS);
