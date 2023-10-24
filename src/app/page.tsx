"use client";

import { useState } from "react";
import { EmotionsTable } from "./EmotionsTable";
import { ThoughtsTable } from "./ThoughtsTable";

type Distortion = "A" | "B";

export interface Emotion {
  id: number;
  specifics: {
    name: string;
    selected: boolean;
    color: string;
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
  positiveThought: PositiveThought;
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
        { name: "Sad", selected: false, color: "#1d86b3" },
        { name: "blue", selected: false, color: "#0f5071" },
        { name: "depressed", selected: false, color: "#3299c6" },
        { name: "down", selected: false, color: "#0a4966" },
        { name: "unhappy", selected: false, color: "#08355b" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 1,
      specifics: [
        { name: "Anxious", selected: false, color: "#ffd900" },
        { name: "worried", selected: false, color: "#ffbb00" },
        { name: "panicky", selected: false, color: "#ff9f00" },
        { name: "nervous", selected: false, color: "#ffea00" },
        { name: "frightened", selected: false, color: "#ffc100" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 2,
      specifics: [
        { name: "Guilty", selected: false, color: "#06b547" },
        { name: "remorseful", selected: false, color: "#05a43b" },
        { name: "bad", selected: false, color: "#049833" },
        { name: "ashamed", selected: false, color: "#038429" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 3,
      specifics: [
        { name: "Inferior", selected: false, color: "#555555" },
        { name: "worthless", selected: false, color: "#3d3d3d" },
        { name: "inadequate", selected: false, color: "#838383" },
        { name: "defective", selected: false, color: "#9a9a9a" },
        { name: "incompetent", selected: false, color: "#6c6c6c" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 4,
      specifics: [
        { name: "Lonely", selected: false, color: "#178db3" },
        { name: "unloved", selected: false, color: "#106c80" },
        { name: "unwanted", selected: false, color: "#25b5da" },
        { name: "rejected", selected: false, color: "#0b5370" },
        { name: "alone", selected: false, color: "#0c4574" },
        { name: "abandoned", selected: false, color: "#1c9bd3" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 5,
      specifics: [
        { name: "Embarrassed", selected: false, color: "#ff61c9" },
        { name: "foolish", selected: false, color: "#ff24b5" },
        { name: "humiliated", selected: false, color: "#ff7fd3" },
        { name: "self-conscious", selected: false, color: "#ff42bf" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 6,
      specifics: [
        { name: "Hopeless", selected: false, color: "#800080" },
        { name: "discouraged", selected: false, color: "#a020a0" },
        { name: "pessimistic", selected: false, color: "#990099" },
        { name: "despairing", selected: false, color: "#660066" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 7,
      specifics: [
        { name: "Frustrated", selected: false, color: "#ff4400" },
        { name: "stuck", selected: false, color: "#ff8a00" },
        { name: "thwarted", selected: false, color: "#ff6600" },
        { name: "defeated", selected: false, color: "#ff2200" },
      ],
      percentage: { before: 0, after: 0 },
    },
    {
      id: 8,
      specifics: [
        { name: "Angry", selected: false, color: "#ff5555" },
        { name: "mad", selected: false, color: "#ff1111" },
        { name: "resentful", selected: false, color: "#ff4444" },
        { name: "annoyed", selected: false, color: "#ff3333" },
        { name: "irritated", selected: false, color: "#ff0000" },
        { name: "upset", selected: false, color: "#ff6666" },
        { name: "furious", selected: false, color: "#ff2222" },
      ],
      percentage: { before: 0, after: 0 },
    }
  ]
  );
  const [negativeThoughts, setNegativeThoughts] = useState<NegativeThought[]>([
    {
      text: "",
      number: 1,
      percentage: {
        before: 0,
        after: 0,
      },
      distortions: [],
      positiveThought: {
        text: "",
        beliefPercentage: 0,
        number: 1,
      },
    },
  ]);

  const setEmotionsCallback = (
    emotions: (state?: Emotion[] | undefined) => Emotion[]
  ) => {
    setEmotions(emotions);
  };

  const setNegativeThoughtsCallback = (
    negativeThoughts: (
      state?: NegativeThought[] | undefined
    ) => NegativeThought[]
  ) => {
    setNegativeThoughts(negativeThoughts);
  };

  return (
    <div className="overflow-x-auto border-x border-t px-32 h-screen">
      <div className="text-center m-5">
        <span className="text-2xl mr-2 bold">Upsetting Event: </span>
        <input
          className="w-1/2 border-gray-400 outline-none border-b text-2xl"
          placeholder="Please type the event here"
          value={upsettingEvent}
          onChange={(e) => setUpsettingEvent(e.currentTarget.value)}
        ></input>
      </div>

      <EmotionsTable
        emotions={emotions}
        setEmotionsCallback={setEmotionsCallback}
      ></EmotionsTable>
      <br></br>
      <ThoughtsTable
        negativeThoughts={negativeThoughts}
        setThoughtsCallback={setNegativeThoughtsCallback}
      ></ThoughtsTable>
    </div>
  );
};

export default Home;
