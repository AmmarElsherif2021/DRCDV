import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getUserInfo } from '../../API/users'
export function User({ id, showEmail = false }) {
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <strong>{userInfo?.username ?? id}</strong>
      {showEmail && <small>{userInfo?.email}</small>}
    </div>
  )
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  showEmail: PropTypes.bool,
}
