import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../assets/theme/colors';

export default function CommonButton({
  title,
  loading,
  disabled,
  primary,
  secondary,
  danger,
  onPress,
  style,
}) {
  function getBackgroundColor() {
    if (disabled) {
      return COLORS.grey;
    }
    if (primary) {
      return COLORS.primary;
    }
    if (secondary) {
      return COLORS.secondary;
    }
    if (danger) {
      return COLORS.danger;
    }
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: getBackgroundColor()}, style]}>
      <View style={styles.loaderSection}>
        {loading && (
          <ActivityIndicator color={disabled ? COLORS.black : COLORS.white} />
        )}
        {title && (
          <Text
            style={{
              paddingLeft: loading ? 5 : 0,
              color: disabled ? 'black' : 'white',
            }}>
            {loading ? 'Please wait...' : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderSection: {
    flexDirection: 'row',
  },
});
