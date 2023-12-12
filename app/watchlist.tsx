import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { useLaunchesByIds } from '../lib/api'
import Cards from '../components/Cards'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')
const WATCHLIST_KEY = 'WATCHLIST_IDS'

export default function Watchlist (): React.ReactNode {
  const [ids, setIds] = useState([])
  const { status, data, error } = useLaunchesByIds(ids)
  if (error !== null) {
    console.log(error)
  }

  useEffect(() => {
    void loadWatchlist()
  }, [])

  const loadWatchlist = async (): Promise<void> => {
    try {
      const storedIds = await AsyncStorage.getItem(WATCHLIST_KEY)
      if (storedIds !== null) {
        setIds(JSON.parse(storedIds))
      }
    } catch (e) {
      console.error('Failed to load the watchlist IDs from AsyncStorage', e)
    }
  }

  return (
    <SafeAreaView style={[styles.scroll, { width }]}>
      {error !== null && <Text>Error: {error.message}</Text>}
      {status === 'pending' && <ActivityIndicator size="large" color="#ffffff" />}
      {data !== undefined && <Cards data={data}></Cards>}
    </SafeAreaView>
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
