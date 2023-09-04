export const login = (data) => {
  return rx.http.request({
    url: "web/bigscreen/statistics/query",
    data,
    method: "post",
  });
}