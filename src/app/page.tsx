"use client";

import { useState } from "react";
import { Draft, produce } from "immer";

interface Emotion {
  id: number;
  specifics: {
    name: string;
    selected: boolean;
  }[];
  percentage: {
    before: number;
    after: number;
  };
}

const Home = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([
    {
      id: 0,
      specifics: [
        { name: "Sad", selected: false },
        { name: "blue", selected: false },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 1,
      specifics: [{ name: "Sad", selected: false }],
      percentage: { before: 0, after: 0 },
    },
  ]);

  const toggleSpecific = (emotionId: number, specificName: string) => {
    const updatedState = produce((draft) => {
      const foundEmotion = draft.find((e) => e.id === emotionId)!;
      const foundSpecific = foundEmotion.specifics.find(
        (s) => s.name === specificName
      )!;
      foundSpecific.selected = !foundSpecific.selected;
    }, emotions);

    setEmotions(updatedState);
  };

  const percentageCellSetValue = (emotionId: number, value: number, type: 'Before' | 'After') => {

    const updatedState = produce((draft) => {
      const foundEmotion = draft.find((e) => e.id === emotionId)!;

      if (type === 'Before') {
        foundEmotion.percentage.before = value;
      } else {
        foundEmotion.percentage.after = value;
      }

    }, emotions)

    setEmotions(updatedState);
  }

  return (
    <div className="overflow-x-auto border-x border-t">
      <table className="table-auto w-full">
        <thead className="border-b">
          <tr className="bg-gray-100">
            <th className="text-left p-4 font-medium">Emotions</th>
            <th className="text-left p-4 font-medium">Before %</th>
            <th className="text-left p-4 font-medium">After %</th>
          </tr>
        </thead>
        <tbody>
          {emotions.map((emotion, key) => {
            return (
              <tr key={key} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {emotion.specifics.map((specific, i) => {
                    return (
                      <SpecificCell
                        name={specific.name}
                        selected={specific.selected}
                        onclick={() => {
                          toggleSpecific(key, specific.name);
                        }}
                        key={i}
                      ></SpecificCell>
                    );
                  })}
                </td>
                <PercentageCell setValue={(value) => percentageCellSetValue(key, value, 'Before')} value={emotion.percentage.before}></PercentageCell>
                <PercentageCell setValue={(value) => percentageCellSetValue(key, value, 'After')} value={emotion.percentage.after}></PercentageCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface SpecificCellProps {
  name: string;
  selected: boolean;
  onclick: () => void;
}

const SpecificCell = (props: SpecificCellProps) => {
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

export default Home;


interface PercentageCellProps {
  value: number
  setValue: (value: number) => void
}

const PercentageCell = (props: PercentageCellProps) => {

  const onCellChange = (e: React.FormEvent<HTMLInputElement>) => {

    // Apply validation logic
    const cellValue = Number(e.currentTarget.value);
    isNaN(cellValue) ? props.setValue(0) : props.setValue(Math.min(Math.max(cellValue, 0), 100));
  }

  return (
    <td className="p-4"><input value={props.value} onChange={onCellChange}></input></td>
  )

}