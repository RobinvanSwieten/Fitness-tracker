export interface workout
{
  name?: string;
  timer?: {
    h: string,
    m: string,
    s: string
  }
  exercise?: {
    name: string;
    img?: string;
    sets?: {
      checked?: boolean;
      kg?: string;
      reps?: string;
    }[];
  }[];
}
