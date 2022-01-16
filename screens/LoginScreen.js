class LoginScreen extends Component {
   render() {
      return (
         <View style={styles.MainContainer}>
            <Text style={styles.TextStyle}> This is Login Screen </Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   MainContainer: {
      justifyContent: "center",
      flex: 1,
      margin: 10,
   },
   TextStyle: {
      fontSize: 23,
      textAlign: "center",
      color: "#000",
   },
});
