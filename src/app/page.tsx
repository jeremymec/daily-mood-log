"use client";

import { useState } from "react";
import { produce } from "immer";

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
                      <Specific
                        name={specific.name}
                        selected={specific.selected}
                        onclick={() => {
                          setEmotions(
                            produce((draft) => {
                              const foundEmotion = draft.find(
                                (e) => e.id === emotion.id
                              )!;
                              const foundSpecific =
                                foundEmotion.specifics.find(
                                  (s) => s.name === specific.name
                                )!;
                              foundSpecific.selected = !foundSpecific.selected;
                            })
                          );
                        }}
                        key={i}
                      ></Specific>
                    );
                  })}
                </td>
                <td className="p-4">{emotion.percentage.before}</td>
                <td className="p-4">{emotion.percentage.after}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface SpecificProps {
  name: string;
  selected: boolean;
  onclick: () => void;
}

const Specific = (props: SpecificProps) => {
  const selectedClassName = "mr-1";
  const unselectedClassName = "mr-1";

  return (
    <span
      onClick={props.onclick}
      className={props.selected ? selectedClassName : unselectedClassName}
    >
      {props.name} {props.selected ? '✅' : '❌'}
    </span>
  );
};

export default Home;
