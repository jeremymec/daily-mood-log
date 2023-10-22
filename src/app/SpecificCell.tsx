"use client";
interface SpecificCellProps {
  name: string;
  color: string
  selected: boolean;
  onclick: () => void;
}
export const SpecificCell = (props: SpecificCellProps) => {
  const selectedClassName = `mr-1 rounded-lg px-2 py-1 whitespace-nowrap cursor-pointer select-none outline outline-1`;
  const unselectedClassName = "mr-1 rounded-lg px-2 py-1 cursor-pointer whitespace-nowrap select-none";

  const hexToRGB = (hex: string, alpha: number) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

  return (
    <span
      onClick={props.onclick}
      className={props.selected ? selectedClassName : unselectedClassName}
      style={props.selected ? {background: hexToRGB(props.color, .5)} : {background: hexToRGB(props.color, .1)}}
    >
      {props.name}
    </span>
  );
};
