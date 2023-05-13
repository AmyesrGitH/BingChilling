import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from '../../utils/style';
import {useEffect, useRef, useState} from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';

export const ParkAdd = () => {
  const [tap, setTap] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const [touch, setTouch] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [photo, setPhoto] = useState<ImageOrVideo | any>(null);
  const [count, setCount] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  const mapsRef = useRef<any>('');
  const [visible, setVisible] = useState<boolean>(false);
  // phone photo name address {lat lon} : a location
  const [address, setAddress] = useState<any>(null);
  const [name, setName] = useState<any>(null)
  const [lat, setLat] = useState<any | number>(0);
  const [lon, setLon] = useState<any | number>(0);

  const handleTextChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setValue(formattedText);
    if (text.length == 8) {
      setCount(count + 1);
    }
  };


  const handleMapPress = (e: any) => {
    setSelectedLocation(e?.nativeEvent?.coordinate);
    console.log(`Selected: ${JSON.stringify(selectedLocation)}`);
    setLat(e?.nativeEvent?.coordinate?.latitude);
    setLon(e?.nativeEvent?.coordinate?.longitude);
  };

  useEffect(() => {
    if(lat != 0 && lon != 0) {
       console.log(lat, lon , "lat lon")
    }
  }, [lat , lon]);

  useEffect(() => {
    currentLocation != null
      ? mapsRef?.current?.animateToRegion(currentLocation, 1000)
      : currentLocation;
  }, [currentLocation]);

  const selectImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(selectedImages => {
        setPhoto(selectedImages);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={[t`w-full h-full bg-white items-center`]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
          <View style={[t`flex items-center`]}>
            <View style={[t`flex flex-row`]}></View>
            <View style={[t`flex flex-row`]}>
              <Image
                style={[t`h-[140px] w-[140px] flex items-center`]}
                source={
                  photo == null
                    ? require('../../assets/parking.jpg')
                    : {uri: photo?.path}
                }
              />
              <TouchableOpacity
                onPress={() => selectImages()}
                style={[t`ml-[105px] absolute mt-[110px]`]}>
                <Image
                  style={[t`h-[30px] w-[30px] rounded-[10px]`]}
                  source={{
                    uri: 'https://i.ibb.co/SNzyCcb/Group.png',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                t`${
                  tap == true ? 'border-[#4448AE]' : 'border-[#EEEEEE]'
                } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
              ]}>
              <TextInput
                style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
                onFocus={() => {
                  setTap(true);
                }}
                onBlur={() => {
                  setTap(false);
                }}
                onChangeText={(e) => setName(e)}
                placeholder="Parking place name here"
              />
            </View>

            <View
              style={[
                t`${
                  touch == true ? 'border-[#4448AE]' : 'border-[#EEEEEE]'
                } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
              ]}>
              <TextInput
                style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
                onFocus={() => {
                  setTouch(true);
                }}
                onBlur={() => {
                  setTouch(false);
                }}
                onChangeText={(e) => setAddress(e)}
                placeholder="Put address here"
              />
            </View>

            <View
              style={[
                t`${
                  selected == true ? 'border-[#4448AE]' : 'border-[#EEEEEE]'
                } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
              ]}>
              <Text style={[t`ml-[20px]`]}>+976</Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={8}
                style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
                onFocus={() => {
                  setSelected(true);
                }}
                onBlur={() => {
                  setSelected(false);
                }}
                value={value}
                placeholder="Phone number"
                onChangeText={handleTextChange}
              />
            </View>
          </View>
          <View style={[t`w-[350px] h-[250px] mt-[10px] flex items-center`]}>
            <Text style={[t`text-10 text-[#4448AE]`]}>Select location</Text>
          <TouchableOpacity style={[t`w-[350px] h-[180px]`]} onPress={() => setVisible(true)}>
            <Image style={t`w-full h-full`} source={require('../../assets/map.png')}/>
          </TouchableOpacity>
          <Modal style={t`flex items-center`} isVisible={visible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}>
            <MapView
              style={[t`w-[350px] mt-[20px]`,styles.map]}
              zoomControlEnabled={true}
              zoomEnabled={true}
              showsUserLocation={true}
              onPress={handleMapPress}
              ref={mapsRef}
              initialRegion={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
                latitudeDelta: currentLocation?.latitude,
                longitudeDelta: currentLocation?.longitude,
              }}>
              <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  const location = details?.geometry?.location;
                  setCurrentLocation({
                    latitude: location?.lat,
                    longitude: location?.lng,
                  });
                }}
                styles={styles.autocompleteContainer}
                query={{
                  key: 'AIzaSyAF76A1JtzoJ2hkIMZQCFegkvo9GSXlYKk',
                  language: 'en',
                }}
              />
              {selectedLocation && <Marker coordinate={selectedLocation} />}
              <Marker coordinate={currentLocation} />
            </MapView>
            <TouchableOpacity
                  style={[
                    t`bg-[#EDEFFF] w-[320px] h-[58px] rounded-[20px] flex items-center justify-center top-[90.5%] z-1 absolute`,
                  ]}
                  onPress={() => {
                    setVisible(false);
                  }}>
                  <Text style={[t`text-black`]}>Select</Text>
                </TouchableOpacity>
          </Modal>
        </View>
      </KeyboardAvoidingView>
        

        
        <TouchableOpacity
          style={[
            t`bg-[#9C9FF0] mt-[20px] w-[360px] mb-[30px] h-[58px] rounded-[10px] flex items-center justify-center`,
          ]}
          disabled={value.length == 8 && name != null && address != null && lon != 0 && lat != 0 ? false : true}>
          <Text style={[t`text-white`]}>Add</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  map: {
    flex: 1,
    borderRadius: 30
  },
  autocompleteContainer: {
    flex: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});
export default ParkAdd;
