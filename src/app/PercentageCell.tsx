"use client";

import { useEffect, useState } from "react";

interface PercentageCellProps {
  enabled: boolean;
  value: number;
  setValue: (value: number) => void;
  gradientEnabled: boolean;
  invertGradient?: boolean;
  customTailwindStyles?: string;
}
export const PercentageCell = (props: PercentageCellProps) => {
  const [bgHexCode, setBgHexCode] = useState<string>("#FFFFF");
  const [touched, setTouched] = useState<boolean>(false);

  const onCellChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Apply validation logic
    const cellValue = Number(e.currentTarget.value);
    isNaN(cellValue)
      ? props.setValue(0)
      : props.setValue(Math.min(Math.max(cellValue, 0), 100));
    setTouched(true);
  };

  useEffect(() => {
    if (props.gradientEnabled && touched) {
      const value = props.invertGradient ? props.value : 100 - props.value
      setBgHexCode(hslToHex(value, 50, 70));
    }
  }, [props.value, touched]);

  // Credit to icl7126 from stackoverflow.com
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  return (
    <td
      className={`text-center ${props.customTailwindStyles}`}
      // Style element is needed because JIT tailwind can't handle dynamic colors
      style={{ backgroundColor: bgHexCode }}
    >
      <input
        className="p-4 w-full text-center font-bold text-lg outline-none "
        value={props.value}
        onChange={onCellChange}
        style={{ backgroundColor: bgHexCode }}
        disabled={!props.enabled}
      ></input>
      <input
        className="w-10/12"
        type="range"
        min="0"
        max="100"
        disabled={!props.enabled}
        value={props.value}
        onChange={onCellChange}
      ></input>
    </td>
  );
};
