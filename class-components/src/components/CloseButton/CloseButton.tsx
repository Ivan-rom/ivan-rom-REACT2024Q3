'use client';

import { useRouter } from 'next/navigation';
import React, { ButtonHTMLAttributes, FC } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  search: string;
  page: string;
  className?: string;
  children?: React.ReactNode;
};

const CloseButton: FC<Props> = ({ children, search, page, ...rest }) => {
  const router = useRouter();

  const closDetails = () => {
    router.push(`?page=${page}&search=${search}`);
  };

  return (
    <button onClick={closDetails} {...rest}>
      {children}
    </button>
  );
};

export default CloseButton;
