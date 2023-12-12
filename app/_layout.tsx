import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { useColorScheme, StyleSheet } from 'react-native'
import { OnBoard } from '../components/Onboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../components/Navbar'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View } from '../components/Themed'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

type ReadyState = 'FONT_LOADED' | 'FIRST_TIME_INFO_LOADED'
const ALL_READY_STATE: ReadyState[] = ['FONT_LOADED', 'FIRST_TIME_INFO_LOADED']

// Uncomment to reset AsyncStorage.
// AsyncStorage.clear();

/**
 * @return {boolean}
 */
function checkAllList (list: ReadyState[], readyState: ReadyState[]): boolean {
  return list.every((item) => readyState.includes(item))
}

const queryClient = new QueryClient()

export default function RootLayout (): React.ReactNode {
  const [firstTime, setFirstTime] = useState(true)
  const [readyState, setReadyState] = useState<ReadyState[]>([])
  const [loaded, error] = useFonts({
    RobotoRegular: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    RobotoLight: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
    RobotoCondensedRegular: require('../assets/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf'),
    RobotoCondensedMedium: require('../assets/fonts/RobotoCondensed/RobotoCondensed-Medium.ttf'),
    RobotoCondensedBold: require('../assets/fonts/RobotoCondensed/RobotoCondensed-Bold.ttf'),
    ...FontAwesome.font
  })

  const isFirstTimeConnected = async (): Promise<boolean> => {
    const alreadyLogged = await AsyncStorage.getItem('alreadyLogged')

    if (alreadyLogged === undefined) {
      return true
    }

    return alreadyLogged !== 'true'
  }

  const handleStart = (): void => {
    setFirstTime(false)
    void AsyncStorage.setItem('alreadyLogged', 'true')
  }

  // // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error !== null) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      setReadyState(['FONT_LOADED', ...readyState])
    }
  }, [loaded])

  useEffect(() => {
    if (checkAllList(ALL_READY_STATE, readyState)) {
      SplashScreen.hideAsync()
    }
  })

  useEffect(() => {
    void isFirstTimeConnected()
      .then((firstTimeInfo) => {
        setFirstTime(firstTimeInfo)
        setReadyState(['FIRST_TIME_INFO_LOADED', ...readyState])
      })
  }, [firstTime])

  if (!checkAllList(ALL_READY_STATE, readyState)) {
    return null
  }

  if (firstTime) {
    return <OnBoard onStart={handleStart} />
  }

  return <RootLayoutNav />
}

function RootLayoutNav (): React.ReactNode {
  const colorScheme = useColorScheme()

  const reversedColor = colorScheme === 'light'
    ? 'dark'
    : 'light'

  return (
    <View style={style.fullScreen}>
      <StatusBar style={reversedColor} />
      <SafeAreaProvider
        style={style.fullScreen}
      >
        <ThemeProvider value={DarkTheme}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{
              header: Navbar
            }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="search" />
              <Stack.Screen name="watchlist" />
            </Stack>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  )
}

const style = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%'
  }
})
