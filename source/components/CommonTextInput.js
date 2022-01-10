import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import COLORS from '../assets/theme/colors';

export default function CommonTextInput({
  label,
  style,
  onChangeText,
  value,
  icon,
  iconPosition,
  error,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  function getFlexDirection() {
    if (icon && iconPosition) {
      if (iconPosition == 'left') {
        return 'row';
      } else if (iconPosition == 'right') {
        return 'row-reverse';
      }
    } else {
      return 'row';
    }
  }

  function getBorderColor() {
    if (error) {
      return COLORS.danger;
    }
    if (focused) {
      return COLORS.primary;
    } else {
      return COLORS.grey;
    }
  }

  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          {flexDirection: getFlexDirection()},
          {borderColor: getBorderColor()},
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
  },
  wrapper: {
    alignItems: 'center',
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  error: {
    color: COLORS.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});
