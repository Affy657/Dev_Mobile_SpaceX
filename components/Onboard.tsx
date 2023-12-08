import {
  FlatList,
  Image,
  type ListRenderItemInfo,
  Dimensions,
  Pressable,
  type ImageSourcePropType,
  type ViewToken
} from 'react-native'
import { View } from './Themed'
import { Body1, RobotoCondensed } from './StyledText'
import SvgArrowRight from './icons/SvgArrowRight'
import React, { useState, useRef } from 'react'

const { width, height } = Dimensions.get('window')

interface PageProps {
  backgroundImage: ImageSourcePropType
  text: string
  onStart: () => void
}

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
  const [itemToShow, setItemToShow] = useState<number>(0)
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100
      },
      onViewableItemsChanged: ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length === 0) return
        setItemToShow(viewableItems[0].index ?? 0)
      }
    }
  ])
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
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 100
                }}
                // Use #viewabilityConfigCallbackPairs to not update the state on hot reload
                // Avoid this error: Changing onViewableItemsChanged on the fly is not supported
                /** @url https://github.com/facebook/react-native/issues/30171 - Changing onViewableItemsChanged on the fly is not supported #30171 */
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
            <View style={{ width, paddingBottom: 50, flex: 1, alignItems: 'center' }}>
                <Dots key={itemToShow} itemToShow={itemToShow} length={dataPages.length} />
            </View>
        </View>
  )
}

interface DotsProps {
  itemToShow: number
  length: number
}

function Dots ({ itemToShow, length }: DotsProps): React.ReactNode {
  const arr = new Array(length).fill(0)

  return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {arr.map((_, index) => {
            return (
                    <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: `rgba(255, 255, 255, ${index === itemToShow ? '1' : '.25'})`,
                          marginHorizontal: 8
                        }}
                    />
            )
          })}
        </View>
  )
}
