import ProductCartDTO from "@/types/ProductCartDTO";

export default interface CheckoutOrderDTO {
  products: ProductCartDTO[];
  email: string;
}
