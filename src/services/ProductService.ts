import http from "@/http-common";
import store from "@/store";

/* eslint-disable */
class ProductService {
  getAll(): Promise<any> {
    console.log(store.state?.user?.token)
    return http.get("/products", {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }

  get(id: any): Promise<any> {
    return http.get(`/products/${id}`, {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }

  create(data: any): Promise<any> {
    return http.post("/products", data, {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }

  update(id: any, data: any): Promise<any> {
    return http.post(`/products/${id}`, data, {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }

  delete(id: any): Promise<any> {
    return http.delete(`/products/${id}`, {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }

  deleteAll(): Promise<any> {
    return http.delete(`/products`, {
      headers: {
        'X-Auth-Token': store.state?.user?.token
      }
    });
  }
}

export default new ProductService();
