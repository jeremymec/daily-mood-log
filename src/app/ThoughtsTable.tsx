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
    const lastIndex =
      props.negativeThoughts[props.negativeThoughts.length - 1].number;

    const updatedThoughts = [
      ...props.negativeThoughts,
      {
        text: "",
        distortions: [],
        number: lastIndex + 1,
        percentage: { before: 0, after: 0 },
        positiveThought: {
          number: lastIndex + 1,
          beliefPercentage: 0,
          text: "",
        },
      },
    ];

    props.setThoughtsCallback(() => updatedThoughts);
  };

  const onRemoveThoughtButtonPress = (thoughtNumber: number) => {
    const updatedState = produce(props.negativeThoughts, (draft) => {
      const index = draft.findIndex(
        (thought) => thought.number === thoughtNumber
      );
      if (index !== -1) draft.splice(index, 1);
    });

    props.setThoughtsCallback(() => updatedState);
  };

  return (
    <table className="table-fixed w-full">
      <thead className="border-b">
        <tr className="bg-gray-100">
          <th className="text-left p-4 font-medium w-[27.9%]">Negative Thoughts</th>
          <th className="text-left p-4 font-medium w-1/12">% Before</th>
          <th className="text-left p-4 font-medium w-1/12">% After</th>
          <th className="text-left p-4 font-medium w-2/12">Distortions</th>
          <th className="text-left p-4 font-medium w-[27.9%]">Positve Thoughts</th>
          <th className="text-left p-4 font-medium w-1/12">% Belief</th>
          <th className="text-left p-4 font-medium w-"></th>
        </tr>
      </thead>
      <tbody>
        {props.negativeThoughts.map((negativeThought, key) => {
          return (
            <tr key={key} className="border-b hover:bg-gray-50">
              <td className="p-4 border-r-2 w-[27.9%]">
                <textarea
                  value={negativeThought.text}
                  className="w-full"
                  onChange={(e) =>
                    onNegativeThoughtTextChange(e, negativeThought.number)
                  }
                  placeholder="Enter text here..."
                ></textarea>
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
                customTailwindStyles="border-r-2 w-1/12"
              ></PercentageCell>
              <PercentageCell
                setValue={(value) =>
                  percentageCellSetValue(negativeThought.number, value, "After")
                }
                value={negativeThought.percentage.after}
                customTailwindStyles="w-1 border-r-2"
              ></PercentageCell>
              <td className="p-4 border-r-2">{negativeThought.distortions}</td>
              <td className="p-4 border-r-2">
                <textarea
                  value={negativeThought.positiveThought.text}
                  className="w-full"
                  onChange={(e) =>
                    onPositiveThoughtTextChange(e, negativeThought.number)
                  }
                  placeholder="Enter text here..."
                ></textarea>
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
                customTailwindStyles="border-r-2"
              ></PercentageCell>
              <td>
                {negativeThought.number !== 1 ? (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      onRemoveThoughtButtonPress(negativeThought.number)
                    }
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="bg-red-200 text-white font-bold py-2 px-4 rounded"
                    disabled={true}
                  >
                    -
                  </button>
                )}
              </td>
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
