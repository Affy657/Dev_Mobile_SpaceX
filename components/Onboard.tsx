import {
  FlatList,
  Image,
  View,
  type ListRenderItemInfo,
  Dimensions,
  Pressable,
  type ImageSourcePropType
} from 'react-native'
import { Text } from './Themed'
import SvgArrowRight from './icons/SvgArrowRight'
import React from 'react'

interface PageProps {
  backgroundImage: ImageSourcePropType
  text: string
  onStart: () => void
}

const { width, height } = Dimensions.get('window')

function Page ({ text, backgroundImage, onStart }: Readonly<PageProps>): React.ReactNode {
  return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', width, height }}>
            <Image source={backgroundImage} style={{ width, height: height * 0.60 }} />
            <View style={{
              flex: 1,
              height,
              maxHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
                <Image source={require('../assets/images/SpaceXLogo.png')} />
                <Text allowFontScaling={true} style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: 20,
                  paddingBottom: 20
                }}>
                    {text}
                </Text>
                <Pressable
                    onPress={onStart}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      marginTop: 20
                    }}
                >
                    <Text style={{
                      fontSize: 16,
                      lineHeight: 21,
                      fontWeight: 'bold',
                      letterSpacing: 0.25,
                      color: 'black',
                      paddingRight: 10
                    }}>START</Text>
                    <SvgArrowRight />
                </Pressable>
            </View>
        </View>
  )
}

const pages: Array<Omit<PageProps, 'onStart'>> = [
  {
    text: 'Discover all upcoming and past rocket launches of SpaceX',
    backgroundImage: require('../assets/images/onboarding1.png')
  },
  {
    text: 'Discover all and past rocket launches of SpaceX',
    backgroundImage: require('../assets/images/onboarding2.png')
  },
  {
    text: 'Discover all and past rocket launches of SpaceX',
    backgroundImage: require('../assets/images/onboarding3.png')
  }
]

function renderItem ({ item }: ListRenderItemInfo<PageProps>): React.ReactElement {
  const { text, backgroundImage, onStart } = item

  return (
        <Page
            text={text}
            backgroundImage={backgroundImage}
            onStart={onStart}
        />
  )
}

interface onBoardProps {
  onStart: () => void | Promise<void>
}

export function OnBoard ({ onStart }: onBoardProps): React.ReactNode {
  const dataPages: PageProps[] = pages.map((page) => ({ ...page, onStart }))

  return (
        <View style={{ width, height, backgroundColor: '#000000' }}>
            <FlatList<PageProps>
                data={dataPages}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                initialNumToRender={1}
                pagingEnabled
                horizontal
            />
        </View>
  )
}
