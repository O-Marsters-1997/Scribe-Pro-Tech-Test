import PropTypes from "prop-types";

export const ImageURISourcePropType = PropTypes.shape({
  uri: PropTypes.string,
  bundle: PropTypes.string,
  method: PropTypes.string,
  headers: PropTypes.objectOf(PropTypes.string),
  body: PropTypes.string,
  cache: PropTypes.oneOf([
    "default",
    "reload",
    "force-cache",
    "only-if-cached",
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
});

export const ImageSourcePropType = PropTypes.oneOfType([
  ImageURISourcePropType,
  // Opaque type returned by require('./image.jpg')
  PropTypes.number,
  // Multiple sources
  PropTypes.arrayOf(ImageURISourcePropType),
]);

export const placeHolderImages: {
  [key: string]: { uri: number };
} = {
  "./assets/avatar-collection.jpg": {
    uri: require("./avatar-collection.jpg"),
  },
  "./assets/avatar.jpg": {
    uri: require("./avatar.png"),
  },
  "./assets/image.png": {
    uri: require("./image.png"),
  },
  "./assets/team-badge.png": {
    uri: require("./team-badge.png"),
  },
  "./assets/default-event.png": {
    uri: require("./default-event.png"),
  },
  "./assets/add-image.png": {
    uri: require("./add-image.png"),
  },
};
