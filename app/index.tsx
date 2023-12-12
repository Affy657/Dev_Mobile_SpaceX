import React from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { useLaunches } from '../lib/api'
import Cards from '../components/Cards'
import { View } from '../components/Themed'

const { width } = Dimensions.get('window')

export default function Root (): React.ReactNode {
  const { status, data, error } = useLaunches()
  if (error !== null) {
    console.log(error)
  }

  return (
    <View style={[styles.scroll, { width }]}>
      {error !== null && <Text>Error: {error.message}</Text>}
      {status === 'pending' && <ActivityIndicator size="large" color="#ffffff" />}
      {data !== undefined && <Cards data={data}></Cards>}
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
