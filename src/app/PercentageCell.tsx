"use client";
interface PercentageCellProps {
  value: number;
  setValue: (value: number) => void;
}
export const PercentageCell = (props: PercentageCellProps) => {

  const onCellChange = (e: React.FormEvent<HTMLInputElement>) => {

    // Apply validation logic
    const cellValue = Number(e.currentTarget.value);
    isNaN(cellValue) ? props.setValue(0) : props.setValue(Math.min(Math.max(cellValue, 0), 100));
  };

  return (
    <td className="p-4"><input value={props.value} onChange={onCellChange}></input></td>
  );

};
