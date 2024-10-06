export interface Condition {
  min: number;
  max: number;
  distance: number;
  rankPreference: string;
  includedTypes: string;
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
  location: {
    latitude: number;
    longitude: number;
  };
  regularOpeningHours: {
    openNow: boolean;
  };
}

export type CaloriesRecord = {
  title: string;
  calories: string;
};
