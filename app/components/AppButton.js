import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../config/colors";

function AppButton({title, onPress, icon}) {
   return (
      <TouchableOpacity
         style={[styles.button, {backgroundColor: colors.grayBlue}]}
         onPress={onPress}
      >
         <Text style={styles.text}>{title}</Text>
         {icon && (
            <Ionicons
               name={icon}
               size={22}
               color={colors.medium}
               style={styles.icon}
            />
         )}
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
      width: "100%",
      marginVertical: 10,
      flexDirection: "row",
   },
   text: {
      color: colors.white,
      fontSize: 16,
      textTransform: "uppercase",
      fontWeight: "bold",
   },
   icon: {
      marginLeft: 10,
      alignSelf: "center",
   },
});

export default AppButton;
