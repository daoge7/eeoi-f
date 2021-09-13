import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}
export function loginCrm(data) {
  return request({
    url: "/loginCrm",
    method: "post",
    data
  });
}
export function getCodeImg() {
  return request({
    url: "/code",
    method: "get"
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function pwdUpd(data) {
  return request({
    url: "/sysUser/updateUserPassword",
    method: "post",
    data
  });
}
export function resetUserPassword(data) {
  return request({
    url: "/sysUser/resetUserPassword",
    method: "post",
    data
  });
}
export function logout() {
  return true;
  // return request({
  //   url: '/logout',
  //   method: 'post'
  // })
}
