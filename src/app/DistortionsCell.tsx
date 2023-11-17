"use client";

import { ChangeEvent, useState } from "react";

interface DistortionsCellProps {}
export const DistortionsCell = (props: DistortionsCellProps) => {
  const [distortions, setDistortions] = useState<string[]>(["test"]);

    const templateValue = (): string => {
        
        return distortions.reduce((result, str) => result + '' + str, "")

    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

  return <input value={templateValue()} onChange={onInputChange}></input>;
};
