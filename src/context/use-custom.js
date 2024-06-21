import { useContext } from 'react';

import { CustomContext } from './ContextProvider';

export const useCustomContext = () => useContext(CustomContext);
