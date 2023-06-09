import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import { HeaderText, NormalText, colors } from "../theme/theme";
import Spacer from "./Spacer";
import { useContext, useReducer, useState } from "react";
import { AppContext } from "../contexts/appContext";
import Modal from "react-native-modal";
import { doc, setDoc } from "firebase/firestore";
import { db, songCollection } from "../../firebaseConfig";
import moment from "moment";
import Toast from "react-native-root-toast";
import { songReducer } from "../reducers/songReducer";
import { isValidDateFormat } from "../utilities/stringUtilities";

interface SongInfoModalProps {
  showModal: boolean;
  hideModal: () => void;
  reloadSongs: () => void;
}

const SongInfoModal = ({
  showModal,
  hideModal,
  reloadSongs,
}: SongInfoModalProps) => {
  const { state, dispatch } = useContext(AppContext);
  const selectedSong = state.selectedSong;
  const today = moment().format("MM-DD-YYYY");
  const [songState, songDispatch] = useReducer(songReducer, {
    id: selectedSong.id,
    title: selectedSong.title,
    recordedDate: selectedSong.recordedDate,
    category: selectedSong.category,
    image: selectedSong.image,
    notes: selectedSong.notes,
    audioFileName: selectedSong.audioFileName,
    documentId: selectedSong.documentId,
    lastModifiedBy: state.user.userDisplayName,
    lastModifiedDate: today,
    comments: selectedSong.comments,
  });
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 40,
    },
    modalView: {
      alignSelf: "center",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 30,
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
      width: "96%",
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
    saveButton: {
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? colors.red : colors.white,
      marginHorizontal: 8,
    },
    buttonContainer: {
      flexDirection: "row",
    },
    headerView: {
      alignItems: "center",
      textAlign: "center",
    },
    inputContainerStyle: {
      borderWidth: 1,
      paddingHorizontal: 8,
      marginTop: 4,
    },
  });

  const handleSave = async () => {
    if (songState.title && songState.category && songState.recordedDate) {
      if (!isValidDateFormat(songState.recordedDate)) {
        Toast.show("Please enter date in MM/DD/YYYY format", {
          position: 60,
          backgroundColor: colors.red,
        });
      } else {
        setShowLoader(true);
        await setDoc(
          doc(db, `${songCollection}`, `${selectedSong.documentId}`),
          {
            id: songState.id,
            title: songState.title,
            recordedDate: songState.recordedDate,
            category: songState.category,
            image: songState.image,
            notes: songState.notes,
            audioFileName: songState.audioFileName,
            lastModifiedBy: state.user.userDisplayName,
            lastModifiedDate: today,
            uploadedBy: state.selectedSong.uploadedBy
              ? state.selectedSong.uploadedBy
              : "",
            comments: state.selectedSong.comments,
          }
        )
          .then(() => {
            dispatch({
              type: "SelectedSong",
              payload: songState,
            });
            Toast.show("Save Successful!", {
              position: 0,
            });
            setShowLoader(false);
            hideModal();
            reloadSongs();
          })
          .catch((error) => {
            setShowLoader(false);
            hideModal();
            alert("An error occurred, save was unsuccessful");
          });
      }
    } else {
      Toast.show("Please enter required info", {
        position: 60,
        backgroundColor: colors.red,
      });
    }
  };

  const saveButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.saveButton}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          onPress={() => handleSave()}
        >
          <NormalText>Save</NormalText>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal
      avoidKeyboard={true}
      isVisible={showModal}
      style={styles.centeredView}
      hasBackdrop={false}
    >
      <ScrollView>
        <Pressable
          onPress={() => {
            hideModal();
          }}
          style={{
            alignSelf: "flex-end",
            right: 20,
            top: 60,
            zIndex: 1,
          }}
        >
          <Icon name="closecircle" type="ant-design" size={30} color="black" />
        </Pressable>

        <View style={styles.modalView}>
          {showLoader ? (
            <View style={{ height: 400, justifyContent: "center" }}>
              <ActivityIndicator size="large" color={colors.black} />
            </View>
          ) : (
            <>
              <View style={styles.headerView}>
                <NormalText>Edit Song:</NormalText>
                <Spacer height={10} />
                <HeaderText>{state.selectedSong.title}</HeaderText>
              </View>
              <Spacer />
              <Input
                label={"Title*"}
                placeholder="Title"
                inputContainerStyle={styles.inputContainerStyle}
                value={songState.title}
                onChangeText={(value) => {
                  songDispatch({
                    type: "title",
                    payload: value,
                  });
                }}
              />
              <Input
                label={"Recorded Date*"}
                placeholder="MM/DD/YYYY"
                inputContainerStyle={styles.inputContainerStyle}
                value={songState.recordedDate}
                onChangeText={(value) => {
                  songDispatch({
                    type: "recordedDate",
                    payload: value,
                  });
                }}
              />
              <Input
                label={"Category*"}
                placeholder="Category"
                inputContainerStyle={styles.inputContainerStyle}
                value={songState.category}
                onChangeText={(value) => {
                  songDispatch({
                    type: "category",
                    payload: value,
                  });
                }}
              />
              <Input
                multiline
                label={"Notes"}
                inputContainerStyle={[styles.inputContainerStyle]}
                value={songState.notes}
                onChangeText={(value) => {
                  songDispatch({
                    type: "notes",
                    payload: value,
                  });
                }}
              />
              <Spacer />
              {saveButton()}
            </>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default SongInfoModal;
