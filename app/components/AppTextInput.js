import React from "react";
import {View, TextInput, StyleSheet} from "react-native";

import colors from "../config/colors";
import AppIcon from "./AppIcon";

function AppTextInput({icon, ...otherProps}) {
   return (
      <View style={styles.container}>
         {icon && (
            <AppIcon
               name={icon}
               size={20}
               color={colors.medium}
               style={styles.icon}
            />
         )}
         <TextInput
            placeholderTextColor={colors.medium}
            style={styles.text}
            maxLength={50}
            selectionColor={colors.medium}
            {...otherProps}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.light,
      borderRadius: 12,
      flexDirection: "row",
      width: "100%",
      padding: 15,
      marginVertical: 10,
   },
   icon: {
      marginLeft: 10,
      alignSelf: "center",
   },
   text: {
      color: colors.dark,
      fontSize: 18,
      flex: 1,
   },
});

export default AppTextInput;
