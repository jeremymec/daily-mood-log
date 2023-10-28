import { Distortion } from "./page";

export interface DistortionsProps {
  distortions: Distortion[];
}

export const Distortions = (props: DistortionsProps) => {

  return props.distortions.map((distortion) => {
    return (
      <div className="p-4 m-2 rounded-lg" style={{backgroundColor: distortion.color}}>
        <p className="font-bold">{distortion.name}</p>
        <p>{distortion.description}</p>
      </div>
    );
  });
};
