import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { OnBoard } from '../components/Onboard'
import AsyncStorage from '@react-native-async-storage/async-storage'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstableSettings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

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

export default function RootLayout (): React.ReactNode {
  const [firstTime, setFirstTime] = useState(true)
  const [readyState, setReadyState] = useState<ReadyState[]>([])
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RobotoCondensed: require('../assets/fonts/RobotoCondensed-Regular.ttf'),
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
const queryClient = new QueryClient()
function RootLayoutNav (): React.ReactNode {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client = {queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
