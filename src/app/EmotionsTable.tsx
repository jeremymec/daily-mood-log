"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { SpecificCell } from "./SpecificCell";
import { Emotion } from "./page";
import { JsxElement } from "typescript";

export interface EmotionTableProps {
  emotions: Emotion[];
  setEmotionsCallback: (
    emotions: (state?: Emotion[] | undefined) => Emotion[]
  ) => void;
}

export const EmotionsTable = (props: EmotionTableProps) => {
  const toggleSpecific = (emotionId: number, specificName: string) => {
    const updatedState = produce((draft) => {
      const foundEmotion = draft.find((e) => e.id === emotionId)!;
      const foundSpecific = foundEmotion.specifics.find(
        (s) => s.name === specificName
      )!;
      foundSpecific.selected = !foundSpecific.selected;
    }, props.emotions);

    props.setEmotionsCallback(updatedState);
  };

  const percentageCellSetValue = (
    emotionId: number,
    value: number,
    type: "Before" | "After"
  ) => {
    const updatedState = produce((draft) => {
      const foundEmotion = draft.find((e) => e.id === emotionId)!;

      if (type === "Before") {
        foundEmotion.percentage.before = value;
      } else {
        foundEmotion.percentage.after = value;
      }
    }, props.emotions);

    props.setEmotionsCallback(updatedState);
  };

  const emotionArrayToJSX = (emotions: Emotion[]): JSX.Element[] => {

    for (let i = 0; i < emotions.length / 2; i++) {

    }

      return (
        <tr className="border-b hover:bg-gray-50">
          <td className="p-4 border-r-2">
            {emotion.specifics.map((specific, i) => {
              return (
                <SpecificCell
                  name={specific.name}
                  selected={specific.selected}
                  color={specific.color}
                  onclick={() => {
                    toggleSpecific(emotion.id, specific.name);
                  }}
                  key={i}
                ></SpecificCell>
              );
            })}
          </td>
          <PercentageCell
            customTailwindStyles="border-r-2"
            setValue={(value) => percentageCellSetValue(emotion.id, value, "Before")}
            value={emotion.percentage.before}
          ></PercentageCell>
          <PercentageCell
            customTailwindStyles="border-r-2"
            setValue={(value) => percentageCellSetValue(emotion.id, value, "After")}
            value={emotion.percentage.after}
          ></PercentageCell>
        </tr>
      );
  };

  return (
    <table className="table-auto w-full">
      <thead className="border-b">
        <tr className="bg-gray-100">
          <th className="text-left p-4 font-medium w-3/12">Emotions</th>
          <th className="text-left p-4 font-medium w-1/12">Before %</th>
          <th className="text-left p-4 font-medium w-1/12">After %</th>
          <th className="text-left p-4 font-medium w-3/12">Emotions</th>
          <th className="text-left p-4 font-medium w-1/12">Before %</th>
          <th className="text-left p-4 font-medium w-1/12">After %</th>
        </tr>
      </thead>
      <tbody>{emotionArrayToJSX(props.emotions)}</tbody>
    </table>
  );
};
