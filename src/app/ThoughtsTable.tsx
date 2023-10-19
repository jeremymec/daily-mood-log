"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { NegativeThought } from "./page";

export interface ThoughtsTableProps {
  negativeThoughts: NegativeThought[];
  setThoughtsCallback: (
    thoughts: (state?: NegativeThought[] | undefined) => NegativeThought[]
  ) => void;
}

export const ThoughtsTable = (props: ThoughtsTableProps) => {
  const percentageCellSetValue = (
    thoughtNumber: number,
    value: number,
    type: "Before" | "After" | "Belief"
  ) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;
      console.log(foundThought);

      switch (type) {
        case "Before":
          foundThought.percentage.before = value;
          break;
        case "After":
          foundThought.percentage.after = value;
          break;
        case "Belief":
          foundThought.positiveThought.beliefPercentage = value;
          break;
      }
    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  };

  const onNegativeThoughtTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    thoughtNumber: number
  ) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;

      foundThought.text = e.target.value ?? "";
    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  };

  const onPositiveThoughtTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    thoughtNumber: number
  ) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;

      foundThought.positiveThought.text = e.target.value ?? "";
    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  };

  const onAddThoughtButtonPress = () => {

    const lastIndex = props.negativeThoughts[props.negativeThoughts.length - 1].number;

    const updatedThoughts = [...props.negativeThoughts, {
      text: "",
      distortions: [],
      number: lastIndex + 1,
      percentage: { before: 0, after: 0 },
      positiveThought: { number: lastIndex + 1, beliefPercentage: 0, text: "" },
    }];

    props.setThoughtsCallback(() => updatedThoughts);
  };

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
                <input
                  value={negativeThought.text}
                  onChange={(e) =>
                    onNegativeThoughtTextChange(e, negativeThought.number)
                  }
                ></input>
              </td>
              <PercentageCell
                setValue={(value) =>
                  percentageCellSetValue(
                    negativeThought.number,
                    value,
                    "Before"
                  )
                }
                value={negativeThought.percentage.before}
              ></PercentageCell>
              <PercentageCell
                setValue={(value) =>
                  percentageCellSetValue(negativeThought.number, value, "After")
                }
                value={negativeThought.percentage.after}
              ></PercentageCell>
              <td className="p-4">{negativeThought.distortions}</td>
              <td className="p-4">
                <input
                  value={negativeThought.positiveThought.text}
                  onChange={(e) =>
                    onPositiveThoughtTextChange(e, negativeThought.number)
                  }
                ></input>
              </td>
              <PercentageCell
                setValue={(value) =>
                  percentageCellSetValue(
                    negativeThought.number,
                    value,
                    "Belief"
                  )
                }
                value={negativeThought.positiveThought.beliefPercentage}
              ></PercentageCell>
            </tr>
          );
        })}
        <tr>
          <td>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onAddThoughtButtonPress}
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
