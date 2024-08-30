export interface Condition {
  segments: number;
  distance: number;
  rankPreference: string;
}

export interface Place {
  types: string[];
  formattedAddress: string;
  rating: number;
  displayName: {
    text: string;
    languageCode: string;
  };
}