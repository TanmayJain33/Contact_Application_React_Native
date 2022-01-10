import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../assets/theme/colors';

export default function CommonMessage({
  message,
  primary,
  success,
  secondary,
  danger,
  retry,
  retryFunction,
  onDismiss,
}) {
  const [userDismissed, setDismissed] = useState(false);
  function getBackgroundColor() {
    if (primary) {
      return COLORS.primary;
    }
    if (success) {
      return COLORS.success;
    }
    if (secondary) {
      return COLORS.secondary;
    }
    if (danger) {
      return COLORS.danger;
    }
  }

  return (
    <>
      {userDismissed ? null : (
        <TouchableOpacity
          style={[styles.wrapper, {backgroundColor: getBackgroundColor()}]}>
          <View style={styles.messageSection}>
            <Text style={{color: COLORS.white}}>{message}</Text>
            {retry && typeof onDismiss != 'function' && (
              <TouchableOpacity onPress={retryFunction}>
                <Text style={{color: COLORS.white}}>Retry</Text>
              </TouchableOpacity>
            )}
            {typeof onDismiss == 'function' && (
              <TouchableOpacity
                onPress={() => {
                  setDismissed(true);
                  onDismiss();
                }}>
                <Text style={{color: COLORS.white}}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 4,
    justifyContent: 'center',
  },
  messageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
