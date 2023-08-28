"use client";

import { useState } from "react";
import { produce } from "immer";
import { PercentageCell } from "./PercentageCell";
import { SpecificCell } from "./SpecificCell";

type Distortion = "A" | "B"

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

interface NegativeThought {
  number: number;
  text: string;
  percentage: {
    before: number;
    after: number;
  };
  distortions: Distortion[];
}

interface PositiveThought {
  number: number;
  text: string;
  belief_percentage: number;
}

const Home = () => {
  const [upsettingEvent, setUpsettingEvent] = useState<string>("");
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
    }, emotions);

    setEmotions(updatedState);
  };

  return (
    <div className="overflow-x-auto border-x border-t">
      <div className="text-center m-5">
        <span className="text-lg mr-2 bold">Upsetting Event: </span>
        <input
          className="w-1/3 border-gray-400 outline-none border-b text-lg"
          placeholder="Please type the event here"
          value={upsettingEvent}
          onChange={(e) => setUpsettingEvent(e.currentTarget.value)}
        ></input>
      </div>

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
                <PercentageCell
                  setValue={(value) =>
                    percentageCellSetValue(key, value, "Before")
                  }
                  value={emotion.percentage.before}
                ></PercentageCell>
                <PercentageCell
                  setValue={(value) =>
                    percentageCellSetValue(key, value, "After")
                  }
                  value={emotion.percentage.after}
                ></PercentageCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
