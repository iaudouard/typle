import React from "react";

type Props = {
  children: React.ReactNode | string;
  onClick: () => void;
  tabIndex?: number;
};

export const Button = (props: Props) => {
  return (
    <button
      className="transition-color btn-bg flex content-center items-center rounded-lg border-none p-3 text-2xl font-semibold text-white outline-none duration-300"
      onClick={props.onClick}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </button>
  );
};
