export interface CardQuestion {
  id: number | string;
  content: string;
  category: "fun" | "deep" | "spicy";
  isCustom?: boolean;
  is_hidden?: boolean;
}

export enum PlayerTurn {
  PLAYER_1 = "Người 1",
  PLAYER_2 = "Người 2",
}
