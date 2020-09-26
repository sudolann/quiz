import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent, ReactElement } from 'react';
import './LoadingBar.scss';

export const LoadingBar: FunctionComponent = (): ReactElement => (
  <div className='loading'>
    <CircularProgress disableShrink />
  </div>
);
