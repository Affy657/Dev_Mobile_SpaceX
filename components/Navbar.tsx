import { getHeaderTitle } from '@react-navigation/elements'
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import SvgArrowLeft from './icons/SvgArrowLeft'
import SvgWatchlist from './icons/SvgWatchlist'
import SvgSearch from './icons/SvgSearch'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addToWatchlist, removeFromWatchlist } from './watchlistHelpers'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from './Themed'
import { RobotoCondensed } from './StyledText'

const NAME_MAP: Record<string, string> = {
  watchlist: 'Watch list',
  search: 'Search',
  'launchdetail/[id]': 'StarLink Mission'
}

const WATCHLIST_KEY = 'WATCHLIST_IDS'

const shownSearchIcon = (routeName: string): boolean => {
  if (routeName === 'index' || routeName === 'watchlist' || routeName === 'search') {
    return true
  }

  return false
}

export default function Navbar ({ navigation, route, options }: Readonly<NativeStackHeaderProps>): React.ReactNode {
  const title = getHeaderTitle(options, route.name)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    void checkIfInWatchlist()
  }, [route.params])

  const checkIfInWatchlist = async (): Promise<void> => {
    if (route.params === undefined) return
    const params = route.params as Record<string, string>
    if (params.id === undefined) return
    const storedIds = await AsyncStorage.getItem(WATCHLIST_KEY)
    if (storedIds !== null) {
      const ids = JSON.parse(storedIds)
      setIsInWatchlist(ids.includes(params.id))
    }
  }

  const handleWatchlistPress = async (): Promise<void> => {
    // Logique pour ajouter/supprimer de la watchlist
    // et mise à jour de l'état isInWatchlist
    const params: { id: string } = route.params as { id: string }
    if (isInWatchlist) {
      const updatedIds = await removeFromWatchlist(params.id)
      setIsInWatchlist(updatedIds.includes(params.id))
    } else {
      const updatedIds = await addToWatchlist(params.id)
      setIsInWatchlist(updatedIds.includes(params.id))
    }
  }

  const { width } = Dimensions.get('window')
  const canGoBack = navigation.canGoBack()

  const transcriptedTitle = NAME_MAP[title]

  return (
    <SafeAreaView edges={['top']}>
      <View>
        <View style={[styles.container, { width }]}>
          <View style={[styles.subContainer, { width }]}>
            <View style={styles.brandingContainer}>
              <BrandingLogic canGoBack={canGoBack} handleGoBack={() => {
                if (canGoBack) navigation.goBack()
                else navigation.navigate('index')
              }} />
            </View>

            {typeof transcriptedTitle === 'string' && transcriptedTitle !== 'index' && (
              <View style={styles.titleContainer}>
                <RobotoCondensed
                  regularOrMediumOrBold="Medium"
                  textProps={{ style: styles.title }}
                >
                  {transcriptedTitle}
                  </RobotoCondensed>
              </View>
            )}

            <View style={styles.iconsContainer}>
              {title === 'launchdetail/[id]' && (
                <Pressable onPress={() => { void handleWatchlistPress() }}>
                  <SvgWatchlist filled={isInWatchlist} />
                </Pressable>
              )}
              {title !== 'launchdetail/[id]' && (
              <Link href="/watchlist" asChild>
                <Pressable>
                  <SvgWatchlist filled={title === 'watchlist'} />
                </Pressable>
              </Link>
              )}
              {shownSearchIcon(title) && (
                <Link href="/search" asChild>
                  <Pressable>
                    <SvgSearch filled={title === 'search'} />
                  </Pressable>
                </Link>
              )}

            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
  )
}

interface BrandingLogicProps {
  canGoBack: boolean
  handleGoBack: () => void
}

function BrandingLogic ({ canGoBack, handleGoBack }: Readonly<BrandingLogicProps>): React.ReactNode {
  if (canGoBack) {
    return (
      <Pressable onPress={handleGoBack}>
        <SvgArrowLeft />
      </Pressable>
    )
  }

  return (
    <Image
      source={require('../assets/images/SpaceXLogo.png')}
      style={{
        width: 150,
        height: 18
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: 50
  },
  subContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  brandingContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconsContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
