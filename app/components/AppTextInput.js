import React from "react";
import {View, TextInput, StyleSheet} from "react-native";

import colors from "../config/colors";
import AppIcon from "./AppIcon";

function AppTextInput({icon, ...otherProps}) {
   return (
      <View style={styles.container}>
         {icon && (
            <AppIcon
               color={colors.medium}
               name={icon}
               size={20}
               style={styles.icon}
            />
         )}
         <TextInput
            placeholderTextColor={colors.dark}
            selectionColor={colors.medium}
            style={styles.text}
            {...otherProps}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.light,
      borderRadius: 15,
      flex: 1,
      flexDirection: "row",
      marginVertical: 10,
      padding: 12,
      width: "100%",
   },
   icon: {
      alignSelf: "center",
      marginLeft: 10,
   },
   text: {
      color: colors.dark,
      fontSize: 16,
   },
});

export default AppTextInput;
