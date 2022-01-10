import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../assets/theme/colors';
import Close from 'react-native-vector-icons/MaterialIcons';

export default function AppModal({
  modalVisible,
  setModalVisible,
  title,
  modalBody,
  modalFooter,
}) {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <Close name="close" size={27} />
              <Text style={styles.title}>{title || 'Contaxts'}</Text>
            </View>
            <View style={styles.bodySeparator} />
            <View style={styles.body}>{modalBody}</View>
            {modalFooter}
            {!modalFooter && (
              <View>
                <>
                  <View style={styles.footerSeparator} />
                  <View style={styles.footerItems}>
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Privacy Policy</Text>
                      <View style={styles.termsView} />
                      <Text style={styles.footerText}>Terms of Service</Text>
                    </View>
                  </View>
                </>
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: COLORS.white,
    minHeight: 300,
    marginHorizontal: 20,
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginLeft: 35,
    fontSize: 21,
  },
  body: {
    minHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footer: {
    justifyContent: 'space-evenly',
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
  },
  termsView: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: COLORS.grey,
  },
  bodySeparator: {
    height: 1,
    backgroundColor: COLORS.grey,
  },
  footerSeparator: {
    height: 1,
    backgroundColor: COLORS.grey,
  },
  footerItems: {
    width: '100%',
    padding: 10,
  },
  footerText: {
    fontSize: 12,
  },
});
