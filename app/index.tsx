import React from 'react'
import {
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'
import { useLaunches } from '../lib/api'
import { View } from '../components/Themed'

import Cards from '../components/Cards'

export default function Root (): React.ReactNode {
  const { status, data, error } = useLaunches()

  if (error !== null) {
    console.log(error)
  }

  const { width } = Dimensions.get('window')

  return (
    <View style={[styles.scroll, { width }]}>
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
