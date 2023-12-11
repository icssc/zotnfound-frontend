import L from "leaflet";
import headphone_lost from "../../assets/logos/Headphones_lost.png";
import headphone_found from "../../assets/logos/Headphones_found.png";

import phone_found from "../../assets/logos/Phone_found.png";
import phone_lost from "../../assets/logos/Phone_lost.png";

import wallet_found from "../../assets/logos/Wallet_found.png";
import wallet_lost from "../../assets/logos/Wallet_lost.png";

import key_found from "../../assets/logos/Key_found.png";
import key_lost from "../../assets/logos/Key_lost.png";
import resolved from "../../assets/logos/resolved.png";

import others_lost from "../../assets/logos/Others_lost.png";
import others_found from "../../assets/logos/Others_found.png";
import others_black from "../../assets/logos/others_black.svg";

import fly_img from "../../assets/images/fly_img.png";

const resolvedIcon = L.icon({
  iconUrl: resolved,
  iconSize: [40, 40],
  iconAnchor: [20, 30],
});

const headphoneLost = L.icon({
  iconUrl: headphone_lost,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const headphoneFound = L.icon({
  iconUrl: headphone_found,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const phoneLost = L.icon({
  iconUrl: phone_lost,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const phoneFound = L.icon({
  iconUrl: phone_found,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const keyLost = L.icon({
  iconUrl: key_lost,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const keyFound = L.icon({
  iconUrl: key_found,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const walletLost = L.icon({
  iconUrl: wallet_lost,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const walletFound = L.icon({
  iconUrl: wallet_found,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const othersLost = L.icon({
  iconUrl: others_lost,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

const othersFound = L.icon({
  iconUrl: others_found,
  iconSize: [50, 50],
  iconAnchor: [25, 40],
});

export const othersDrag = L.icon({
  iconUrl: others_black,
  iconSize: [40, 40],
  iconAnchor: [25, 25],
});

export const flyImg = L.icon({
  iconUrl: fly_img,
  iconSize: [0.01, 0.01],
});

export const iconsMap = {
  headphone: {
    true: headphoneLost,
    false: headphoneFound,
  },
  phone: {
    true: phoneLost,
    false: phoneFound,
  },
  wallet: {
    true: walletLost,
    false: walletFound,
  },
  key: {
    true: keyLost,
    false: keyFound,
  },
  others: {
    true: othersLost,
    false: othersFound,
  },
  resolved: {
    true: resolvedIcon,
    false: resolvedIcon,
  },
};
