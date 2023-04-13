import { Button, FlatList, Image, Text, View } from "react-native"
import { t } from "../utils/style"
import { useState } from "react";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

export const HomeScreen = () => {

  const [images, setImages] = useState<ImageOrVideo[]>([]);

  const selectImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxFiles: 5,
    })
      .then((selectedImages) => {
        setImages(selectedImages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={t`flex flex-col w-full justify-center items-center`}>
      <Text style={t`text-green-500`}>HomeScreen</Text>
      <Text style={t`text-green-500`}>Good Luck BingParking Devs! ^^</Text>
      <View style={t`flex flex-col w-full`}>
        <Text>Testing Multiple photo uploads.</Text>
        <Button title="Select Images" onPress={selectImages} />
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <Image source={{ uri: item.path }} style={{ width: 200, height: 200, margin: 10 }} />)}
          keyExtractor={(item) => item.path}
          horizontal={true} />
      </View>
    </View>
  )
}; 