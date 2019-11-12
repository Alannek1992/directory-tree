const size = {
  tablet: "768px",
  laptop: "992px",
  desktop: "1200px"
};

export enum DeviceRequirements {
  MIN_WIDTH = "MIN-WIDTH",
  MAX_WIDTH = "MAX-WIDTH"
}

export const device = (requirement: DeviceRequirements) => {
         return {
           tablet: `(${requirement}: ${size.tablet})`,
           laptop: `(${requirement}: ${size.laptop})`,
           desktop: `(${requirement}: ${size.desktop})`
         };
       };
