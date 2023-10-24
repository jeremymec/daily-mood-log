"use client";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { SpecificCell } from "./SpecificCell";
import { Emotion } from "./page";
import React from "react";

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
    const jsxTable: JSX.Element[] = [];

    for (let i = 0; i < Math.ceil(emotions.length / 2); i++) {
      const firstEmotion = emotions[i];
      const secondEmotionIndex = i + Math.ceil(emotions.length / 2);
      const secondEmotion = emotions[secondEmotionIndex];
      console.log(secondEmotion);

      jsxTable.push(
        <tr className="border-b hover:bg-gray-50" key={i}>
          <td className="p-4 border-r-2" key={i}>
            {firstEmotion.specifics.map((specific, index) => {
              return (
                <SpecificCell
                  bold={index === 0}
                  name={specific.name}
                  selected={specific.selected}
                  color={specific.color}
                  onclick={() => {
                    toggleSpecific(firstEmotion.id, specific.name);
                  }}
                  key={i + "first" + index}
                ></SpecificCell>
              );
            })}
          </td>
          <PercentageCell
            customTailwindStyles="border-r-2"
            enabled={firstEmotion.specifics.filter(s => s.selected).length > 0}
            setValue={(value) =>
              percentageCellSetValue(firstEmotion.id, value, "Before")
            }
            value={firstEmotion.percentage.before}
            key={i + "first"}
            gradientEnabled={false}
          ></PercentageCell>
          <PercentageCell
            customTailwindStyles="border-r-2"
            enabled={firstEmotion.specifics.filter(s => s.selected).length > 0}
            setValue={(value) =>
              percentageCellSetValue(firstEmotion.id, value, "After")
            }
            value={firstEmotion.percentage.after}
            key={i + "second"}
            gradientEnabled={false}
          ></PercentageCell>
          {secondEmotion && <React.Fragment><td className="p-4 border-r-2">
            {secondEmotion.specifics.map((specific, index) => {
              return (
                <SpecificCell
                  bold={index === 0}
                  name={specific.name}
                  selected={specific.selected}
                  color={specific.color}
                  onclick={() => {
                    toggleSpecific(secondEmotion.id, specific.name);
                  }}
                  key={secondEmotionIndex + "second" + index}
                ></SpecificCell>
              );
            })}
          </td>
          <PercentageCell
            customTailwindStyles="border-r-2"
            enabled={secondEmotion.specifics.filter(s => s.selected).length > 0}
            setValue={(value) =>
              percentageCellSetValue(secondEmotion.id, value, "Before")
            }
            value={secondEmotion.percentage.before}
            key={secondEmotionIndex + "first"}
            gradientEnabled={false}
          ></PercentageCell>
          <PercentageCell
            customTailwindStyles="border-r-2"
            enabled={secondEmotion.specifics.filter(s => s.selected).length > 0}
            setValue={(value) =>
              percentageCellSetValue(secondEmotion.id, value, "After")
            }
            value={secondEmotion.percentage.after}
            key={secondEmotionIndex + "second"}
            gradientEnabled={false}
          ></PercentageCell></React.Fragment>}
        
        </tr>
      );
    }

    return jsxTable;
  };

  return (
    <table className="table-auto w-full">
      <thead className="border-b">
        <tr className="bg-gray-100">
          <th className="text-center p-4 font-medium w-3/12">Emotions</th>
          <th className="text-center p-4 font-medium w-1/12">Before %</th>
          <th className="text-center p-4 font-medium w-1/12 border-r-2">After %</th>
          <th className="text-center p-4 font-medium w-3/12">Emotions</th>
          <th className="text-center p-4 font-medium w-1/12">Before %</th>
          <th className="text-center p-4 font-medium w-1/12">After %</th>
        </tr>
      </thead>
      <tbody>{emotionArrayToJSX(props.emotions)}</tbody>
    </table>
  );
};
