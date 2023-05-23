import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Icon } from "@rneui/themed";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "./Spacer";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

interface LoginModalProps {
  showModal: boolean;
  hideModal: () => void;
}

const LoginModal = ({ showModal, hideModal }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 2,
      width: "80%",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      height: 50,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    submitButton: {
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? "grey" : "white",
    },
  });

  const handleCreateNewUser = () => {
    // alert(`the user name is ${userName} and the password is ${password}`);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("SIGNED IN");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLogin = () => {
    // alert(`the user name is ${userName} and the password is ${password}`);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("SIGNED IN");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSignout = () => {
    // alert(`the user name is ${userName} and the password is ${password}`);
    signOut(auth)
      .then((res) => {
        alert(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <Pressable
          onPress={hideModal}
          style={{ alignSelf: "flex-end", right: 60, top: 68, zIndex: 1 }}
        >
          <Icon
            name="closecircle"
            type="ant-design"
            size={30}
            color="black"
            style={{}}
          />
        </Pressable>
        <View style={styles.modalView}>
          <HeaderText>Login</HeaderText>
          <Spacer />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
          />
          <Spacer />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <Spacer />
          <Pressable
            style={styles.submitButton}
            onPressIn={() => setChangeButtonColor(true)}
            onPressOut={() => setChangeButtonColor(false)}
            onPress={() => handleCreateNewUser()}
          >
            <NormalText>Submit</NormalText>
          </Pressable>
          <Pressable
            style={styles.submitButton}
            onPressIn={() => setChangeButtonColor(true)}
            onPressOut={() => setChangeButtonColor(false)}
            onPress={() => handleLogin()}
          >
            <NormalText>Login</NormalText>
          </Pressable>
          <Pressable
            style={styles.submitButton}
            onPressIn={() => setChangeButtonColor(true)}
            onPressOut={() => setChangeButtonColor(false)}
            onPress={() => handleSignout()}
          >
            <NormalText>Signout</NormalText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
