"use client";
interface PercentageCellProps {
  value: number;
  setValue: (value: number) => void;
  customTailwindStyles?: string
}
export const PercentageCell = (props: PercentageCellProps) => {

  const onCellChange = (e: React.FormEvent<HTMLInputElement>) => {

    // Apply validation logic
    const cellValue = Number(e.currentTarget.value);
    isNaN(cellValue) ? props.setValue(0) : props.setValue(Math.min(Math.max(cellValue, 0), 100));
  };

  return (
    <td className={`${props.customTailwindStyles}`}><input className="p-4 w-full" value={props.value} onChange={onCellChange}></input></td>
  );

};
