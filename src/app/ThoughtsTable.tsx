"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { NegativeThought } from "./page";

export interface ThoughtsTableProps {
  negativeThoughts: NegativeThought[];
  setThoughtsCallback: (thoughts: (state?: NegativeThought[] | undefined) => NegativeThought[]) => void
}

export const ThoughtsTable = (props: ThoughtsTableProps) => {

  const percentageCellSetValue = (
    thoughtNumber: number,
    value: number,
    type: "Before" | "After" | "Belief"
  ) => {
    const updatedState = produce((draft) => {
      const foundEmotion = draft.find((t) => t.number === thoughtNumber)!;

      if (type === "Before") {
        foundEmotion.percentage.before = value;
      } else {
        foundEmotion.percentage.after = value;
      }
    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  };

  const onNegativeThoughtTextChange = (e: React.ChangeEvent<HTMLInputElement>, thoughtNumber: number) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;

      foundThought.text = e.target.value ?? "";

    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  }

  const onPositiveThoughtTextChange = (e: React.ChangeEvent<HTMLInputElement>, thoughtNumber: number) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;

      foundThought.positiveThought.text = e.target.value ?? "";

    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  }

  return (
    <table className="table-auto w-full">
      <thead className="border-b">
        <tr className="bg-gray-100">
          <th className="text-left p-4 font-medium">Negative Thoughts</th>
          <th className="text-left p-4 font-medium">Before %</th>
          <th className="text-left p-4 font-medium">After %</th>
          <th className="text-left p-4 font-medium">Distortions</th>
          <th className="text-left p-4 font-medium">Positve Thoughts</th>
          <th className="text-left p-4 font-medium">Belief %</th>
        </tr>
      </thead>
      <tbody>
        {props.negativeThoughts.map((negativeThought, key) => {
          return (
            <tr key={key} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <input value={negativeThought.text} onChange={(e) => onNegativeThoughtTextChange(e, negativeThought.number)}></input>
              </td>
              <PercentageCell
                setValue={(value) => percentageCellSetValue(key, value, "Before")}
                value={negativeThought.percentage.before}
              ></PercentageCell>
              <PercentageCell
                setValue={(value) => percentageCellSetValue(key, value, "After")}
                value={negativeThought.percentage.after}
              ></PercentageCell>
              <td className="p-4">
                {negativeThought.distortions}
              </td>
              <td className="p-4">
              <input value={negativeThought.positiveThought.text} onChange={(e) => onPositiveThoughtTextChange(e, negativeThought.number)}></input>
              </td>
              <PercentageCell
                setValue={(value) => percentageCellSetValue(key, value, "Belief")}
                value={negativeThought.positiveThought.beliefPercentage}
              ></PercentageCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

};
