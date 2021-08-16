import React, { Component } from "react";
import { Animated } from "react-native";
import { GradientHelper } from "./GradientHelper";

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export class AnimatedGradient extends Component {
  constructor(props) {
    super(props);

    const { colors } = props;
    this.state = {
      prevColors: colors,
      colors,
      tweener: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { colors: prevColors } = state;
    const { colors } = props;
    const tweener = new Animated.Value(0);
    return {
      prevColors,
      colors,
      tweener,
    };
  }

  componentDidUpdate() {
    const { tweener } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.timing(tweener, {
          toValue: 1,
          duration: 750,
          useNativeDriver: false,
        }),
        Animated.timing(tweener, {
          toValue: 0,
          duration: 750,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }

  render() {
    const { tweener, prevColors, colors } = this.state;

    const { style } = this.props;

    const color1Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[0], colors[0]],
    });

    const color2Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[1], colors[1]],
    });

    return (
      <AnimatedGradientHelper
        style={style}
        color1={color1Interp}
        color2={color2Interp}
      />
    );
  }
}
