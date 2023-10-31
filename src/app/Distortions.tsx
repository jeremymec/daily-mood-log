import { Distortion } from "./page";

export interface DistortionsProps {
  distortions: Distortion[];
}

export const Distortions = (props: DistortionsProps) => {
  return (
    <div className="bg-blue-50 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {props.distortions.map((distortion) => (
        <div className="p-4 m-2 rounded-lg" style={{backgroundColor: distortion.color}}>
          <p className="font-bold">{distortion.name}</p>
          <p>{distortion.description}</p>
        </div>
      ))}
    </div>
  );
};
