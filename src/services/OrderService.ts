import http from "@/http-common";
import CheckoutOrderDTO from "@/types/CheckoutOrderDTO";

/* eslint-disable */
class ProductService {
  getOrder(id: number): Promise<any> {
    return http.get(`/orders/${id}`);
  }

  checkout(order: CheckoutOrderDTO): Promise<any> {
    return http.post("/checkout", order);
  }

  checkOrder(id: number): Promise<any> {
    return http.get(`/orders/check/${id}`);
  }
}

export default new ProductService();
