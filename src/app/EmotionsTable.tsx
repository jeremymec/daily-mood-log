"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { SpecificCell } from "./SpecificCell";
import { Emotion } from "./page";

export interface EmotionTableProps {
  emotions: Emotion[],
  setEmotionsCallback: (emotions: (state?: Emotion[] | undefined) => Emotion[]) => void
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

  return (
    <table className="table-auto w-full">
      <thead className="border-b">
        <tr className="bg-gray-100">
          <th className="text-left p-4 font-medium">Emotions</th>
          <th className="text-left p-4 font-medium">Before %</th>
          <th className="text-left p-4 font-medium">After %</th>
        </tr>
      </thead>
      <tbody>
        {props.emotions.map((emotion, key) => {
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
              <PercentageCell
                setValue={(value) => percentageCellSetValue(key, value, "Before")}
                value={emotion.percentage.before}
              ></PercentageCell>
              <PercentageCell
                setValue={(value) => percentageCellSetValue(key, value, "After")}
                value={emotion.percentage.after}
              ></PercentageCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

};
