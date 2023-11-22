import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WatchList from './WatchList'
import Search from './Search'

class TopBar extends React.Component {
  render (): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text>Logo</Text>
        <WatchList></WatchList>
        <Search></Search>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default TopBar
