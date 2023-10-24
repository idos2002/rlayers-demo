import "ol/ol.css";
import "rlayers/control/layers.css";

import { fromLonLat } from "ol/proj";
import { useState } from "react";
import { LuGroup } from "react-icons/lu";
import { RControl, RMap, ROSMWebGL } from "rlayers";

import ClustersLayer from "./layers/clusters/ClustersLayer";
import PointsLayer from "./layers/points/PointsLayer";

const ISRAEL_CENTER_COORDS = [35.0818155, 31.4117257];
const ISRAEL_DEFAULT_ZOOM = 8.2;

export default function Map() {
  const [isClustered, setIsClustered] = useState(false);

  return (
    <RMap
      initial={{
        center: fromLonLat(ISRAEL_CENTER_COORDS),
        zoom: ISRAEL_DEFAULT_ZOOM,
      }}
      noDefaultControls
      className="h-full"
    >
      <ROSMWebGL />

      <RControl.RScaleLine />
      <RControl.RZoom />
      <RControl.RZoomSlider />
      <RControl.RCustom className="top-72 left-2">
        <button
          className={isClustered ? "!bg-indigo-500 !text-white" : undefined}
          onClick={() => setIsClustered((layer) => !layer)}
          title="Group features"
        >
          <LuGroup className="m-auto" />
        </button>
      </RControl.RCustom>

      {!isClustered && <PointsLayer />}
      {isClustered && <ClustersLayer />}
    </RMap>
  );
}
