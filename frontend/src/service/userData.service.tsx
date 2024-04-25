import http from "../httpCommon";


class UserCurdOperation {
    get(){
        return http.get("/curd?per_page=200&current_page=0")
    }

    getById(id:number){
        return http.get(`/curd/${id}`)
    }

    create(data:any) {
        return http.post("/curd", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/curd/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/curd/${id}`);
      }
}

export default new UserCurdOperation();