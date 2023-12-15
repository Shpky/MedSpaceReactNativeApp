import { ReactNode } from 'react';

const Debug = ({ children }: { children: ReactNode }) => __DEV__ ? children : null;
export default Debug;
