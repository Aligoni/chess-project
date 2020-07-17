import React from "react";
import {View} from 'react-native'
import SwitchContainer from "./SwitchContainer";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      status: false,
      ballClass: "ball",
      containerClass: "container offContainer"
    };
  }

  handleChange = () => {
    console.log("Handled")
    if (!this.state.status) {
      this.setState(prevState => {
        return {
          status: true,
          ballClass: "ball on",
          containerClass: "container onContainer"
        };
      });
    } else {
      this.setState(prevState => {
        return {
          status: false,
          ballClass: "ball off",
          containerClass: "container offContainer"
        };
      });
    }
  };

  render() {
    return (
      <View className = "body">
        <SwitchContainer
          containerClass={this.state.containerClass}
          ballClass={this.state.ballClass}
          handleChange={this.handleChange}
        />
      </View>
    );
  }
}

export default Main;
