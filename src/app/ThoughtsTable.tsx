"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { NegativeThought } from "./page";
import TextareaAutosize from "react-textarea-autosize";

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
    e: React.ChangeEvent<HTMLTextAreaElement>,
    thoughtNumber: number
  ) => {
    const updatedState = produce((draft) => {
      const foundThought = draft.find((t) => t.number === thoughtNumber)!;

      foundThought.text = e.target.value ?? "";
    }, props.negativeThoughts);

    props.setThoughtsCallback(updatedState);
  };

  const onPositiveThoughtTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
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
    <div>
      <table className="table-fixed w-full">
        <thead className="border-b">
          <tr className="bg-gray-100">
            <th className="text-center p-4 font-medium w-"></th>
            <th className="text-center p-4 font-medium w-[27.9%]">
              Negative Thoughts
            </th>
            <th className="text-center p-4 font-medium w-1/12">% Before</th>
            <th className="text-center p-4 font-medium w-1/12">% After</th>
            <th className="text-center p-4 font-medium w-2/12">Distortions</th>
            <th className="text-center p-4 font-medium w-[27.9%]">
              Positive Thoughts
            </th>
            <th className="text-center p-4 font-medium w-1/12">% Belief</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {props.negativeThoughts.map((negativeThought, key) => {
            return (
              <tr key={key} className="border-b hover:bg-gray-50 h-auto">
                {negativeThought.number !== 1 ? (
                  <td
                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded text-center"
                    onClick={() =>
                      onRemoveThoughtButtonPress(negativeThought.number)
                    }
                  >
                    -
                  </td>
                ) : (
                  <td className="bg-red-200 text-white font-bold rounded text-center">
                    -
                  </td>
                )}
                <td className="p-4 h-auto border-r-2 w-[27.9%]">
                  <TextareaAutosize
                    className="w-full h-auto outline-none"
                    value={negativeThought.text}
                    onChange={(e) =>
                      onNegativeThoughtTextChange(e, negativeThought.number)
                    }
                    placeholder="Enter text here..."
                    minRows={2}
                  ></TextareaAutosize>
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
                  gradientEnabled={true}
                ></PercentageCell>
                <PercentageCell
                  setValue={(value) =>
                    percentageCellSetValue(
                      negativeThought.number,
                      value,
                      "After"
                    )
                  }
                  value={negativeThought.percentage.after}
                  customTailwindStyles="w-1 border-r-2"
                  gradientEnabled={true}
                ></PercentageCell>
                <td className="p-4 border-r-2">
                  {negativeThought.distortions}
                </td>
                <td className="p-4 border-r-2">
                  <TextareaAutosize
                    value={negativeThought.positiveThought.text}
                    className="w-full outline-none"
                    onChange={(e) =>
                      onPositiveThoughtTextChange(e, negativeThought.number)
                    }
                    placeholder="Enter text here..."
                    minRows={2}
                  ></TextareaAutosize>
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
                  gradientEnabled={true}
                ></PercentageCell>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={onAddThoughtButtonPress}
      >
        +
      </button>
    </div>
  );
};
