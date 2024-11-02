import { useQuery } from '@tanstack/react-query'
import { getUserInfo, getUserProfileImage } from '../../API/users'

export const useChannelUsers = (channelMembers) => {
  return useQuery({
    queryKey: ['channelUsers', channelMembers?.map((id) => id).sort()],
    queryFn: async () => {
      if (!channelMembers?.length) return {}

      const userProfiles = await Promise.all(
        channelMembers.map(async (userId) => {
          const [userInfo, profileImage] = await Promise.all([
            getUserInfo(userId),
            getUserProfileImage(userId).catch(() => null),
          ])

          return {
            _id: userId,
            ...userInfo,
            profileImage,
          }
        }),
      )

      // map of user profiles
      return userProfiles.reduce((acc, profile) => {
        acc[profile._id] = profile
        return acc
      }, {})
    },
    enabled: Boolean(channelMembers?.length),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, //  unused data kept in cache for 30 minutes
  })
}
