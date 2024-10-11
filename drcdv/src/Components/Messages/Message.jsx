import PropTypes from 'prop-types'
import { User } from '../User/User'

export function Message({ text, attachments, sender }) {
  return (
    <article>
      <div>{text}</div>
      {attachments && attachments.length > 0 && (
        <div>
          <h4>Attachments:</h4>
          <ul>
            {attachments.map((attachment, index) => (
              <li key={index}>
                {attachment.filename} ({attachment.contentType})
              </li>
            ))}
          </ul>
        </div>
      )}
      {sender && (
        <em>
          <br />
          Written by <User id={sender} />
        </em>
      )}
    </article>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string,
      contentType: PropTypes.string,
      gridfsId: PropTypes.string,
    }),
  ),
  sender: PropTypes.string,
}
