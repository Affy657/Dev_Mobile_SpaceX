import React from 'react'
import {
  // PermissionsAndroid,
  StyleSheet,
  View
} from 'react-native'

import TopBar from '../../components/TopBar'
import Cards from '../../components/Cards'

// const requestInternetPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.INTERNET
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the internet')
//     } else {
//       console.log('Internet permission denied')
//     }
//   } catch (err) {
//     console.warn('err :' + err)
//   }
// }

export default function TabHomePageScreen (): React.ReactNode {
  // requestInternetPermission();
  return (
    <View style={styles.scroll}>
      <TopBar></TopBar>
      <Cards></Cards>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
