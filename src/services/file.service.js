import http from "../http-common";

class FileService {
  getAll() {
    return http.get("/files");
  }

  get(id) {
    return http.get(`/files/${id}`);
  }

  create(data) {
    return http.post("/files", data);
  }

  delete(id) {
    return http.delete(`/files/${id}`);
  }
}

export default new FileService();