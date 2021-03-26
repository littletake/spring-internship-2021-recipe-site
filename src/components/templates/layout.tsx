import React from 'react';
import { Header } from '../organisms/header';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.VFC<Props> = ({ title, children }) => {
  return (
    <>
      <Header headerTitle={title} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
