import React from "react";
import {StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function AppIcon({name, size, color, ...otherProps}) {
   return (
      <Ionicons
         name={name}
         size={size}
         color={color}
         style={styles.icon}
         {...otherProps}
      />
   );
}

const styles = StyleSheet.create({
   icon: {
      marginLeft: 3,
      alignSelf: "center",
   },
});

export default AppIcon;
