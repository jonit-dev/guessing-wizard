export default class Helper {
  static guidGenerator() {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  static updateOnOrientationChanges(
    Dimensions,
    setDeviceWidth,
    setDeviceHeight,
    useEffect
  ) {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };

    useEffect(() => {
      //Listening to device orientation changes!
      Dimensions.addEventListener("change", updateLayout);
      //this is the use effect "clean up" function. It prevents addEventlistener from stacking
      return () => {
        Dimensions.removeEventListener("change", updateLayout);
      };
    });
  }
}
