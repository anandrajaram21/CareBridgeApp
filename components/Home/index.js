import getAccessToken from "../../utils/getAccessToken";
import { Button, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";

import Navbar from "../Navbar";

export default function Home({ navigation }) {
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState();

  async function convertURItoFormData(uri, fieldName, filename, mimeType) {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const fileContents = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    formData.append(fieldName, {
      uri: fileInfo.uri,
      name: filename,
      type: mimeType,
      data: fileContents,
    });

    return formData;
  }

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.log(err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    setRecordingUri(uri);

    // Converting the file uri to an actual File object to be sent somehow
    const fileName = uri.split("/").pop();
    console.log(fileName);

    const payload = await convertURItoFormData(
      uri,
      "file",
      fileName,
      "audio/mp4"
    );

    const response = await fetch("http://localhost:8000/classify_audio", {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const json = await response.json();

    console.log(json);

    const accessToken = await getAccessToken();

    const requestCreatePayload = {
      category: json.classification,
    };

    const requestCreate = await fetch(
      "https://red-snow-8028.fly.dev/request/classify",
      {
        method: "POST",
        body: JSON.stringify(requestCreatePayload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const requestJson = await requestCreate.json();
    console.log(requestJson);

    navigation.navigate("Volunteers", {
      response: requestJson,
      title: json.transcribed_text,
      category: json.classification,
    });
  }

  return (
    <SafeAreaView>
      <Navbar />
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
    </SafeAreaView>
  );
}
