//@ts-ignore
import extIP from "external-ip";
//@ts-ignore
import geoip from "geoip-lite";
import { promisify } from "util";
import { TLocation } from "../types";

const getIP = promisify(
  extIP({
    replace: true,
    services: [
      "https://ipinfo.io/ip",
      "http://icanhazip.com/",
      "http://ident.me/",
    ],
    timeout: 600,
    getIP: "parallel",
    verbose: false,
  })
);

const getLocation = async (): Promise<TLocation> => {
  const ip = await getIP();
  const geo = geoip.lookup(ip);
  return {
    latitude: geo.ll[0],
    longitude: geo.ll[1],
    name: geo.city,
  };
};

export default getLocation;
