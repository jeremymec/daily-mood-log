"use client";

import { useState } from "react";
import { EmotionsTable } from "./EmotionsTable";
import { ThoughtsTable } from "./ThoughtsTable";

type Distortion = "A" | "B"

export interface Emotion {
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

export interface NegativeThought {
  number: number;
  text: string;
  percentage: {
    before: number;
    after: number;
  };
  distortions: Distortion[];
  positiveThought: PositiveThought
}

export interface PositiveThought {
  number: number;
  text: string;
  beliefPercentage: number;
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
  const [negativeThoughts, setNegativeThoughts] = useState<NegativeThought[]>([
    {
      text: '',
      number: 1,
      percentage: {
        before: 0,
        after: 0
      },
      distortions: [],
      positiveThought: {
        text: '',
        beliefPercentage: 0,
        number: 1
      }
    }
  ]);

  const setEmotionsCallback = (emotions: (state?: Emotion[] | undefined) => Emotion[]) => {
    setEmotions(emotions);
  }

  const setNegativeThoughtsCallback = (negativeThoughts: (state?: NegativeThought[] | undefined) => NegativeThought[]) => {
    setNegativeThoughts(negativeThoughts);
  }

  return (
    <div className="overflow-x-auto border-x border-t px-32 h-screen">
      <div className="text-center m-5">
        <span className="text-lg mr-2 bold">Upsetting Event: </span>
        <input
          className="w-1/3 border-gray-400 outline-none border-b text-lg"
          placeholder="Please type the event here"
          value={upsettingEvent}
          onChange={(e) => setUpsettingEvent(e.currentTarget.value)}
        ></input>
      </div>
    
    <EmotionsTable emotions={emotions} setEmotionsCallback={setEmotionsCallback}></EmotionsTable>
    <br></br>
    <ThoughtsTable negativeThoughts={negativeThoughts} setThoughtsCallback={setNegativeThoughtsCallback}></ThoughtsTable>
    </div>
  );
};

export default Home;
