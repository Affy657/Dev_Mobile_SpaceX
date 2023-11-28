import React from 'react'
import {
  // PermissionsAndroid,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import { useLaunches } from '../lib/api'

// import TopBar from '../../components/TopBar'
import Cards from '../components/Cards'

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

export default function Root (): React.ReactNode {
  // requestInternetPermission();
  const { status, data, error } = useLaunches()
  // console.log(status, data, error, isFetching)
  if (error !== null) {
    console.log(error)
  }

  const { width } = Dimensions.get('window')

  return (
    <View style={[styles.scroll, { width }]}>
      {/** <TopBar></TopBar> **/}
      {error !== null && <Text>Error: {error.message}</Text>}
      {status === 'pending' && <Text>Loading...</Text>}
      {data !== undefined && <Cards data={data}></Cards>}
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
