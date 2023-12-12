import AsyncStorage from '@react-native-async-storage/async-storage'

const WATCHLIST_KEY = 'WATCHLIST_IDS'

export const addToWatchlist = async (id: string): Promise<string[]> => {
  try {
    const currentIdsString = await AsyncStorage.getItem(WATCHLIST_KEY)
    const currentIds = currentIdsString !== null ? JSON.parse(currentIdsString) as string[] : []
    if (currentIds.includes(id)) {
      return currentIds
    }
    const updatedIds = [...currentIds, id]
    console.log('updatedIds', updatedIds)
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedIds))
    return updatedIds
  } catch (e) {
    console.error('Failed to save the watchlist IDs to AsyncStorage', e)
    return id !== null ? [id] : []
  }
}

export const removeFromWatchlist = async (id: string): Promise<string[]> => {
  const currentIdsString = await AsyncStorage.getItem(WATCHLIST_KEY)
  const currentIds = currentIdsString !== null ? JSON.parse(currentIdsString) as string[] : []
  const updatedIds = currentIds.filter(item => item !== id)
  console.log('updatedIds', updatedIds)
  try {
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedIds))
    return updatedIds
  } catch (e) {
    console.error('Failed to save the watchlist IDs to AsyncStorage', e)
    return currentIds
  }
}
