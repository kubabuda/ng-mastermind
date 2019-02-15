export interface IGameSettings {
    digits: number;
    colors: number;
}

export class GameSettings implements IGameSettings  {
    constructor(
        public digits: number,
        public colors: number
    ) {

    }
}
