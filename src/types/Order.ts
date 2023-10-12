export default interface Order {
  id: number;
  email: string;
  wallet: string;
  sum: number;
  status: string;
  atblock: number;
}
