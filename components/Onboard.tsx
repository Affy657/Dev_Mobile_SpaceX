import {
  FlatList,
  Image,
  type ListRenderItemInfo,
  Dimensions,
  Pressable,
  type ImageSourcePropType,
  type ViewToken,
  StyleSheet
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
        <View style={[styles.pageContainer, { width, height }]}>
            <Image source={backgroundImage} style={{ width, height: height * 0.60 }} />
            <View style={[styles.contentContainer, { height }]}>
                <Image source={require('../assets/images/SpaceXLogo.png')} />
                <Body1 allowFontScaling={true} style={styles.text}>
                    {text}
                </Body1>
                <Pressable
                    onPress={onStart}
                    style={styles.button}
                >
                    <RobotoCondensed regularOrMediumOrBold='Bold' textProps={{
                      style: styles.buttonText
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

interface OnBoardProps {
  onStart: () => void | Promise<void>
}

export function OnBoard ({ onStart }: Readonly<OnBoardProps>): React.ReactNode {
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
        <View style={styles.container}>
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
            <View style={styles.dotContainer}>
                <Dots key={itemToShow} itemToShow={itemToShow} length={dataPages.length} />
            </View>
        </View>
  )
}

interface DotsProps {
  itemToShow: number
  length: number
}

function Dots ({ itemToShow, length }: Readonly<DotsProps>): React.ReactNode {
  const arr = new Array(length)
    .fill(0)
    // map all for the key
    .map((_, i) => i)

  return (
        <View style={styles.dotSubContainer}>
          {arr.map((index) => {
            return (
                    <View
                        key={index}
                        style={[styles.dot, { backgroundColor: `rgba(255, 255, 255, ${index === itemToShow ? '1' : '.25'})` }]}
                    />
            )
          })}
        </View>
  )
}

const styles = StyleSheet.create({
  container: { width, height, backgroundColor: '#000000' },
  pageContainer: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  contentContainer: {
    flex: 1,
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingRight: 10,
    color: '#000000'
  },
  dotContainer: { width, paddingBottom: 50, flex: 1, alignItems: 'center' },
  dotSubContainer: { flex: 1, flexDirection: 'row' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
})
