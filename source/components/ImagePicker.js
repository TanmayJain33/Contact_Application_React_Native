import React, {forwardRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Camera from 'react-native-vector-icons/FontAwesome';
import Gallery from 'react-native-vector-icons/FontAwesome';
import COLORS from '../assets/theme/colors';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Camera name="camera" color={COLORS.grey} size={21} />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    {
      name: 'Choose from gallery',
      icon: <Gallery name="image" color={COLORS.grey} size={21} />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={150}
      openDuration={250}
      dragFromTopOnly={true}
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, icon, onPress}) => (
          <TouchableOpacity
            key={name}
            onPress={onPress}
            style={styles.pickerOption}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  optionsWrapper: {
    paddingHorizontal: 20,
  },
  pickerOption: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    paddingLeft: 18,
  },
});

export default ImagePicker;
