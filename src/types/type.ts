export interface Condition {
  segments: number;
  distance: number;
  rankPreference: string;
}

export interface Place {
  id: string;
  types: string[];
  formattedAddress: string;
  rating: number;
  displayName: {
    text: string;
    languageCode: string;
  };
}