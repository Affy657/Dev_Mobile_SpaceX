import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


//appele api pour avoir la liste des lancements
export function useLaunches() {
  return useQuery({
    queryKey: ['Launches'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.spacexdata.com/v3/launches',
      )
      return data
    },
  })
}


//fait un appelle a lapi pour un seule lancement 
const getLauncheById = async (LauncheId: string) => {
    const { data } = await axios.get(
      `https://api.spacexdata.com/v3/launches/${LauncheId}`,
    )
    return data
  }

  //appel la fonction getLaunchesById 
export function useLaunche(LauncheId: string) {
    return useQuery({
      queryKey: ['Launches', LauncheId],
      queryFn: () => getLauncheById(LauncheId),
      enabled: !!LauncheId,
    })
  }
  