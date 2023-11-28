import { getHeaderTitle } from '@react-navigation/elements'
import { View, Dimensions, Image, Pressable, Text } from 'react-native'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import SvgArrowLeft from './icons/SvgArrowLeft'
import SvgWatchlist from './icons/SvgWatchlist'
import SvgSearch from './icons/SvgSearch'
import { Link } from 'expo-router'

const NAME_MAP: Record<string, string> = {
  watchlist: 'Watch list',
  search: 'Search',
  launchDetail: 'StarLink Mission'
}

const shownSearchIcon = (routeName: string): boolean => {
  if (routeName === 'index' || routeName === 'watchlist' || routeName === 'search') {
    return true
  }

  return false
}

export default function Navbar ({ navigation, route, options }: Readonly<NativeStackHeaderProps>): React.ReactNode {
  const title = getHeaderTitle(options, route.name)

  const { width } = Dimensions.get('window')
  const canGoBack = navigation.canGoBack()

  const transcriptedTitle = NAME_MAP[title]

  return (
      <View>
        <View style={{
          backgroundColor: '#000',
          width,
          height: 50
        }}>
          <View style={{
            width,
            height: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20
          }}>
            <View style={{
              height: '100%',
              flex: 1,
              justifyContent: 'center'
            }}>
              <BrandingLogic canGoBack={canGoBack} handleGoBack={() => {
                if (canGoBack) navigation.goBack()
                else navigation.navigate('index')
              }} />
            </View>

            {typeof transcriptedTitle === 'string' && transcriptedTitle !== 'index' && (
              <View style={{
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                >
                  {title}
                </Text>
              </View>
            )}

            <View style={{
              height: '100%',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 20
            }}>
              <Link href="/watchlist" asChild>
                <Pressable>
                  <SvgWatchlist />
                </Pressable>
              </Link>

              {shownSearchIcon(title) && (
                <Link href="/search" asChild>
                  <Pressable>
                    <SvgSearch />
                  </Pressable>
                </Link>
              )}

            </View>
          </View>
        </View>
      </View>
  )
}

interface BrandingLogicProps {
  canGoBack: boolean
  handleGoBack: () => void
}

function BrandingLogic ({ canGoBack, handleGoBack }: BrandingLogicProps): React.ReactNode {
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
