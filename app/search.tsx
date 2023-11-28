import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions
} from 'react-native'
import { useDeferredValue, useEffect, useState } from 'react'
import { useLaunches } from '../lib/api'
import { search } from '../utils/string'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import Cards from '../components/Cards'

export default function TabSearchScreen (): React.ReactNode {
  const [query, setQuery] = useState<string | undefined>()
  const { height } = Dimensions.get('window')
  const paddingTop = useSharedValue<number>(height / 2.5)

  const animatedStyles = useAnimatedStyle(() => ({
    paddingTop: paddingTop.value
  }))

  useEffect(() => {
    paddingTop.value = withTiming(
      query === undefined || query === '' ? height / 2.5 : 20,
      { duration: 500 }
    )
  }, [query])

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <EditScreenInfo
        onSearch={setQuery}
        />
      <ScreenInfo query={query} />
    </Animated.View>
  )
}

function ScreenInfo ({ query }: Readonly<{ query: string | undefined }>): React.ReactNode {
  const { data, error, isLoading } = useLaunches()

  if (query === undefined || query === '') {
    return null
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error !== null) {
    return <Text>Error: {error.message}</Text>
  }

  if (data === undefined) {
    return null
  }

  const filteredData = data.filter(launch => search(launch.mission_name, query) > 0)

  return (
      <View>
        <Text>Found {filteredData.length} results</Text>
        <Cards data={filteredData} />
      </View>
  )
}

interface EditScreenInfoProps {
  onSearch: (query: string) => void
}

function EditScreenInfo ({ onSearch }: Readonly<EditScreenInfoProps>): React.ReactNode {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    onSearch(deferredQuery)
  }, [deferredQuery])

  return (
      <View>
        <TextInput
          onChangeText={setQuery}
          value={query}
          placeholder="Search a launch name"
          placeholderTextColor={'#fff'}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#fff',

            color: '#fff',
            width: Dimensions.get('window').width * 0.80,
            paddingBottom: 10,
            fontSize: 16
          }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width
  }
})
