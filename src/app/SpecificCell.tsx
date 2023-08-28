"use client";
interface SpecificCellProps {
  name: string;
  selected: boolean;
  onclick: () => void;
}
export const SpecificCell = (props: SpecificCellProps) => {
  const selectedClassName = "mr-1";
  const unselectedClassName = "mr-1";

  return (
    <span
      onClick={props.onclick}
      className={props.selected ? selectedClassName : unselectedClassName}
    >
      {props.name} {props.selected ? "✅" : "❌"}
    </span>
  );
};
