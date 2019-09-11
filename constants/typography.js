import { Colors } from "./colors";

const Typography = {
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15
  },
  p: {
    color: "gray",
    fontSize: 15,
    fontFamily: "coming-soon-regular" //this custom font is defined in App.js
  },
  featuredText: {
    color: Colors.accent,
    fontSize: 15,
    fontWeight: "bold"
  }
};

export { Typography };
