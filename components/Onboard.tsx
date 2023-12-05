import {
  FlatList,
  Image,
  type ListRenderItemInfo,
  Dimensions,
  Pressable,
  type ImageSourcePropType
} from 'react-native'
import { View } from './Themed'
import { Body1, RobotoCondensed } from './StyledText'
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
                <Body1 allowFontScaling={true} style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  textAlign: 'center',
                  paddingTop: 20,
                  paddingBottom: 20
                }}>
                    {text}
                </Body1>
                <Pressable
                    onPress={onStart}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      marginTop: 20,
                      backgroundColor: '#FFFFFF'
                    }}
                >
                    <RobotoCondensed regularOrMediumOrBold='Bold' textProps={{
                      style: {
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        paddingRight: 10,
                        color: '#000000'
                      }
                    }}>START</RobotoCondensed>
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
