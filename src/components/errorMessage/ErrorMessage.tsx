import React, {FunctionComponent, ReactElement} from 'react'
import './ErrorMessage.scss'

export const ErrorMessage: FunctionComponent<{message: string}> = ({
  message,
}): ReactElement => <p className="alert">{message}</p>
